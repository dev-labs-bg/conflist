import React from 'react';

import Card from '../../common/Card';
import { smashingConf, cssDay, angular, frontend } from '../Events';

const cardList = () => {
    let renderCards = [];
    renderCards.push(smashingConf, cssDay, angular, frontend);
    renderCards = renderCards.map(el => {
        console.log(el);
        return <Card event={el} />;
    });

    const listTitle = renderCards.map(el => {
        const date = new Date(el.dates.start);
        console.log(date);
    });

    return (
        <div className="container mx-auto pt-5 pb-5">
            <div className="mb-5">
                <h2 className="cards-date font-weight-normal">June</h2>
                {renderCards}
            </div>
        </div>
    );
};

export default cardList;
