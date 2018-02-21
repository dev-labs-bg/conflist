import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import { Form } from 'reactstrap';

import { fetchTags, subscribeTag, unsubscribeTag } from './duck';
import User from '../ProfileSettings/User';
import './react-tagsinput.css';

class MySubscriptions extends Component {
    static propTypes = {
        authToken: PropTypes.string.isRequired,
        user: PropTypes.shape({
            isFetching: PropTypes.bool,
            data: PropTypes.instanceOf(User),
        }).isRequired,
        subscribeTag: PropTypes.func,
        unsubscribeTag: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = { tags: [], error: null };
    }

    componentDidMount() {
        this.props.fetchTags();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.data !== null) {
            this.setState({ tags: nextProps.user.data.subscriptions });
        }
    }

    addedTagHandler = (updatedTag) => {
        const errorCallback = (status) => {
            this.setState({ error: status });
        };

        const successCallback = () => {
            console.log('success')
        };
        this.props.subscribeTag(
            this.props.authToken,
            updatedTag,
            successCallback,
            errorCallback,
        );
    }

    deletedTagHandler = (updatedTag) => {
        this.props.unsubscribeTag(
            this.props.authToken,
            updatedTag,
        );
    }

    handleChange = (nextTags) => {
        const prevTags = this.state.tags;

        // This tag is added
        // if (_.difference(prevTags, nextTags).length === 0) {
        // }
        //
        // This tag is removed
        // if (_.difference(nextTags, prevTags).length === 0) {
        // }

        // Gery will write a meaningfull comment.
        const updatedTag = [
            ..._.difference(prevTags, nextTags),
            ..._.difference(nextTags, prevTags),
        ];

        this.setState({ tags: nextTags });

        if (_.difference(prevTags, nextTags).length === 0) {
            this.addedTagHandler(updatedTag);
        } else {
            this.deletedTagHandler(updatedTag);
        }
    }

    saveSettings = (event) => {
        event.preventDefault();
    }

    renderMessage = () => {
        if (this.state.error === 404) {
            return <h4>This tag is not valid!</h4>;
        }

        return null;
    }
    autocompleteRenderInput = ({addTag, ...props}) => {
      const handleOnChange = (e, {newValue, method}) => {
        if (method === 'enter') {
          e.preventDefault()
        } else {
          props.onChange(e)
        }
      }

      const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
      const inputLength = inputValue.length

      let suggestions = this.props.subscriptions.allTags.filter((tag) => {
        return tag.name.toLowerCase().slice(0, inputLength) === inputValue
      })

      return (
        <Autosuggest
          ref={props.ref}
          suggestions={suggestions}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
          inputProps={{...props, onChange: handleOnChange}}
          onSuggestionSelected={(e, {suggestion}) => {
            addTag(suggestion.name)
          }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      )
    }
    render() {
        if (this.props.user.isFetching && this.props.user.isFetching === null) {
            return <div>Loading</div>;
        }
        if (this.props.subscriptions.isFetching && this.props.subscriptions.isFetching === null) {
            return <div>Loading</div>;
        }
        const { allTags } = this.props.subscriptions;

        return (
            <div className="py-5">
                <h1 className="text-center mb-5">
                    My Subscriptions
                </h1>

                <div className="bg-white card-subscription mx-auto px-5 py-5">
                    <div className="card-subscription__content mx-auto">
                        <Form onSubmit={this.saveSettings} >
                            <h4 className="mb-4">You can always manage your
                                <span className="text-primary"> #tag </span>
                            subscriptions.
                            </h4>

                            <div className="text-center mb-5">
                                {this.renderMessage()}
                                <TagsInput
                                    renderInput={this.autocompleteRenderInput}
                                    value={this.state.tags}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <h6 className="mb-4">
                                Once in a month you will receive an update about the
                                 upcoming and the new conferences matching these tags.
                            </h6>

                            <div className="text-center">
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ auth, user, subscriptions }) => {
    return {
        authToken: auth.token,
        user,
        subscriptions,
    };
};

const mapDispatchToProps = {
    fetchTags,
    subscribeTag,
    unsubscribeTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySubscriptions);
