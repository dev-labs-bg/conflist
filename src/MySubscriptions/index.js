import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';

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
        subscriptions: PropTypes.shape({
            isFetching: PropTypes.bool,
            tags: PropTypes.arrayOf(PropTypes.object),
        }).isRequired,
        fetchTags: PropTypes.func.isRequired,
        subscribeTag: PropTypes.func.isRequired,
        unsubscribeTag: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            error: null,
        };
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
        const errorCallback = (error) => {
            this.setState({ error });

            this.handleDelayedMessageReset();
        };

        this.props.subscribeTag(
            this.props.authToken,
            updatedTag,
            () => {},
            errorCallback,
        );
    };

    handleDelayedMessageReset = () => {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setState({ error: null });
        }, 10000);
    }

    deletedTagHandler = (updatedTag) => {
        this.props.unsubscribeTag(this.props.authToken, updatedTag);
    };

    handleChange = (nextTags) => {
        const prevTags = this.state.tags;

        // Compare arrays of previous and next tags to find the updatedTag
        const updatedTag = [
            ..._.difference(prevTags, nextTags),
            ..._.difference(nextTags, prevTags),
        ];

        this.setState({ tags: nextTags });

        if (_.difference(prevTags, nextTags).length === 0) {
            // Case 1: The tag is added
            this.addedTagHandler(updatedTag);
        } else {
            // Case 2: The tag is removed
            this.deletedTagHandler(updatedTag);
        }
    };

    renderMessage = () => {
        if (this.state.error) {
            return <h4>{this.state.error}!</h4>;
        }

        return null;
    };

    render() {
        if (this.props.user.isFetching && this.props.user.isFetching === null) {
            return <div>Loading</div>;
        }
        if (this.props.subscriptions.isFetching && this.props.subscriptions.isFetching === null) {
            return <div>Loading</div>;
        }

        // Render suggestions on tag-input
        const autocompleteRenderInput = ({ addTag, ...props }) => {
            const handleOnChange = (e, { newValue, method }) => {
                if (method === 'enter') {
                    e.preventDefault();
                } else {
                    props.onChange(e);
                }
            };

            const inputValue =
                (props.value && props.value.trim().toLowerCase()) || '';
            const inputLength = inputValue.length;

            let suggestions = this.props.subscriptions.tags.filter((tag) => {
                return (
                    tag.name.toLowerCase().slice(0, inputLength) === inputValue
                );
            });

            return (
                <Autosuggest
                    ref={props.ref}
                    suggestions={suggestions}
                    shouldRenderSuggestions={value =>
                        value && value.trim().length > 0
                    }
                    getSuggestionValue={suggestion => suggestion.name}
                    renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
                    inputProps={{
                        ...props,
                        onChange: handleOnChange
                    }}
                    onSuggestionSelected={(e, { suggestion }) => {
                        addTag(suggestion.name);
                    }}
                    onSuggestionsClearRequested={() => {}}
                    onSuggestionsFetchRequested={() => {}}
                />
            );
        };

        return (
            <div className="py-5">
                <h1 className="text-center mb-5">My Subscriptions</h1>

                <div className="bg-white card-subscription mx-auto px-5 py-5">
                    <div className="card-subscription__content mx-auto">
                        <h4 className="mb-4">
                            You can always manage your
                            <span className="text-primary"> #tag </span>
                            subscriptions.
                        </h4>

                        <div className="text-center mb-5">
                            {this.renderMessage()}
                            <TagsInput
                                renderInput={autocompleteRenderInput}
                                value={this.state.tags}
                                onChange={this.handleChange}
                            />
                        </div>
                        <h6 className="mb-4">
                            Once in a month you will receive an update about
                            the upcoming and the new conferences matching
                            these tags.
                        </h6>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, user, subscriptions }) => {
    return { authToken: auth.token, user, subscriptions };
};

const mapDispatchToProps = {
    fetchTags,
    subscribeTag,
    unsubscribeTag
};

export default connect(mapStateToProps, mapDispatchToProps)(MySubscriptions);
