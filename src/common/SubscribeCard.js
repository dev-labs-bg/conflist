import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { subscribeTag } from '../MySubscriptions/duck';

class SubscribeCard extends Component {
    static propTypes = {
        authToken: PropTypes.string,
        tag: PropTypes.string.isRequired,
        subscribeTag: PropTypes.func.isRequired,
    };

    static defaultProps = {
        authToken: '',
    };

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isNotAuth: false,
            isUpdated: null,
        };
    }

    handleDelayedMessageReset = () => {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setState({ error: null, isUpdated: null, isNotAuth: null });
        }, 1000);
    }

    tagSubscribe = () => {
        if (!this.props.authToken) {
            this.setState({ isNotAuth: true });
            this.handleDelayedMessageReset();

            return;
        }

        const successCallback = () => {
            this.setState({ isUpdated: true });
            this.handleDelayedMessageReset();
        };
        const errorCallback = (status) => {
            this.setState({ error: status });
            this.handleDelayedMessageReset();
        };

        this.props.subscribeTag(
            this.props.authToken,
            this.props.tag,
            successCallback,
            errorCallback,
        );
    };

    renderMessage() {
        if (this.state.isUpdated) {
            return (
                <h4 className="text-danger text-center">
                    You subscribed to this tag successfully!
                </h4>);
        }

        if (this.state.error !== null) {
            return (
                <h4 className="text-danger text-center">
                    Error with status {this.state.error}. Try again!
                </h4>);
        }

        if (this.state.isNotAuth) {
            return (
                <h4 className="text-danger text-center mt-3">
                    Login or Register so you can subscribe to tags!
                </h4>);
        }

        return null;
    }

    render() {
        return (
            <div className="text-center py-5">
                {this.renderMessage()}
                <div className="bg-white card-subscription mx-auto px-5 py-5 text-left">
                    <div className="px-3">
                        <h4 className="mb-4">
                            <span className="text-info">Subscribe </span>
                            to receive updates about the upcoming conferences
                             with #{this.props.tag} tag
                        </h4>

                        <div className="text-center mb-5">
                            <button
                                className="btn btn-primary"
                                onClick={this.tagSubscribe}
                            >Sounds good
                            </button>
                        </div>

                        <h6>
                            <span className="text-info">PS: </span>
                            You can always manage your subscription list and
                             unsubscribe.
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        authToken: auth.token,
    };
};

const mapDispatchToProps = {
    subscribeTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeCard);
