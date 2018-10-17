import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EventsList from '../Events/InfiniteScrollList';
import CalendarList from '../Events/CalendarList';
import ListViewIcon from '../common/ListViewIcon';
import CalendarViewIcon from '../common/CalendarViewIcon';

class HomePage extends Component {
    static propTypes = {
        auth: PropTypes.shape({
            isAuthenticated: PropTypes.bool,
            token: PropTypes.string,
        }).isRequired,
    };


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
                <div className={`${this.props.auth.isAuthenticated ? 'buttons-toggle-view__wrapper button-toggle-view__wrapper--auth' : 'bg-white'} py-2`}>
                    <div className="container d-flex py-1">
                        <ListViewIcon
                            isAuthenticated={this.props.auth.isAuthenticated}
                            activeView={this.state.activeView}
                            onClick={this.toggleListView}
                        />
                        <CalendarViewIcon
                            isAuthenticated={this.props.auth.isAuthenticated}
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

const mapStateToProps = ({ auth }) => ({
    auth,
});

export default connect(mapStateToProps)(HomePage);
