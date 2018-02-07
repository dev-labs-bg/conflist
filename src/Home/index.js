import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../Events/Event';
import EventsList from '../Events/List';
import { fetchConferences } from '../Events/List/duck';
import { fetchWishList } from '../Events/WishList/duck';

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
            isFething: PropTypes.bool,
        }),
        fetchConferences: PropTypes.func.isRequired,
        fetchWishList: PropTypes.func.isRequired,

    };

    static defaultProps = {
        wishList: {},
    }

    componentDidMount() {
        this.props.fetchConferences(() => {
            if (this.props.auth.isAuthenticated) {
                this.props.fetchWishList(this.props.auth.token);
            }
        });
    }

    render() {
        const { error } = this.props.events;
        const { isFetching } = this.props.events;

        if (this.props.wishList.isFetching) {
            return (
                <div>
                Loading...
                </div>
            );
        }

        if (error !== null) {
            return (
                <div>
                    Error with status { error }
                </div>
            );
        }

        if (isFetching) {
            return (
                <div>
                Loading...
                </div>
            );
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
    fetchWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
