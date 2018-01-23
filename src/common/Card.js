import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Attend from '../Events/WishList/Attend';
import { attendConference } from '../Events/WishList/duck';
import { getFormattedDate } from '../core/Dates';
import calendar from '../assets/images/callendar.svg';

class Card extends Component {
    static propTypes = {
        event: PropTypes.shape({
            id: PropTypes.string,
            imageCard: PropTypes.string,
            pictureUrl: PropTypes.string,
            venue: PropTypes.string,
            city: PropTypes.string,
            country: PropTypes.string,
            name: PropTypes.string,
            alias: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
            shortDescription: PropTypes.string,
            location: PropTypes.string,
            title: PropTypes.string,
            atendees: PropTypes.number,
            tags: PropTypes.arrayOf(PropTypes.string),
        }).isRequired,
    };

    /**
     * Using dangerouslySetInnerHTML
     *
     * {@link https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml}
     *
     * @return {object}
     */
    eventDescription() {
        return { __html: this.props.event.shortDescription };
    }

    render() {
        const { event } = this.props;
        return (
            <div className="card mb-2">
                <Link to={`/event/${event.alias}`}>
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
                            <Attend
                                id={event.id}
                                token={this.props.auth.token}
                            />
                            <span className="font-weight-normal align-top">{event.atendees}</span>
                        </div>
                    </span>

                    <Link className="text-dark" to={`/event/${event.alias}`}>
                        <h4 className="card-title font-weight-normal mt-3">
                            {event.name}
                        </h4>
                    </Link>

                    <div
                        className="card-text"
                        dangerouslySetInnerHTML={this.eventDescription()}
                    />

                    <div className="d-flex justify-content-end">
                        <span className="badge badge-pill badge-light mr-2">{event.tags[0]}</span>
                        <span className="badge badge-pill badge-light mr-2">{event.tags[1]}</span>
                        <span className="badge badge-pill badge-light">{event.tags[2]}</span>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth,
    };
};

const mapDispatchToProps = {
    attendConference,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
