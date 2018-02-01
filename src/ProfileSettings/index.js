import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Label, Input } from 'reactstrap';

import { updateCurrentUser } from './duck';

class ProfileSettings extends Component {
    static propTypes = {
        user: PropTypes.shape({
            data: PropTypes.shape({
                name: PropTypes.string,
                profileImg: PropTypes.string,
                email: PropTypes.string,
            }),
            isFetching: PropTypes.bool,
        }).isRequired,
        auth: PropTypes.shape({
            token: PropTypes.string,
        }).isRequired,
        updateCurrentUser: PropTypes.func,
    };

    static defaultProps = {
        updateCurrentUser: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isUpdated: false,
            error: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user.isFetching === false) {
            if (nextProps.user.data.name !== this.props.user.data.name) {
                this.setState({ isUpdated: true });
            }
        }
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    updateSettings(event) {
        const successCallback = () => { this.setState({ isUpdated: true }); };
        const errorCallback = (status) => { this.setState({ error: status }); };

        this.props.updateCurrentUser(
            this.props.auth.token,
            this.state.name,
            successCallback,
            errorCallback,
        );
        event.preventDefault();
    }

    renderMessage(_error, _isUpdated) {
        if (_isUpdated) {
            return (
                <h4 className="text-danger text-center">
                    You updated your profile successfully!
                </h4>);
        }

        if (isNaN(_error)) {
            return (
                <h4 className="text-danger text-center">
                    {_error}
                </h4>);
        }

        if (_error !== null) {
            window.setTimeout( () => { return (
                <h4 className="text-danger text-center">
                    Error with status {_error}. Try again!
                </h4>);}, 2000);
        }

        return null;
    }

    render() {
        if (this.props.user.isFetching || this.props.user.isFetching === null) {
            return <p>Loading!</p>;
        }

        const { profileImg, name, email } = this.props.user.data;

        return (
            <div className="container mx-auto pt-5 pb-5">
                {this.renderMessage(this.state.error, this.state.isUpdated)}
                <div className="bg-white d-flex justify-content-center align-items-center mx-auto profile-card">

                    <Form
                        className="profile-card__content py-5 mb-0"
                        onSubmit={this.updateSettings}
                    >
                        <div className="d-flex justify-content-center">
                            <img
                                className="mr-3 rounded-circle"
                                src={profileImg}
                                width="100"
                                height="100"
                                alt="profile avatar"
                            />

                            <div className="d-flex flex-column w-25 justify-content-around">
                                <span className="label">Your Avatar</span>
                                <button className="btn btn-secondary" type="button">Update</button>
                            </div>

                        </div>
                        <hr className="w-100" />

                        <Label
                            for="first-name"
                        >Name:
                        </Label>
                        <br />
                        <Input
                            className="border-top-0 border-right-0 border-left-0 w-100 pl-0"
                            type="text"
                            name="name"
                            placeholder={name}
                            onChange={this.handleChange}
                        />

                        <Label
                            className="mt-3"
                            for="email"
                        >Email:
                        </Label>
                        <br />
                        <Input
                            className="border-top-0 border-right-0 border-left-0 w-100 bg-white pl-0"
                            type="Email"
                            name="email"
                            placeholder={email}
                            disabled
                        />

                        <div className="text-center mt-5">
                            <button
                                className="btn btn-primary btn-lg"
                                type="submit"
                            >
                            Update Settings
                            </button>
                        </div>
                    </Form>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, user }) => {
    return {
        user,
        auth,
    };
};

const mapDispatchToProps = {
    updateCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
