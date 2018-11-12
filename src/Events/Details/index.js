import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Loading from '../../common/Loading';
import TooltipItem from '../../common/TooltipItem';
import going from '../../assets/images/going.svg';
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
            updateCount: 0,
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
            this.setState({ updateCount: 1 });

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

    tagClicked = (event) => {
        this.props.history.push({
            pathname: `/search/${event.target.textContent}`,
            state: {
                wishListData: {},
            },
        });
    }

    renderSpeakers() {
        const renderImages = [];
        this.props.event.data.speakers.map((speaker, key) => {
            renderImages.push(<div className="mr-2" key={speaker.twitterId} >
                <TooltipItem speaker={speaker} id={speaker.twitterId}>
                    <a
                        style={{ cursor: 'pointer', display: 'inline-block' }}
                        target="_blank"
                        href={`https://twitter.com/@${speaker.twitterName}`}
                    >
                        <img
                            className="rounded-circle"
                            src={speaker.pictureUrl}
                            width="40"
                            height="40"
                            alt={speaker.name}
                        />
                    </a>
                </TooltipItem>
            </div>);
            return key;
        });
        return renderImages;
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

    renderTags() {
        const renderTags = [];
        const style = {
            cursor: 'pointer',
        };

        this.props.event.data.tags.map((tag) => {
            renderTags.push(<span
                key={tag}
                className="badge badge-pill badge-light mb-2 mb-sm-0 mr-2"
                style={style}
                onClick={
                    this.tagClicked
                }
            >
                {tag}
            </span>);
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
                    width="100%"
                    src={data.pictureUrl}
                    alt={data.name}
                />

                <div className="mb-1">
                    <h1 className="mb-4">{data.name}</h1>
                    <h4>{getFormattedDate(data.start, data.end)}
                        <span className="text-info"> | </span> {data.venue}, {data.city}, {data.country}
                    </h4>

                    <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                        <div>
                            {this.renderTags()}
                        </div>
                        <div className="text-bottom d-flex">
                            <img src={going} alt="People Going" />
                            <h4 className="ml-3 mb-0 font-weight-normal">{data.attendable ? 'Going:' : 'Visited:'}
                                <span className="text-secondary ml-1">{data.attendees.length + this.state.updateCount}</span>
                            </h4>
                        </div>
                    </div>

                    <div dangerouslySetInnerHTML={this.renderDescription()} />

                </div>

                <div className="mb-5">
                    <h4 className="mb-3">Speakers:</h4>
                    <div className='d-flex'>
                        {this.renderSpeakers()}
                    </div>
                </div>

                <div className="text-center">
                    {
                        data.attendable && (
                            <a
                                className="btn btn-primary mb-2 mb-sm-0 mr-sm-5"
                                onClick={this.checkEventInWishList}
                                tabIndex="0"
                            >
                                Wanna go
                            </a>
                        )
                    }
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
