import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../EventsHandling/Event';
import CardList from '../EventsHandling/CardList/CardList';
import { fetchConferences } from '../EventsHandling/conference';

class HomePage extends Component {
    static propTypes = {
        events: PropTypes.shape({
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            error: PropTypes.number,
        }).isRequired,
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
                <CardList events={this.props.events.data || undefined} />
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
