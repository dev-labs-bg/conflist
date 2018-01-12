import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../Event';
import { getFormattedDate } from '../../core/Dates';
import { searchConference } from './duck';

class InsidePage extends Component {
    static propTypes = {
        event: PropTypes.shape({
            data: PropTypes.instanceOf(Event),
            error: PropTypes.number,
            isFetching: PropTypes.bool,
            lastFetched: PropTypes.number,
        }),
        alias: PropTypes.string.isRequired,
        searchConference: PropTypes.func.isRequired,
    };
    static defaultProps = {
        event: {},
    };

    componentDidMount() {
        this.props.searchConference(this.props.alias);
    }
    /**
     * Render speaker images
     * @return {array}
     */
    renderSpeakers() {
        const renderImages = [];
        this.props.event.data.speakers.map((speaker) => {
            renderImages.push(
                <img
                    key={speaker.id}
                    src={speaker.pictureUrl}
                    width="40"
                    height="40"
                    alt={speaker.name}
                />);
        });
        return renderImages;
    }

    /**
     * Render tags
     * @return {array}
     */
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
     * Render description
     * @return {object}
     */
    renderDescription() {
        return { __html: this.props.event.data.description };
    }

    render() {
        const { error, isFetching, data } = this.props.event;     

        if (typeof isFetching === 'undefined') {
            // nothing.
            return 'Loading!';
        }

        if (isFetching) {
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
                        <svg className="mr-1" width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs />
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="conflist-home-page-logged-in" transform="translate(-986.000000, -677.000000)">
                                    <g id="conf-card" transform="translate(309.000000, 639.000000)">
                                        <g id="ic_favorite_black_24px-(1)" transform="translate(675.000000, 35.000000)">
                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                                            <path d="M12,21.35 L10.55,20.03 C5.4,15.36 2,12.28 2,8.5 C2,5.42 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.09 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.42 22,8.5 C22,12.28 18.6,15.36 13.45,20.04 L12,21.35 Z" id="Shape" fill="#F2706D" fillRule="nonzero" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <h5 className="font-weight-normal d-inline">Going: <span className="text-secondary">{data.atendees}</span></h5>
                    </div>
                    <div dangerouslySetInnerHTML={this.renderDescription()} />                 

                </div>

                <div className="mb-5">
                    <h5 className="font-weight-bold mb-2">Speakers:</h5>
                    {this.renderSpeakers()}
                </div>

                <div className="text-center">
                    <button className="btn btn-primary mr-5">Wanna go</button>
                    <button className="btn btn-secondary">Go to website</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ event }, { location }) => {
    const pathnameArray = location.pathname.split('/');

    return {
        event: event[pathnameArray[pathnameArray.length - 1]],
        alias: pathnameArray[pathnameArray.length - 1],
    };
};

const mapDispatchToProps = {
    searchConference,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsidePage);
