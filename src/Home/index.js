import React, { Component } from 'react';

import EventsList from '../Events/InfiniteScrollList';
import CalendarList from '../Events/CalendarList';
import ListViewIcon from '../common/ListViewIcon';
import CalendarViewIcon from '../common/CalendarViewIcon';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'LIST',
        };
    }

    toggleListView = () => {
        this.setState({ activeView: 'LIST' });
    }

    toggleCalendarView = () => {
        this.setState({ activeView: 'CALENDAR' });
    }

    render() {
        return (
            <React.Fragment>
                <div className="py-2">
                    <div className="container d-flex justify-content-end pr-4 mt-4">
                        <ListViewIcon
                            activeView={this.state.activeView}
                            onClick={this.toggleListView}
                        />
                        <CalendarViewIcon
                            activeView={this.state.activeView}
                            onClick={this.toggleCalendarView}
                        />
                    </div>
                </div>

                {this.state.activeView === 'LIST' ?
                    <EventsList />
                    :
                    <CalendarList />
                }
            </React.Fragment>
        );
    }
}

export default HomePage;
