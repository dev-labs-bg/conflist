import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AnimateOnChange from 'react-animate-on-change';

import '../Events/WishList/Attend.css';
import Modal from './Modal';
import Event from '../Events/Event';
import Attend from '../Events/WishList/Attend';
import { getFormattedDate } from '../core/Dates';
import calendar from '../assets/images/callendar.svg';
import placeHolder from '../assets/images/placeholder.svg';
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

    constructor(props) {
        super(props);
        this.state = {
            // Attend component
            isActive: this.props.wishListed,
            // Modal component
            isOpen: this.props.wishListed,
        };
    }
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


    // Handle button click and close Modal component
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    handleAttendClick = () => {
        this.setState({
            isActive: !this.state.isActive,
            isOpen: !this.state.isOpen,
        });
    }

    tagClicked = (event) => {
        this.props.history.push({
            pathname: `/search/${event.target.textContent}`,
            state: {
                wishListData: {},
            },
        })
    }

    renderTags(_tags) {
        const renderTags = [];
        const style = {
            cursor: 'pointer',
        };

        _tags.map((tag) => {
            renderTags.push(<span
                key={tag}
                className="badge badge-pill badge-light mr-2"
                style={style}
                onClick={
                    this.tagClicked
                }
            >{tag}
            </span>);
        });
        return renderTags;
    }

    renderModal = () => {
        /**
         * Show Modal component with a message, when unregistered user
         * tries to wishlist an event
         */
        if (this.state.isOpen) {
            if (this.state.isActive && this.props.authToken === null) {
                return (
                    <Modal
                        show={this.state.isOpen}
                        onClose={this.toggleModal}
                        text={
                            <h5 className="text-center">
                            Login or Register so you can add to your WishList!
                            </h5>
                        }
                    />);
            }
        }
    }
    render() {
        const { event } = this.props;
        return (
            <div className="card mb-2">
                {this.renderModal()}
                <Link to={`/event/${event.alias}`}>
                    <img
                        className="card-img"
                        src={event.pictureUrl}
                        alt={event.name}
                    />
                </Link>

                <div className="card-body">
                    <span className="d-flex justify-content-between">
                        <div className="card__info">
                            <img src={this.props.past ? calendarPassed : calendar} className="mr-1" alt="small calendar" />
                            <span className="card__dates"> {getFormattedDate(event.start, event.end)}
                            </span>
                            <div className="mt-1">
                                <img className="mr-1" width="19" height="19" src={placeHolder} alt="placeholder" />
                                <span className="card__dates"> {event.venue}, {event.city}, {event.country}</span>
                            </div>
                        </div>
                        <div className="card__button">
                            <AnimateOnChange
                                baseClassName="Attend"
                                animationClassName="Attend--bounce"
                                animate={this.state.isActive}
                            >
                                <Attend
                                    className="Attend"
                                    id={event.id}
                                    token={this.props.authToken}
                                    past={this.props.past ? true : false}
                                    wishListed={this.props.wishListed}
                                    onClick={this.handleAttendClick}
                                    isActive={this.state.isActive}
                                />
                            </AnimateOnChange>
                            <span className="font-weight-normal ml-1 align-top card__dates">{event.attendees.length}</span>
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

export default connect(mapStateToProps)(withRouter(Card));
