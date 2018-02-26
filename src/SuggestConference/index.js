import React, { Component } from 'react';

class SuggestConference extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const style = {
            paddingBottom: '85%',
            height: '0',
            width: '100%',
            position: 'relative',
        };
        const iFrame = {
            top: 0,
            left: 0,
            position: 'absolute',
        };
        return (
            <div
                style={style}
            >
                <iframe
                    className="position-absolute"
                    title="Conflist Suggest a conference"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={iFrame}
                    allowfullscreen
                    src="https://devlabs.typeform.com/to/UJp2uM"
                />
            </div>
        );
    }
}

export default SuggestConference;
