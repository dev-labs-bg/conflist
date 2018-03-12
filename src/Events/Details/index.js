import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Loading from '../../common/Loading';
import HeartFullIcon from '../../common/HeartFullIcon';
import PopoverItem from '../../common/PopoverItem';
import Event from '../Event';
import { getFormattedDate } from '../../core/Dates';
import { fetchConferenceDeatails } from './duck';
import { attendConference, fetchWishListIfNeeded } from '../WishList/duck';

class InsidePage extends Component {
    static propTypes = {
        event: PropTypes.shape({
            data: PropTypes.instanceOf(Event),
            error: PropTypes.number,
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
        }),
        auth: PropTypes.shape({
            isAuthenticated: PropTypes.bool.isRequired,
            token: PropTypes.string,
        }),
        wishList: PropTypes.shape({
            data: PropTypes.instanceOf(Event),
        }),
        alias: PropTypes.string.isRequired,
        fetchConferenceDeatails: PropTypes.func.isRequired,
        attendConference: PropTypes.func,
        fetchWishListIfNeeded: PropTypes.func,
    };
    static defaultProps = {
        event: {},
        wishList: {},
        auth: {},
        attendConference: () => {},
        fetchWishListIfNeeded: () => {},
    };

    constructor(props) {
        super(props);

        this.state = {
            isUpdated: false,
            error: null,
            isNotAuth: false,
            eventIsInWishList: false,
        };
    }

    componentDidMount() {
        this.props.fetchConferenceDeatails(this.props.alias);
        if (this.props.auth.isAuthenticated) {
            this.props.fetchWishListIfNeeded(this.props.auth.token);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.alias !== nextProps.alias) {
            this.props.fetchConferenceDeatails(nextProps.alias);
            if (this.props.auth.isAuthenticated) {
                this.props.fetchWishListIfNeeded(this.props.auth.token);
            }
        }
    }

    isEventInWhishlist = (_eventID, _wishlist) => {
        const event = _.find(_wishlist.data, e => e.id === _eventID);

        return typeof event !== 'undefined';
    }

    checkEventInWishList = () => {
        // Case 1
        if (!this.props.auth.isAuthenticated) {
            this.setState({ isNotAuth: true });
            this.handleDelayedMessageReset();

            return;
        }

        // Case 2
        const eventID = this.props.event.data.id;
        const isEventInWhishlist =
            this.isEventInWhishlist(eventID, this.props.wishList);

        if (isEventInWhishlist) {
            this.setState({ eventIsInWishList: true });
            this.handleDelayedMessageReset();
        } else {
            this.setState({ eventIsInWishList: false });
            this.addToWishList();
        }
    }

    addToWishList = () => {
        const successCallback = () => {
            this.setState({ isUpdated: true });
            this.setState({ eventIsInWishList: true });

            this.handleDelayedMessageReset();
        };
        const errorCallback = (status) => {
            this.setState({ error: status });

            this.handleDelayedMessageReset();
        };

        if (!this.state.eventIsInWishList) {
            this.props.attendConference(
                this.props.event.data.id,
                this.props.auth.token,
                successCallback,
                errorCallback,
            );
        }
    }

    handleDelayedMessageReset = () => {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setState({
                error: null,
                isUpdated: null,
                isNotAuth: null,
                eventIsInWishList: null,
            });
        }, 10000);
    }

    renderMessage() {
        if (this.state.isUpdated) {
            return (
                <h4 className="text-danger text-center mt-3">
                    You added this conference to your Wanna Go List successfully!
                </h4>);
        }

        if (this.state.error !== null) {
            return (
                <h4 className="text-danger text-center mt-3">
                    Error with status {this.state.error}. Try again!
                </h4>);
        }

        if (this.state.isNotAuth) {
            return (
                <h4 className="text-danger text-center mt-3">
                    Login or Register so you can add conferences to your Wanna Go List!
                </h4>);
        }

        if (this.state.eventIsInWishList) {
            return (
                <h4 className="text-danger text-center mt-3">
                    You already added this conference to your Wanna Go List!
                </h4>
            );
        }

        return null;
    }

    renderSpeakers() {
        const renderImages = [];
        this.props.event.data.speakers.map((speaker, key) => {
            renderImages.push(
                <div className="d-inline" key={key} >
                    <PopoverItem key={key} item={speaker} id={key}>
                        <img
                            className="rounded-circle mr-2"
                            key={key}
                            src={speaker.pictureUrl}
                            width="40"
                            height="40"
                            alt={speaker.name}
                        />
                    </PopoverItem>
                </div>);
            return key;
        });
        return renderImages;
    }

    renderTags() {
        const renderTags = [];
        this.props.event.data.tags.map((tag) => {
            renderTags.push(<span
                key={tag}
                className="badge badge-pill badge-light mr-2"
            >{tag}
            </span>);
            return tag;
        });
        return renderTags;
    }

    /**
     * Using dangerouslySetInnerHTML
     *
     * {@link https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml}
     *
     * @return {object}
     */
    renderDescription() {
        return { __html: this.props.event.data.description };
    }

    render() {
        const { error, isFetching, data } = this.props.event;

        if (typeof isFetching === 'undefined' || isFetching) {
            return <Loading />;
        }

        if (error !== null) {
            return (
                <div>
                    Error with status { error }
                </div>
            );
        }

        return (
            <div className="container__register mx-auto pt-5 pb-5 d-flex flex-column">
                <img
                    className="mx-auto mb-5"
                    src={data.pictureUrl}
                    width="381"
                    height="388"
                    alt={data.name}
                />

                <div className="mb-1">
                    <h4 className="mb-3">{data.name}</h4>
                    <span className="card__dates">{getFormattedDate(data.start, data.end)}
                        <span className="text-info"> | </span> {data.venue}, {data.city}, {data.country}
                    </span>

                    <div className="mb-4 mt-2">
                        {this.renderTags()}
                    </div>

                    <div className="mb-4 text-bottom d-flex">
                        <HeartFullIcon />
                        <h5 className="ml-2 font-weight-normal d-inline">Going:
                            <span className="text-secondary ml-1">{data.attendees.length}</span>
                        </h5>
                    </div>
                    <div dangerouslySetInnerHTML={this.renderDescription()} />

                </div>

                <div className="mb-5">
                    <h5 className="font-weight-bold mb-2">Speakers:</h5>
                    {this.renderSpeakers()}
                </div>

                <div className="text-center">
                    <a
                        className="btn btn-primary mr-5"
                        onClick={this.checkEventInWishList}
                        tabIndex="0"
                    >Wanna go
                    </a>
                    <a
                        className="btn btn-secondary"
                        href={data.website}
                        target="_blank"
                    >Go to website
                    </a>
                </div>
                {this.renderMessage()}
            </div>
        );
    }
}

const mapStateToProps = ({ auth, wishList, event }, { location }) => {
    const pathnameArray = location.pathname.split('/');

    return {
        event: event[pathnameArray[pathnameArray.length - 1]],
        alias: pathnameArray[pathnameArray.length - 1],
        auth,
        wishList,
    };
};

const mapDispatchToProps = {
    fetchConferenceDeatails,
    fetchWishListIfNeeded,
    attendConference,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsidePage);
