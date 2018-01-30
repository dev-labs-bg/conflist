import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const Wrapper = (props) => {
    return (
        <div>
            <Header
                isAuthenticated={props.auth}
                userName={props.userName}
                profileImg={props.profileImg}
            />
            {props.children}
            <Footer />
        </div>
    );
};

Wrapper.propTypes = {
    auth: PropTypes.bool.isRequired,
};

export default Wrapper;
