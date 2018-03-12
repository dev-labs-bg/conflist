import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Event from '../Event';

import Loading from '../../common/Loading';
import Card from '../../common/Card';
import { fetchWishListIfNeeded } from './duck';
import { orderEventsByMonth } from '../../service';

class WishList extends Component {
    static propTypes = {
        wishList: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            isFetching: PropTypes.bool,
            error: PropTypes.number,
            lastFetched: PropTypes.number,
        }).isRequired,
        upcomingEvents: PropTypes.shape({
            month: PropTypes.shape({
                month: PropTypes.string,
                data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            }),
        }),
        pastEvents: PropTypes.shape({
            month: PropTypes.shape({
                month: PropTypes.string,
                data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            }),
        }),
        authToken: PropTypes.string.isRequired,
        fetchWishListIfNeeded: PropTypes.func.isRequired,
    };

    static defaultProps = {
        upcomingEvents: {},
        pastEvents: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            togglePastEvents: false,
        };
    }

    componentDidMount() {
        this.props.fetchWishListIfNeeded(this.props.authToken);
    }

    changeState = () => {
        this.setState({ togglePastEvents: !this.state.togglePastEvents });
    }

    /**
     * Count events data in array nested in two objects
     * @param  {object} _events
     * @return {number}
     */
    countEventsByMonth = (_events) => {
        let monthEventsNumber;
        _.forEach(_events, (group) => {
            _.forEach(group, (e) => {
                monthEventsNumber = +_.size(group.data);
            });
        });

        return monthEventsNumber;
    }

    /**
     * When there is more than one past event -
     * return past events clickable heading,
     * otherwise - show nothing.
     * @return {JSX}
     */
    countPastEvents = () => {
        if (this.countEventsByMonth(this.props.pastEvents) <= 1) {
            return null;
        }

        if (this.state.togglePastEvents) {
            return null;
        }

        return (
            <span onClick={this.changeState} role="button" >View all
                <span className="text-info"> {this.countEventsByMonth(this.props.pastEvents)} </span>
            past conferences
            </span>
        );
    }

    /**
     * Render JSX Card with the latest past event from user's Wanna Go List
     * @return {Array}
     */
    renderPastEvent = () => {
        if (_.isEmpty(this.props.pastEvents)) {
            return null;
        }
        const cards = [];
        const heading = (
            <h4 key="2" className="mb-3">Last
                <span className="text-info"> 1 </span>
                from all Past conferences
            </h4>);
        cards.push(heading);

        _.forEach(this.props.pastEvents, (group, key) => {
            const firstEvent = _.first(group.data);
            cards.push(
                <div key={key} className="mb-5">
                    {
                        <Card key={firstEvent.id} event={firstEvent} past />
                    }
                    {this.countPastEvents()}
                </div>);
        });

        return cards;
    }

    /**
     *
     * Build JSX Cards with past events from user's Wanna Go List ordered by month,
     * without the first one
     * @return {Array}
     */
    renderAllPastEvents = () => {
        const isThereOnlyOneEvent = this.countEventsByMonth(this.props.pastEvents) <= 1;

        if (isThereOnlyOneEvent) {
            return [];
        }

        const hiddenCards = [];
        _.forEach(this.props.pastEvents, (group, key) => {
            const lastEvents = _.tail(group.data);
            hiddenCards.push(
                <div key={key} className="mb-5">
                    {
                        lastEvents.map(event =>
                            <Card key={event.id} event={event} past />)
                    }
                </div>);
        });

        return hiddenCards;
    }

    /**
     * Render all JSX Cards with upcoming events ordered by month
     * in user's Wanna Go List
     * @return {Array}
     */
    renderUpcomingEvents = () => {
        if (_.isEmpty(this.props.upcomingEvents)) {
            return null;
        }

        const cards = [];
        const heading = (
            <h4 key="1" className="mb-2">Upcoming conferences
                <span className="text-info"> ({this.countEventsByMonth(this.props.upcomingEvents)}) </span>
            </h4>);
        cards.push(heading);

        _.forEach(this.props.upcomingEvents, (group, key) => {
            cards.push(
                <div key={key} className="mb-5">
                    <h2 className="cards-date font-weight-normal">
                        { group.month }
                    </h2>
                    {
                        group.data.map(event =>
                            <Card key={event.id} event={event} wishListed />)
                    }
                </div>);
        });

        return cards;
    }

    render() {
        if (this.props.authToken && this.props.authToken === null) {
            return <Loading />;
        }

        if (this.props.wishList.isFetching && this.props.wishList.isFetching === null) {
            return <Loading />;
        }

        if (this.props.wishList.error !== null) {
            return <h4 className="text-danger text-center">Error fetching your wanna go list!</h4>;
        }

        if (this.props.wishList.data.length === 0) {
            return (
                <div className="container mx-auto pt-5 pb-5">
                    <h1 className="text-center mb-5">Wanna Go List</h1>
                    <h4 className="text-danger text-center">Your list is empty!</h4>
                </div>
            );
        }
        return (
            <div className="container mx-auto pt-5 pb-5">
                <h1 className="text-center mb-5">Wanna Go List</h1>
                {this.renderPastEvent()}
                {this.state.togglePastEvents ? this.renderAllPastEvents() : null}
                <div className="upcoming-conf__container">
                    {this.renderUpcomingEvents()}
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ wishList, auth }) => {
    const { pastEvents, upcomingEvents } = orderEventsByMonth(wishList);

    return {
        wishList,
        pastEvents,
        upcomingEvents,
        authToken: auth.token,
    };
};

const mapDispatchToProps = {
    fetchWishListIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
