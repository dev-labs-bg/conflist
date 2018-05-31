import React from 'react';
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


export default loading;
