import React from 'react';
import './loading.css';

const loading = () => {
    return (
        <div className="load-wrapp pt-5 text-center">
            <div className="load-9">
                <div className="spinner">
                    <div className="bubble-1"></div>
                    <div className="bubble-2"></div>
                 </div>
            </div>
        </div>
    );
};

export default loading;
