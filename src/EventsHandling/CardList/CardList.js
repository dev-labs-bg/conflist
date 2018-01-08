import React, { Component } from 'react';

import Card from '../../common/Card';


class CardList extends Component {

    render() {
        const renderCards = this.props.events.map(el => {
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
    }
};

export default CardList;
