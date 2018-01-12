import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../EventsHandling/Event';
import { getFormattedDate } from '../core/Dates';
import { searchConference } from './conferenceInside';

class InsidePage extends Component {
    static propTypes = {
        event: PropTypes.shape({
            data: PropTypes.arrayOf({
                event: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
                isFetching: PropTypes.bool,
                lastFetched: PropTypes.number,
            }),
            error: PropTypes.number,
        }),
    };
    static defaultProps = {
        event: [],
    };

    componentDidMount() {
        const eventAlias = this.props.location.pathname.substring(7);
        this.props.searchConference(eventAlias);
    }
    /**
     * Render speaker images
     * @return {array}
     */
    renderSpeakers() {
        const renderImages = [];
        this.props.data.events.speakers.map((speaker) => {
            renderImages.push(<img
                key={speaker.id}
                src={speaker.pictureUrl}
                width="40"
                height="40"
                alt={speaker.name}
            />);
        });
        return renderImages;
    }

    render() {
        const { isFetching, data } = this.props.event;

        if (typeof isFetching === 'undefined') {
            // nothing.
            return null;
        }

        if (isFetching) {
            return (<p>'Loading!'</p>);
        }

        return (<p>{ data.alias }</p>);

        // const error = this.props.event.error;
        // const events = this.props.event.data;

        // // events.map( ev => {
        // //     loading = ev.isFetching;
        // // });
        // // console.log(loading);
        // if (error !== null) {
        //     return (
        //         <div>
        //             Error with status { error }
        //         </div>
        //     );
        // }
        //
        // return (
        //     <div className="container__register mx-auto pt-5 pb-5 d-flex flex-column">
        //     </div>
        // );
    }
}

const mapStateToProps = ({ event }, { location }) => {
    const pathnameArray = location.pathname.split('/');

    return {
        event: event[pathnameArray[pathnameArray.length - 1]],
    };
};

const mapDispatchToProps = {
    searchConference,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsidePage);
