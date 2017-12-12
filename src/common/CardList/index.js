import React from 'react';

import Card from './Card';

const cardList = () => (
    <div className="container mx-auto pt-5 pb-5">
        <div className="mb-5">
            <h2 className="cards-date font-weight-normal">June</h2>
            <Card />
            <Card />
        </div>
    </div>
);

export default cardList;
