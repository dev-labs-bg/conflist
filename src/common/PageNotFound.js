import React from 'react';

import eventIcon from '../assets/images/event-icon.svg';

const pageNotFound = () => (
    <div className="pt-5 text-center pb-5">
        <img className="mb-4 mr-4" src={eventIcon} alt="no events" />
        <h2 className="">Page not found!</h2>
        <h4>The requested page is not available</h4>
    </div>
);

export default pageNotFound;
