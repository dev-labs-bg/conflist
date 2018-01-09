import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Card from '../../common/Card';
import Event from '../Event';

class CardList extends Component {
    constructor(props) {
        super(props);

        this.eventsGroupedByMonth = {};

        // TODO: Delete me :) Just for the test.
        // this.props.events.map( (event, i) => {
        //     event.start = '2017-0' + (5 + i) + '-11';
        //
        //     return event;
        // });

        this.props.events.forEach((event) => {
            const month = moment(event.start).format('MMMM|YYYY');

            this.eventsGroupedByMonth[month] = {
                month: moment(event.start).format('MMMM'),
                data: this.eventsGroupedByMonth[month] ?
                    [...this.eventsGroupedByMonth[month].data, event] : [event],
            };
        });
    }

    // TODO: Handle multiple events per month!
    renderCards = () => {
        const { events } = this.props;

        if (!events.length) {
            return null;
        }

        return events.map(event => (
            <div className="mb-5">
                <h2 className="cards-date font-weight-normal">
                    {moment(event.start).format('MMMM')}
                </h2>
                <Card event={event} />
            </div>
        ));
    }

    render() {
        return (
            <div className="container mx-auto pt-5 pb-5">
                <div className="mb-5">
                    { this.renderCards() }
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
