import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../common/Header';
import Footer from '../common/Footer';

import CardList from '../EventsHandling/CardList/CardList';
import { fetchConferences } from '../Conferences/conference';

class HomePage extends Component {
    static propTypes = {
        conference: PropTypes.shape({
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.object),
            error: PropTypes.number,
        }).isRequired,
    };


    componentDidMount() {
        this.props.fetchConferences();
    }

    render() {
        const error = this.props.conference.error;
        const loading = this.props.conference.isFetching;

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
                <Header />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = ({ conference }) => {
    return {
        conference,
    };
};

const mapDispatchToProps = {
    fetchConferences,
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
