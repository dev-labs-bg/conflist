import React, { Component } from 'react';

class SuggestConference extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const style = {
        };
        const iFrame = {
            position: 'absolute',
            overflow: 'hidden',
            bottom: '0',
            height: 'calc(100% - 93px)',
        };
        return (
            <div
                style={style}
            >
                <iframe
                    title="Conflist Suggest a conference"
                    width="100%"
                    frameBorder="0"
                    style={iFrame}
                    allowFullScreen
                    align="middle"
                    src="https://devlabs.typeform.com/to/UJp2uM"
                />
            </div>
        );
    }
}

export default SuggestConference;
