import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../Events/Event';
import Attend from '../Events/WishList/Attend';
import { getFormattedDate } from '../core/Dates';
import calendar from '../assets/images/callendar.svg';
import calendarPassed from '../assets/images/calendar-passed.svg';

class Card extends Component {
    static propTypes = {
        event: PropTypes.instanceOf(Event).isRequired,
        authToken: PropTypes.string,
        past: PropTypes.bool,
        wishListed: PropTypes.bool,
    };

    static defaultProps = {
        past: false,
        authToken: '',
        wishListed: false,
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

    renderTags(_tags) {
        const renderTags = [];
        _tags.map((tag) => {
            renderTags.push(<span
                key={tag}
                className="badge badge-pill badge-light mr-2"
            >{tag}
            </span>);
        });
        return renderTags;
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
                            <img src={this.props.past ? calendarPassed : calendar} className="mr-1" alt="small calendar" />
                            <span className="card__dates"> {getFormattedDate(event.start, event.end)}
                                <span className="text-info"> | </span> {event.venue}, {event.city}, {event.country}
                            </span>
                        </div>
                        <div className="card__button">
                            <Attend
                                id={event.id}
                                token={this.props.authToken}
                                past={this.props.past ? true : false}
                                wishListed={this.props.wishListed}
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
                        {this.renderTags(event.tags)}
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    authToken: auth.token,
});

export default connect(mapStateToProps)(Card);
