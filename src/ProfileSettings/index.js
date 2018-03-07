import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Label, Input } from 'reactstrap';

import Loading from '../common/Loading';
import { updateCurrentUser } from './duck';

class ProfileSettings extends Component {
    static propTypes = {
        user: PropTypes.shape({
            data: PropTypes.shape({
                name: PropTypes.string,
                profileImg: PropTypes.string,
                email: PropTypes.string,
            }),
            error: PropTypes.number,
            isFetching: PropTypes.bool,
        }).isRequired,
        auth: PropTypes.shape({
            token: PropTypes.string,
        }).isRequired,
        updateCurrentUser: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isUpdated: false,
            error: null,
            isValid: false,
            avatar: [],
            avatarBase64: {},
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

    onDrop = (acceptedFiles) => {
        this.setState({
            avatar: acceptedFiles[0],
        });
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({
                avatarBase64: {
                    title: acceptedFiles[0].name,
                    src: event.target.result,
                },
            });
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }

    updateAvatar = () => {
        const updateValue = {
            avatar: [
                {
                    ...this.state.avatarBase64,
                },
            ],
        };
        if (this.state.avatar.length !== 0) {
            this.props.updateCurrentUser(
                this.props.auth.token,
                updateValue,
                () => {},
                () => {},
            );
        }
    }


    handleChange(event) {
        this.setState({ name: event.target.value });

        let isValid = false;
        if (event.target.value.length >= event.target.minLength) {
            if (event.target.value.length <= event.target.maxLength) {
                isValid = true;
            }
        }

        this.setState({ isValid });
        return isValid;
    }

    updateSettings(event) {
        const successCallback = () => {
            this.setState({ isUpdated: true });

            this.handleDelayedMessageReset();
        };
        const errorCallback = (status) => {
            this.setState({ error: status });

            this.handleDelayedMessageReset();
        };

        const updateValue = {
            name: this.state.name,
        };

        if (this.state.isValid) {
            this.props.updateCurrentUser(
                this.props.auth.token,
                updateValue,
                successCallback,
                errorCallback,
            );
        }
        event.preventDefault();
    }

    handleDelayedMessageReset = () => {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setState({ error: null, isUpdated: null });
        }, 10000);
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
            return (
                <h4 className="text-danger text-center">
                    Error with status {_error}. Try again!
                </h4>);
        }

        return null;
    }

    render() {
        if (this.props.user.isFetching || this.props.user.isFetching === null) {
            return <Loading />;
        }

        if (this.props.user.error !== null) {
            return <h4 className="text-danger text-center">Error fetching user data!</h4>;
        }


        const { profileImg, name, email } = this.props.user.data;
        const dropzoneStyle = {
            width: '200px',
            height: '50px',
            borderWidth: '1px',
            borderColor: '#717171',
            borderStyle: 'dashed',
            borderRadius: '5px',
            marginBotton: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };
        return (
            <div className="container mx-auto pt-5 pb-5">
                {this.renderMessage(this.state.error, this.state.isUpdated)}
                <div className="bg-white d-flex justify-content-center align-items-center mx-auto profile-card">

                    <Form
                        className="profile-card__content py-5 mb-0"
                        onSubmit={this.updateSettings}
                    >
                        <div className="d-flex justify-content-center border border-top-0 border-right-0 border-left-0 mb-3 pb-1">
                            <img
                                className="mr-3 rounded-circle"
                                src={this.state.avatar.length === 0 ?
                                    profileImg : this.state.avatar.preview}
                                width="100"
                                height="100"
                                alt="profile avatar"
                            />

                            <div className="d-flex flex-column w-50 justify-content-around align-items-center text-center">
                                <Dropzone
                                    onDrop={this.onDrop}
                                    multiple={false}
                                    style={dropzoneStyle}
                                >
                                    {this.state.avatar.length === 0 ?
                                        <span className="label mx-0 my-0">
                                            Drop your avatar here
                                        </span>
                                        :
                                        <span className="label mx-0 my-0">
                                            {this.state.avatar.name}
                                        </span>
                                    }

                                </Dropzone>
                                <button
                                    className="btn btn-secondary w-50"
                                    type="button"
                                    onClick={this.updateAvatar}
                                >Update
                                </button>
                            </div>

                        </div>


                        <Label
                            for="first-name"
                        >Name:
                        </Label>
                        <br />
                        <Input
                            className={this.state.isValid ?
                                'border-top-0 border-right-0 border-left-0 w-100 pl-0 rounded-0'
                                :
                                'border-danger border-top-0 border-right-0 border-left-0 w-100 pl-0 rounded-0'}
                            type="text"
                            name="name"
                            minLength="4"
                            maxLength="15"
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
                            className="border-top-0 border-right-0 border-left-0 w-100 bg-white pl-0 rounded-0"
                            type="Email"
                            name="email"
                            placeholder={email}
                            disabled
                        />

                        <div className="text-center mt-5">
                            <button
                                className="btn btn-primary"
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

const mapStateToProps = ({ auth, user }) => ({
    user,
    auth,
});

const mapDispatchToProps = {
    updateCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
