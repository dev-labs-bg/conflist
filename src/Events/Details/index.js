import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        alias: PropTypes.string.isRequired,
        fetchConferenceDeatails: PropTypes.func.isRequired,
        attendConference: PropTypes.func,
    };
    static defaultProps = {
        event: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            isUpdated: false,
            error: null,
            isNotAuth: false,
            eventIsInWishList: false,
        }

    }

    componentDidMount() {
        this.props.fetchConferenceDeatails(this.props.alias);
        if (this.props.auth.isAuthenticated) {
            this.props.fetchWishListIfNeeded(this.props.auth.token);
        }
    }

    checkEventInWishList = () => {
        if (this.props.auth.isAuthenticated) {
            if (this.props.wishList.data.length === 0) {
                this.setState({ eventIsInWishList: false });
            }

            this.props.wishList.data.map((event) => {
                // ev.id.indexOf(this.props.event.data.id) === -1 ?
                //     this.setState({ eventIsInWishList: false }) :
                //     this.setState({ eventIsInWishList: true });
                const isEventInWishList = event.id.indexOf(this.props.event.data.id)
                console.log(isEventInWishList)
                isEventInWishList === -1 ?
                    this.setState({ eventIsInWishList: false }) :
                    this.setState({ eventIsInWishList: true });
            });
        } else {
            this.setState({ isNotAuth: true });
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

        console.log(this.state.eventIsInWishList)

        if (!this.state.eventIsInWishList) {
            this.props.attendConference(
                this.props.event.data.id,
                this.props.auth.token,
                successCallback,
                errorCallback
            );
        }

    }

    handleDelayedMessageReset = () => {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setState({ error: null, isUpdated: null, isNotAuth: null });
        }, 10000);
    }

    renderMessage(_error, _isUpdated, _isNotAuth, _eventIsInWishList) {
        if (_isUpdated) {
            return (
                <h4 className="text-danger text-center mt-3">
                    You added this conference to your Wanna Go List successfully!
                </h4>);
        }

        if (isNaN(_error)) {
            return (
                <h4 className="text-danger text-center mt-3">
                    {_error}
                </h4>);
        }

        if (_error !== null) {
            return (
                <h4 className="text-danger text-center mt-3">
                    Error with status {_error}. Try again!
                </h4>);
        }

        if(_isNotAuth) {
            return (
                <h4 className="text-danger text-center mt-3">
                    Login or Register so you can add conferences to your Wanna Go List!
                </h4>);
        }

        if (_eventIsInWishList) {
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
            return (<p>Loading!</p>);
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
                    <h4 className="mb-2">{data.name}</h4>
                    <span className="card__dates mb-2">{getFormattedDate(data.start, data.end)}
                        <span className="text-info"> | </span> {data.venue}, {data.city}, {data.country}
                    </span>

                    <div className="mb-3">
                        {this.renderTags()}
                    </div>

                    <div className="mb-4 text-bottom d-flex">
                        <HeartFullIcon />
                        <h5 className="ml-1 font-weight-normal d-inline">Going:
                            <span className="text-secondary">{data.atendees}</span>
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
                    >Wanna go
                    </a>
                    <a
                        className="btn btn-secondary"
                        href={data.website}
                    >Go to website
                    </a>
                </div>
                {this.renderMessage(
                    this.state.error,
                    this.state.isUpdated,
                    this.state.isNotAuth,
                    this.state.eventIsInWishList,
                )}
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
