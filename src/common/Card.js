import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFormattedDate } from '../core/Dates';

import calendar from '../assets/images/callendar.svg';

const Card = ({ event }) => {
    return (
        <div className="card mb-2">
            <Link to={`/event/${event.id}`}>
                <img
                    className="card-img"
                    src={event.pictureUrl}
                    width="243"
                    height="202"
                    alt={event.name}
                />
            </Link>

            <div className="card-body">
                <span className="d-flex justify-content-between">
                    <div className="card__info">
                        <img src={calendar} className="mr-1" alt="small calendar" />
                        <span className="card__dates"> {getFormattedDate(event.start, event.end)}    
                            <span className="text-info"> | </span> {event.venue}, {event.city}, {event.country}
                        </span>
                    </div>
                    <div className="card__button">
                        <svg className="card__heart mr-1" width="20" height="19" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <title>Heart shape svg</title>
                            <desc>Heart shape with red border</desc>
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="conflist-home-page-logged-in" transform="translate(-986.000000, -889.000000)">
                                    <g id="conf-card" transform="translate(309.000000, 866.000000)">
                                        <g id="ic_favorite_border_black_24px-copy" transform="translate(675.000000, 20.000000)">
                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                                            <path d="M16.5,3 C14.76,3 13.09,3.81 12,5.09 C10.91,3.81 9.24,3 7.5,3 C4.42,3 2,5.42 2,8.5 C2,12.28 5.4,15.36 10.55,20.04 L12,21.35 L13.45,20.03 C18.6,15.36 22,12.28 22,8.5 C22,5.42 19.58,3 16.5,3 Z M12.1,18.55 L12,18.65 L11.9,18.55 C7.14,14.24 4,11.39 4,8.5 C4,6.5 5.5,5 7.5,5 C9.04,5 10.54,5.99 11.07,7.36 L12.94,7.36 C13.46,5.99 14.96,5 16.5,5 C18.5,5 20,6.5 20,8.5 C20,11.39 16.86,14.24 12.1,18.55 Z" id="Shape" fill="#F2706D" fillRule="nonzero" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span className="font-weight-normal align-top">{event.atendees}</span>
                    </div>
                </span>

                <Link className="text-dark" to={`/event/${event.id}`}>
                    <h4 className="card-title font-weight-normal mt-3">
                        {event.name}
                    </h4>
                </Link>

                <p className="card-text">
                    {event.shortDescription}
                </p>

                <div className="d-flex justify-content-end">
                    <span className="badge badge-pill badge-light mr-2">{event.tags[0]}</span>
                    <span className="badge badge-pill badge-light mr-2">{event.tags[1]}</span>
                    <span className="badge badge-pill badge-light">{event.tags[2]}</span>
                </div>

            </div>
        </div>
    );
};

Card.propTypes = {
    event: PropTypes.shape({
        imageCard: PropTypes.string,
        dates: PropTypes.shape({
            start: PropTypes.number,
            end: PropTypes.number,
        }),
        description: PropTypes.string,
        location: PropTypes.string,
        title: PropTypes.string,
        wishListed: PropTypes.number,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default Card;
