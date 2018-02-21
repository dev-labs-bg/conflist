import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import { Form } from 'reactstrap';

import { subscribeTag, unsubscribeTag } from './duck';
import User from '../ProfileSettings/User';
import './react-tagsinput.css';

class MySubscriptions extends Component {
    static propTypes = {
        authToken: PropTypes.string.isRequired,
        user: PropTypes.shape({
            isFetching: PropTypes.bool,
            data: PropTypes.instanceOf(User),
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { tags: [] };
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.user.data !== null) {
            this.setState({ tags: nextProps.user.data.subscriptions });
        }

        // this.props.subscribeTag(
        //     authToken,
        //
        // )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tags.length !== this.state.tags.length) {
            console.log(this.state.tags)
        }
    }

    handleChange = (tags) => {
        console.log(tags)
        this.setState({ tags });
    }

    saveSettings = (event) => {
        event.preventDefault();
    }


    render() {
        if (this.props.user.isFetching && this.props.user.isFetching === null) {
            return <div>Loading</div>;
        }
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
                                <TagsInput
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
    subscribeTag,
    unsubscribeTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySubscriptions);
