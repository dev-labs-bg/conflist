import React from 'react';
import PropTypes from 'prop-types';
import './loading.css';

const loading = ({ white }) => (
    <div className="load-wrapp pt-5">
        <div className="load-9">
            <div className="spinner">
                <div className={`${white ? 'bubble-1 bg-white' : 'bubble-1'}`} />
                <div className={`${white ? 'bubble-2 bg-white' : 'bubble-2'}`} />
            </div>
        </div>
    </div>
);

loading.propTypes = {
    // Changes the color of the loading indicator to white
    white: PropTypes.bool,
};

loading.defaultProps = {
    white: false,
};

export default loading;
