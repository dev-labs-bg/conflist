import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../common/Header';
import Footer from '../common/Footer';

import CardList from '../EventsHandling/CardList/CardList';
import { fetchConferences } from '../Conferences/conference';

class HomePage extends Component {
    componentDidMount() {
        this.props.fetchConferences();
    }

    render() {
        const error = this.props.error ? <div> {this.props.error} </div> : null;
        const loading = this.props.isFetching ? <div>Loading...</div> : null;
        return (
            <div>
                <Header />
                {error}
                {loading}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.conference.isFetching,
        lastFetched: state.conference.lastFetched,
        conferences: state.conference.data,
        error: state.conference.error,
    };
};

const mapDispatchToProps = {
    fetchConferences,
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
