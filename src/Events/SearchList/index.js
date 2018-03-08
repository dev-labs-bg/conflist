import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../../common/Loading';
import SubscribeCard from '../../common/SubscribeCard';
import Event from '../Event';
import EventsList from '../List';
import { getEventsByTag } from './duck';
import { fetchWishListIfNeeded } from '../WishList/duck';
import eventIcon from '../../assets/images/event-icon.svg';

class SearchList extends Component {
    static propTypes = {
        searchTag: PropTypes.string.isRequired,
        getEventsByTag: PropTypes.func.isRequired,
        wishListData: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        searchList: PropTypes.shape({
            isFetching: PropTypes.bool,
            error: PropTypes.number,
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        }).isRequired,
        wishList: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            isFetching: PropTypes.bool,
        }),
        authToken: PropTypes.string,
        fetchWishListIfNeeded: PropTypes.func,
    };

    static defaultProps = {
        wishListData: [],
        wishList: {},
        authToken: '',
        fetchWishListIfNeeded: () => {},
    };

    componentDidMount() {
        this.props.getEventsByTag(this.props.searchTag);
        if (this.props.authToken) {
            this.props.fetchWishListIfNeeded(this.props.authToken);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchTag !== this.props.searchTag) {
            this.props.getEventsByTag(nextProps.searchTag);
        }
    }

    render() {
        const { isFetching, error, data } = this.props.searchList;

        if (isFetching || isFetching === null) {
            return <Loading />;
        }

        if (this.props.authToken) {
            if (this.props.wishList.isFetching || this.props.wishList.isFetching === null) {
                return <Loading />;
            }
        }

        if (error !== null) {
            return <div>Error with status {this.props.searchList.error} </div>;
        }

        if (data.length === 0) {
            return (
                <div className="text-center py-5">
                    <img className="mb-4" src={eventIcon} alt="no events" />
                    <h4>There are no
                        <span className="text-info"> Events </span>
                    </h4>
                    <SubscribeCard tag={this.props.searchTag} />
                </div>);
        }
        const wishList = this.props.wishListData.length === 0 ?
            this.props.wishList.data : this.props.wishListData;

        return (
            <div>
                <h2
                    className="text-center mt-5"
                >Results
                </h2>
                <EventsList
                    events={data || undefined}
                    wishList={wishList}
                />
                <SubscribeCard tag={this.props.searchTag} />
            </div>
        );
    }
}

const mapStateToProps = ({ searchList, wishList, auth }, { location }) => {
    const pathnameArray = location.pathname.split('/');

    return {
        authToken: auth.token,
        searchList,
        searchTag: pathnameArray[pathnameArray.length - 1],
        wishListData: location.state.wishList,
        wishList,
    };
};

const mapDispatchToProps = {
    getEventsByTag,
    fetchWishListIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
