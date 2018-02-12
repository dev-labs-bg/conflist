import React, { Component } from 'react';

import eventIcon from '../assets/images/event-icon.svg';

class MySubscriptions extends Component {
    constructor(props) {
        super(props);

    }

    render () {
        const noSubscriptions = (
            <div class="text-center py-5">
                <div class="mb-5">
                    <img src={eventIcon} />
                    <h4>There are no <span class="text-info">Events</span></h4>
                </div>

                <div class="bg-white card-subscription mx-auto px-5 py-5 text-left">
                    <div class="px-3">
                        <h4 class="mb-4">
                            <span class="text-info">
                                Subscribe
                            </span>
                            to receive updates about the upcoming conferences with #javascript and #web tags
                        </h4>

                        <div class="text-center mb-5">
                            <button class="btn btn-primary">Sounds good</button>
                        </div>

                        <h6>
                            <span class="text-info"> PS: </span>
                            You can always manage your subscription list and unsubscribe.
                        </h6>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="py-5">
                <h1 className="text-center mb-5">My Subscriptions</h1>

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
                            Once in a month you will receive an update about the upcoming and the new conferences matching these tags.
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

export default MySubscriptions;
