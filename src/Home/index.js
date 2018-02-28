import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../common/Loading';
import Event from '../Events/Event';
import EventsList from '../Events/List';
import { fetchConferences } from '../Events/List/duck';
import { fetchWishListIfNeeded } from '../Events/WishList/duck';

class HomePage extends Component {
    static propTypes = {
        events: PropTypes.shape({
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            error: PropTypes.number,
        }).isRequired,
        auth: PropTypes.shape({
            isAuthenticated: PropTypes.bool,
            token: PropTypes.string,
        }).isRequired,
        wishList: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
        }),
        fetchConferences: PropTypes.func.isRequired,
        fetchWishListIfNeeded: PropTypes.func.isRequired,
    };

    static defaultProps = {
        wishList: {},
    }

    componentDidMount() {
        this.props.fetchConferences(() => {
            if (this.props.auth.isAuthenticated) {
                this.props.fetchWishListIfNeeded(this.props.auth.token);
            }
        });
    }

    render() {
        const { error } = this.props.events;
        const { isFetching } = this.props.events;

        if (error !== null) {
            return <Loading />;
        }

        if (isFetching) {
            return <Loading />;
        }
        if (this.props.auth.isAuthenticated) {
            if (this.props.wishList.isFetching || this.props.wishList.isFetching === null) {
                return <Loading />;
            }
        }

        return (
            <EventsList
                events={this.props.events.data || undefined}
                wishList={this.props.wishList.data}
            />
        );
    }
}

const mapStateToProps = ({ events, auth, wishList }) => {
    return {
        events,
        auth,
        wishList,
    };
};

const mapDispatchToProps = {
    fetchConferences,
    fetchWishListIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
