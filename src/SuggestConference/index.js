import React, { Component } from 'react';

class SuggestConference extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="container mx-auto pt-5 pb-5">
                <h1 className="text-center mb-5">Suggest a conference</h1>

                <iframe
                    title="Conflist Suggest a conference"
                    width="700px"
                    height="500px"
                    src="https://devlabs.typeform.com/to/UJp2uM"
                />
            </div>
        );
    }
}

export default SuggestConference;
