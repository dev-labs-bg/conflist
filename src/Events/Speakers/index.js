import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EventsList from '../List';
import Loading from '../../common/Loading';
import { fetchWishListIfNeeded } from '../WishList/duck';

class Speakers extends Component {
    static propTypes = {
        eventsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    render() {
        // if (this.props.authToken) {
        //     if (this.props.wishList.isFetching || this.props.wishList.isFetching === null) {
        //         return <Loading />;
        //     }
        // }

        const wishList = this.props.wishListData.length === 0 ?
            this.props.wishList.data : this.props.wishListData;
        console.log(this.props.eventsList)
        return (
            <div className="pb-5 pt-5 container">
                <h1 className="text-center">Events with speaker {this.props.speakerName}</h1>
                <div className="mt-2">
                    <EventsList
                        events={this.props.eventsList || undefined}
                        wishList={wishList}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ wishList, auth }, { location }) => {
    const pathnameArray = location.pathname.split('/');
    const eventsList = [];
    location.state.eventsList.forEach((data) => {
        if (data.resourceType === 'conference') {
            eventsList.push(data);
        }
    })
    return {
        authToken: auth.token,
        eventsList,
        wishListData: location.state.wishListData,
        wishList,
        speakerName: pathnameArray[pathnameArray.length - 1],
    };
};

const mapDispatchToProps = {
    fetchWishListIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);
