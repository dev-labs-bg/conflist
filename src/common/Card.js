import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AnimateOnChange from 'react-animate-on-change';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import '../Events/WishList/Attend.css';
import Event from '../Events/Event';
import Attend from '../Events/WishList/Attend';
import { getFormattedDate } from '../core/Dates';
import calendar from '../assets/images/callendar.svg';
import placeHolder from '../assets/images/placeholder.svg';
import placeHolderPassed from '../assets/images/placeholder-passed.svg';
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
            attendeesCount: this.props.event.attendees.length,
        };
    }

    componentWillUpdate(nextProps, nextState) {
        // Detect only when isActive state is changed
        const isActiveChanged = nextState.isActive === this.state.isActive;
        if (isActiveChanged) {
            return;
        }

        if (nextState.isActive) {
            this.changeAttendeesHandler(this.state.attendeesCount + 1);
        } else {
            this.changeAttendeesHandler(this.state.attendeesCount - 1);
        }
    }

    /**
     * Updating the state during the componentWillUpdate step can lead
     * to indeterminate component state and is not allowed, so it is handled
     * by this function.
     * @param  {number} changedValue
     */
    changeAttendeesHandler = (changedValue) => {
        if (this.props.authToken) {
            this.setState({ attendeesCount: changedValue });
        }
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
        });
    }

    closeModal = () => {
        this.setState({
            isActive: !this.state.isActive,
            isOpen: !this.state.isOpen,
        });
    }

    renderTags(_tags) {
        const renderTags = [];
        const style = {
            cursor: 'pointer',
        };

        _tags.map((tag) => {
            renderTags.push(<span
                key={tag}
                className="badge badge-pill badge-light mr-2 mb-2"
                style={style}
                onClick={
                    this.tagClicked
                }
            >{tag}
            </span>);
        });
    }

    renderModal = () => {
        /**
         * Show Modal component with a message, when unregistered user
         * tries to wishlist an event
         */
        if (this.state.isOpen) {
            if (this.state.isActive && this.props.authToken === null) {
                return (
                    <Modal isOpen={this.state.isOpen} toggle={this.handleAttendClick}>
                        <ModalHeader toggle={this.handleAttendClick}>Warning</ModalHeader>
                        <ModalBody>
                        Login or Register so you can add to your WishList!
                        </ModalBody>
                        <ModalFooter className="text-center">
                            <Link
                                to="/login"
                                className="btn btn-primary align-self-start"
                            >
                                Login
                            </Link>{' '}
                            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                );
            }
        }
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


    render() {
        const { event } = this.props;

        return (
            <div className="card mb-4 flex-sm-row">
                {this.renderModal()}
                <Link to={`/event/${event.alias}`} className="card-img-holder">
                    <img
                        className="card-img"
                        src={event.pictureUrl}
                        alt={event.name}
                    />
                </Link>

                <div className="card-body">
                    <span className="d-flex justify-content-between">
                        <div className="card__info">
                            <div className="mb-2">
                                <img src={!event.attendable ? calendarPassed : calendar} className="mr-1" alt="small calendar" />
                                <span className="card__dates"> {getFormattedDate(event.start, event.end)}
                                </span>
                            </div>
                            <div className="mt-1">
                                <img className="mr-1" width="19" height="19" src={!event.attendable ? placeHolderPassed : placeHolder} alt="placeholder" />
                                <span className="card__dates"> {event.venue}, {event.city}, {event.country}</span>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center mr-2">
                            <AnimateOnChange
                                baseClassName="attend"
                                animationClassName="attend--bounce"
                                animate={this.state.isActive}
                            >
                                <Attend
                                    className="attend"
                                    id={event.id}
                                    token={this.props.authToken}
                                    past={!event.attendable}
                                    wishListed={this.props.wishListed}
                                    onClick={this.handleAttendClick}
                                    isActive={this.state.isActive}
                                />
                            </AnimateOnChange>
                            <span className="font-weight-normal">{this.state.attendeesCount}</span>
                        </div>
                    </span>

                    <Link className="text-dark" to={`/event/${event.alias}`}>
                        <h4 className="card-title font-weight-normal mt-3 mb-1">
                            {event.name}
                        </h4>
                    </Link>

                    <div
                        className="card-text"
                        dangerouslySetInnerHTML={this.eventDescription()}
                    />

                    <div className="d-md-flex justify-content-end flex-wrap">
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
