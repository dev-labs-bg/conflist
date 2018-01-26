import React, { Component } from 'react';
import { Form, Label, Input } from 'reactstrap';

class ProfileSettings extends Component {
    render() {
        return (
            <div className="container mx-auto pt-5 pb-5">
                <div className="bg-white d-flex justify-content-center align-items-center mx-auto profile-card">

                    <Form className=" profile-card__content py-5 mb-0">
                        <div className="d-flex justify-content-center">
                            <img
                                className="mr-3"
                                src="images/superKalo-profile.jpg"
                                width="100"
                                height="100"
                                alt="profile picture"
                            />

                            <div className="d-flex flex-column w-25 justify-content-around">
                                <span className="label">Your Avatar</span>
                                <button className="btn btn-secondary" type="button">Update</button>
                            </div>

                        </div>
                        <hr className="w-100" />

                        <Label
                            for="first-name"
                        >First Name:
                        </Label>
                        <br />
                        <Input
                            className="border-top-0 border-right-0 border-left-0 w-100"
                            type="text"
                            name="first-name"
                            placeholder="Kaloyan"
                        />

                        <Label
                            className=" mt-3"
                            for="last-name"
                        >Last Name:
                        </Label>
                        <br />
                        <Input
                            className="border-top-0 border-right-0 border-left-0 w-100"
                            type="text"
                            name="last-name"
                            placeholder="Kosev"
                        />

                        <Label
                            className="mt-3"
                            for="email"
                        >Email:
                        </Label>
                        <br />
                        <Input
                            className="border-top-0 border-right-0 border-left-0 w-100"
                            type="Email"
                            name="email"
                            placeholder="me@superkalo.com"
                        />

                        <div className="text-center mt-5">
                            <button className="btn btn-primary btn-lg" type="button">Update Settings</button>
                        </div>
                    </Form>

                </div>
            </div>
        );
    }
}

export default ProfileSettings;
