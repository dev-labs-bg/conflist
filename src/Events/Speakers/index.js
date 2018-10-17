import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../Event';
import EventsList from '../List';
import Loading from '../../common/Loading';
import { fetchWishListIfNeeded } from '../WishList/duck';
import { getEventsBySpeaker } from './duck';
import twitterLogo from '../../assets/images/twitter-logo.svg';

class Speakers extends Component {
    static propTypes = {
        getEventsBySpeaker: PropTypes.func.isRequired,
        fetchWishListIfNeeded: PropTypes.func,
        wishListData: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        wishList: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
            isFetching: PropTypes.bool,
        }),
        speaker: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            pictureUrl: PropTypes.string,
            twitterName: PropTypes.string,
        }).isRequired,
        speakerEvents: PropTypes.shape({
            isFetching: PropTypes.bool,
            data: PropTypes.object,
        }).isRequired,
        authToken: PropTypes.string,

    };

    static defaultProps = {
        fetchWishListIfNeeded: () => {},
        wishListData: [],
        wishList: {},
        authToken: '',
    };

    componentDidMount() {
        this.props.getEventsBySpeaker(this.props.speaker.id);
        if (this.props.authToken) {
            this.props.fetchWishListIfNeeded(this.props.authToken);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.speaker.name !== this.props.speaker.name) {
            this.props.getEventsBySpeaker(nextProps.speaker.id);
        }
    }


    render() {
        const { isFetching, data } = this.props.speakerEvents;
        if (isFetching || isFetching === null) {
            return <Loading />;
        }
        if (this.props.authToken) {
            if (this.props.wishList.isFetching || this.props.wishList.isFetching === null) {
                return <Loading />;
            }
        }

        const wishList = this.props.wishListData.length === 0 ?
            this.props.wishList.data : this.props.wishListData;

        return (
            <div className="pb-5 pt-5 container">
                <h2 className="text-center">Conferences attended by speaker</h2>
                <div className="text-center d-flex justify-content-center align-items-center my-3">
                    <img
                        src={this.props.speaker.pictureUrl}
                        className="rounded-circle"
                        width="150"
                        height="150"
                        alt={this.props.speaker.name}
                    />
                </div>
                <div className="text-center d-flex justify-content-center align-items-center">
                    <h2 className="d-inline mr-3">{this.props.speaker.name}</h2>

                    <a target="_blank" href={`https://twitter.com/@${this.props.speaker.twitterName}`}>
                        <img
                            src={twitterLogo}
                            width="30"
                            height="30"
                            alt={this.props.speaker.twitterName}
                        />
                    </a>
                </div>
                {
                    data.length !== 0 ?
                        <div className="mt-2">
                            <EventsList
                                events={data || undefined}
                                wishList={wishList}
                            />
                        </div>
                        :
                        <div className="mt-3">
                            <h4 className="text-center">
                                This speaker is not attending any conferences!
                            </h4>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ wishList, auth, speakerEvents }, { location }) => ({
    speakerEvents,
    authToken: auth.token,
    wishListData: location.state.wishListData,
    wishList,
    speaker: location.state.speaker,
});

const mapDispatchToProps = {
    fetchWishListIfNeeded,
    getEventsBySpeaker,
};

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);
