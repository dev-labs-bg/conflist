import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Card from '../../common/Card';
import Event from '../Event';

class CardList extends Component {
    render() {
        let month;
        let groupedEvents = [];
        const dates = this.props.events.forEach(el => {
            month = moment(el.start).format('MMMM');
            groupedEvents.push({
                month, el,
            });
        });
        console.log(groupedEvents);

        const renderCards = this.props.events.map(el => {
            return (
                <div className="mb-5">
                    <h2 className="cards-date font-weight-normal">
                        {moment(el.start).format('MMMM')}
                    </h2>
                    <Card event={el} />
                </div>
            );
        });

        return (
            <div className="container mx-auto pt-5 pb-5">
                <div className="mb-5">
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
