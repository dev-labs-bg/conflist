import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as _ from 'lodash';

import Card from '../../common/Card';
import Event from '../Event';

class CardList extends Component {
    constructor(props) {
        super(props);

        this.eventsGroupedByMonth = {};

        // TODO: Delete me :) Just for the test.
        // this.props.events.map( (event, i) => {
        //     if (i%2) { return event; }
        //
        //     event.start = '2017-0' + (5 + i) + '-11';
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

    /**
     * Get the cards, ordered by month and build the JSX ordering (by month again.)
     */
    renderCards = () => {
        if (_.isEmpty(this.eventsGroupedByMonth)) {
            return null;
        }

        const cards = [];

        _.forEach(this.eventsGroupedByMonth, (group, key) => {
            cards.push(
                <div key={key} className="mb-5">
                    <h2 className="cards-date font-weight-normal">
                        { group.month }
                    </h2>
                    {
                        group.data.map(event =>
                            <Card key={event.id} event={event} />)
                    }
                </div>);
        });

        return cards;
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
