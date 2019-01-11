import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const feedback = ({ rating }) => (
    <div className="container mx-auto pt-5 pb-5">
        {
            rating === '0' ?
                (<h1 className="text-center mb-5">
                  Looks like you didn&apos;t attend that conference.
                </h1>) :
                (<h1 className="text-center mb-5">
                  Thank you for your feedback, we hope you enjoyed that conference!
                </h1>
                )
        }
        <h3 className="font-weight-normal mb-4">
            You can find more conferences
            at <Link className="text-info" to="/home">
                conflist
               </Link>,
        </h3>
        <h3> or <Link className="text-info" to="/conference-suggest">
            suggest a conference
        </Link> to improve our list!
        </h3>

    </div>
);

const mapStateToProps = ({}, { location }) => {
    const pathnameArray = location.search.split('=');
    return {
        rating: pathnameArray[1],
    };
};

export default connect(mapStateToProps)(feedback);
