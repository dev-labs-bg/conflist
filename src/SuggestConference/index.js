import React, { Component } from 'react';

class SuggestConference extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const style = {
            height: '100vh',
        };
        return (
            <div
                className="w-100"
                style={style}
            >
                <iframe
                    className="mx-auto"
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
