import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCurrentUser } from '../ProfileSettings/duck';
import eventIcon from '../assets/images/event-icon.svg';

class MySubscriptions extends Component {
    static propTypes = {
        authToken: PropTypes.string.isRequired,
        fetchCurrentUser: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchCurrentUser(this.props.authToken);
    }

    render() {
        return (
            <div className="py-5">
                <h1 className="text-center mb-5">
                    My Subscriptions
                </h1>

                <div className="bg-white card-subscription mx-auto px-5 py-5">
                    <div className="card-subscription__content mx-auto">
                        <h4 className="mb-4">You can always manage your
                            <span className="text-primary"> #tag </span>
                        subscriptions.
                        </h4>

                        <div className="text-center mb-5">
                            <span className="badge badge-pill badge-light mr-2">javascript</span>
                            <span className="badge badge-pill badge-light mr-2">css</span>
                            <span className="badge badge-pill badge-light mr-2">web</span>
                            <span className="badge badge-pill badge-light mr-2">ios</span>
                            <span className="badge badge-pill badge-light">android</span>
                        </div>
                        <h6 className="mb-4">
                            Once in a month you will receive an update about the
                             upcoming and the new conferences matching these tags.
                        </h6>

                        <div className="text-center">
                            <button className="btn btn-primary px-4 py-2">
                                Save
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ auth, user }) => {
    return {
        authToken: auth.token,
        user,
    };
};

const mapDispatchToProps = {
    fetchCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySubscriptions);
