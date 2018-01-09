import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../../common/Card';
import Event from '../Event';

class CardList extends Component {

    render() {
        const renderCards = this.props.events.map(el => {
            return <Card event={el} />;
        });

        return (
            <div className="container mx-auto pt-5 pb-5">
                <div className="mb-5">
                    <h2 className="cards-date font-weight-normal">June</h2>
                    {this.props.events ? renderCards : null}
                </div>
            </div>
        );
    }
}
CardList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
};
CardList.defaultProps = {
    events: [],
};
export default CardList;
