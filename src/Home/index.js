import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../Events/Event';
import EventsList from '../Events/List';
import { fetchConferences } from '../Events/List/duck';

class HomePage extends Component {
    static propTypes = {
        events: PropTypes.shape({
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            error: PropTypes.number,
        }).isRequired,
        fetchConferences: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchConferences();
    }

    render() {
        const error = this.props.events.error;
        const loading = this.props.events.isFetching;

        if (error !== null) {
            return (
                <div>
                    Error with status { error }
                </div>
            );
        }

        if (loading) {
            return (
                <div>
                Loading...
                </div>
            );
        }

        return (
            <div>
                <EventsList events={this.props.events.data || undefined} />
            </div>
        );
    }
}

const mapStateToProps = ({ events }) => {
    return {
        events,
    };
};

const mapDispatchToProps = {
    fetchConferences,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
