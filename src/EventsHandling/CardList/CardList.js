import React from 'react';

import Card from '../../common/Card';
import { smashingConf, cssDay, angular, frontend } from '../Events';

const cardList = () => (
    <div className="container mx-auto pt-5 pb-5">
        <div className="mb-5">
            <h2 className="cards-date font-weight-normal">June</h2>
            <Card event={smashingConf} />
            <Card event={cssDay} />
            <Card event={angular} />
            <Card event={frontend} />
        </div>
    </div>
);

export default cardList;
