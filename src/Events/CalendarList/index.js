import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Calendar from 'react-calendar';
import * as _ from 'lodash';

import Card from '../../common/Card';
import Loading from '../../common/Loading';
import { fetchConferencesByDate } from './duck';
import { fetchWishListIfNeeded } from '../WishList/duck';
import Event from '../Event';
import eventIcon from '../../assets/images/event-icon.svg';
import './Calendar.css';

class CalendarList extends Component {
    static propTypes = {
        calendarEvents: PropTypes.shape({
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            error: PropTypes.number,
        }).isRequired,
        authToken: PropTypes.string,
        wishList: PropTypes.shape({
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        }),
        fetchConferencesByDate: PropTypes.func.isRequired,
        fetchWishListIfNeeded: PropTypes.func,
    };

    static defaultProps = {
        wishList: {},
        authToken: '',
        fetchWishListIfNeeded: () => {},
    }

    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        const date = moment().format('YYYY-MM-DD');
        this.props.fetchConferencesByDate(date);
        if (this.props.authToken) {
            this.props.fetchWishListIfNeeded(this.props.authToken);
        }
    }

    clickedDaYListener = (value) => {
        const date = moment(value).format('YYYY-MM-DD');
        this.props.fetchConferencesByDate(date);
    }

    /**
     * Get the eventsList data and build the JSX cards with wishlisted option or
     * display message when there is no data available
     * @return {array}
     */
    renderCards = () => {
        if (this.props.calendarEvents.data.length === 0) {
            return (
                <div className="text-center py-5">
                    <img className="mb-4" src={eventIcon} alt="no events" />
                    <h4 className="text-white">
                        No conferences available for the chosen date.
                    </h4>
                </div>);
        }

        const cards = [];
        const wishListIds = [];

        if (this.props.wishList.data !== undefined) {
            this.props.wishList.data.map(ev => wishListIds.push(ev.id));
        }

        this.props.calendarEvents.data.forEach((event) => {
            cards.push(_.indexOf(wishListIds, event.id) !== -1 ?
                <Card key={event.id} event={event} wishListed /> :
                <Card key={event.id} event={event} />);
        });

        return cards;
    }

    render() {
        if (this.props.authToken) {
            if (this.props.wishList.isFetching || this.props.wishList.isFetching === null) {
                return <Loading />;
            }
        }

        if (this.props.calendarEvents.error !== null) {
            return <div className="text-center">Error with status {this.props.calendarEvents.error} </div>;
        }

        return (
            <div className="container-fluid px-5 pt-3 pb-5">
                <div className="row px-5">
                    <div className="col col-xl-4 bg-white">
                        <Calendar
                            className="mb-5 mt-4"
                            value={this.state.date}
                            locale="en-EN"
                            onClickDay={this.clickedDaYListener}
                            prevLabel={
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="12" height="22" viewBox="0 0 12 22"><defs><path id="tdnaa" d="M159.57 694.98l10.22-9.92a.6.6 0 0 0 0-.88.65.65 0 0 0-.9 0l-10.68 10.36a.6.6 0 0 0 0 .88l10.68 10.36c.12.12.28.18.45.18.16 0 .32-.06.45-.18a.6.6 0 0 0 0-.88z" /></defs><g><g transform="translate(-158 -684)"><use fill="#040f22" xlinkHref="#tdnaa" /></g></g></svg>
                            }
                            nextLabel={
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="12" height="22" viewBox="0 0 12 22"><defs><path id="3ngea" d="M495.8 694.54l-10.68-10.36a.65.65 0 0 0-.9 0 .6.6 0 0 0 0 .88l10.22 9.92-10.22 9.92a.6.6 0 0 0 0 .88c.12.12.29.18.45.18.16 0 .33-.06.45-.18l10.68-10.36a.6.6 0 0 0 0-.88z" /></defs><g><g transform="translate(-484 -684)"><use fill="#040f22" xlinkHref="#3ngea" /></g></g></svg>
                            }
                            next2Label={null}
                            prev2Label={null}
                        />
                    </div>
                    <div className="col calendar-view-events__wrapper d-flex flex-column justify-content-center py-4">
                        {this.props.calendarEvents.isFetching || this.props.calendarEvents.isFetching === null ?
                            (<Loading white />)
                            : this.renderCards()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ calendarEvents, wishList, auth }) => ({
    calendarEvents,
    wishList,
    authToken: auth.token,
});

const mapDispatchToProps = {
    fetchConferencesByDate,
    fetchWishListIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarList);
