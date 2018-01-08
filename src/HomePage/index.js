import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../common/Header';
import Footer from '../common/Footer';

import CardList from '../EventsHandling/CardList/CardList';
import { fetchConferences } from '../core/duck';

class HomePage extends Component {
    componentDidMount() {
        this.props.fetchConferences();
    }

    render() {
        const error = this.props.error ? <div> {this.props.error} </div> : null;
        return (
            <div>
                <Header />
                {error}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching,
        lastFetched: state.lastFetched,
        conferences: state.conferences,
        error: state.error,
    };
};

const mapDispatchToProps = {
    fetchConferences,
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
