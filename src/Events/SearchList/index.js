import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../Event';
import EventsList from '../List';
import { getEventsByTag } from './duck';

class SearchList extends Component {
    static propTypes = {
        searchTag: PropTypes.string.isRequired,
        getEventsByTag: PropTypes.func.isRequired,
        wishList: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        searchList: PropTypes.shape({
            isFetching: PropTypes.bool,
            error: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        }).isRequired,
    };

    static defaultProps = {
        wishList: [],
    };

    componentDidMount() {
        this.props.getEventsByTag(this.props.searchTag);
    }

    render() {
        const { isFetching, error, data } = this.props.searchList;

        if (isFetching || isFetching === null) {
            return <div>Loading!</div>;
        }

        if (error !== null) {
            return <div>Error with status {this.props.searchList.error} </div>;
        }
        return (
            <EventsList
                events={data || undefined}
                wishList={this.props.wishList}
            />
        );
    }
}

const mapStateToProps = ({ searchList }, { location }) => {
    const pathnameArray = location.pathname.split('/');

    return {
        searchList,
        searchTag: pathnameArray[pathnameArray.length - 1],
        wishList: location.state.wishList,
    };
};

const mapDispatchToProps = {
    getEventsByTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
