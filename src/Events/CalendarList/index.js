import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Calendar from 'react-calendar';

import Card from '../../common/Card';
import Loading from '../../common/Loading';
import { fetchConferencesByDate } from './duck';
import eventIcon from '../../assets/images/event-icon.svg';
import './Calendar.css';

class CalendarList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        const date = moment().format('YYYY-MM-DD');
        this.props.fetchConferencesByDate(date);
    }

    clickedDaYListener = (value) => {
        const date = moment(value).format('YYYY-MM-DD');
        this.props.fetchConferencesByDate(date);
    }

    renderCards = () => {
        const cards = [];

        this.props.calendarEvents.data.forEach((event) => {
            cards.push(<Card key={event.id} event={event} />);
        });

        return cards;
    }

    render() {
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
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="12" height="22" viewBox="0 0 12 22"><defs><path id="tdnaa" d="M159.57 694.98l10.22-9.92a.6.6 0 0 0 0-.88.65.65 0 0 0-.9 0l-10.68 10.36a.6.6 0 0 0 0 .88l10.68 10.36c.12.12.28.18.45.18.16 0 .32-.06.45-.18a.6.6 0 0 0 0-.88z"/></defs><g><g transform="translate(-158 -684)"><use fill="#040f22" xlinkHref="#tdnaa"/></g></g></svg>
                            }
                            nextLabel={
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="12" height="22" viewBox="0 0 12 22"><defs><path id="3ngea" d="M495.8 694.54l-10.68-10.36a.65.65 0 0 0-.9 0 .6.6 0 0 0 0 .88l10.22 9.92-10.22 9.92a.6.6 0 0 0 0 .88c.12.12.29.18.45.18.16 0 .33-.06.45-.18l10.68-10.36a.6.6 0 0 0 0-.88z"/></defs><g><g transform="translate(-484 -684)"><use fill="#040f22" xlinkHref="#3ngea"/></g></g></svg>
                            }
                            next2Label={null}
                            prev2Label={null}
                        />
                    </div>
                    <div className="col calendar-view-events__wrapper d-flex flex-column justify-content-center">
                        {this.props.calendarEvents.isFetching || this.props.calendarEvents.isFetching === null ?
                            (<Loading white />)
                            :
                            this.props.calendarEvents.data.length === 0 ?
                                    (
                                    <div className="text-center py-5">
                                        <img className="mb-4" src={eventIcon} alt="no events" />
                                        <h4 className="text-white">No conferences available for the chosen date.</h4>
                                    </div>)
                                    :
                                this.renderCards()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ calendarEvents }) => {
    return {
        calendarEvents,
    };
};

const mapDispatchToProps = {
    fetchConferencesByDate,
};

export default connect(mapStateToProps,mapDispatchToProps)(CalendarList);
