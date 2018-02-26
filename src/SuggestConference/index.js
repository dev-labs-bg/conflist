import React, { Component } from 'react';

class SuggestConference extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div
                className="w-100 h-100 embed-responsive embed-responsive-16by9"
            >
                <iframe
                    className="embed-responsive-item"
                    title="Conflist Suggest a conference"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src="https://devlabs.typeform.com/to/UJp2uM"
                />
            </div>
        );
    }
}

export default SuggestConference;
