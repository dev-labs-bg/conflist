import React from 'react';

import Card from '../../common/Card';
import events from '../Events';

const cardList = () => {
    let renderCards = events;
    renderCards = renderCards.map(el => {
        return <Card event={el} />;
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
