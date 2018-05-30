import React, { Component } from 'react';

import Calendar from 'react-calendar';
import './Calendar.css';

class CalendarList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        };
    }

    clickedDaYListener = (value) => {
        console.log(value)
    }

    render() {
        return (
            <div className="container-fluid px-5 pt-3 pb-5">
                <div className="row px-5">
                    <div className="col-md-4 bg-white">
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
                    <div className="col-md calendar-view-events__wrapper">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarList;
