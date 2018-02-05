import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import * as _ from 'lodash';
import Event from '../Event';

import Card from '../../common/Card';
import { fetchWishList } from './duck';

class WishList extends Component {
    static propTypes = {
        wishList: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
        }).isRequired,
        authToken: PropTypes.string.isRequired,
        fetchWishList: PropTypes.func,
    };

    static defaultProps = {
        fetchWishList: () => {},
    };

    constructor(props) {
        super(props);
        this.upcomingEvents = {};
        this.pastEvents = {};
    }

    componentDidMount() {
        this.props.fetchWishList(this.props.authToken);
    }

    componentWillReceiveProps(nextProps) {
        nextProps.wishList.data.forEach((event) => {
            const month = moment(event.start).format('MM');
            const monthIsPast = moment().isAfter(event.start);

            if (monthIsPast) {
                this.pastEvents[month] = {
                    month: moment(event.start).format('MMMM'),
                    data: this.pastEvents[month] ?
                        [...this.pastEvents[month].data, event] : [event],
                };
            } else {
                this.upcomingEvents[month] = {
                    month: moment(event.start).format('MMMM'),
                    data: this.upcomingEvents[month] ?
                        [...this.upcomingEvents[month].data, event] : [event],
                };
            }
        });
    }

    renderPastEvents = () => {
        if (_.isEmpty(this.pastEvents)) {
            return null;
        }
        const cards = [];

        const heading = (
            <h4 className="mb-3">Last
                <span className="text-info"> 1 </span>
                from all Past conferences
            </h4>);
        cards.push(heading);

        _.forEach(this.pastEvents, (group, key) => {
            const firstEvent = _.first(group.data);
            cards.push(
                <div key={key} className="mb-5">
                    {
                        <Card key={firstEvent.id} event={firstEvent} past />
                    }
                </div>);
        });
        return cards;
    }

    renderUpcomingEvents = () => {
        if (_.isEmpty(this.upcomingEvents)) {
            return null;
        }

        const cards = [];

        let monthEventsNumber;
        _.forEach(this.pastEvents, (group, key) => {
            _.forEach(group, (e) => {
                monthEventsNumber= +_.size(e);
            });
        });

        const heading = (
            <h4 className="mb-2">Upcoming conferences
                <span className="text-info"> ({monthEventsNumber}) </span>
            </h4>);

        cards.push(heading);

        _.forEach(this.upcomingEvents, (group, key) => {
            cards.push(
                <div key={key} className="mb-5">
                    <h2 className="cards-date font-weight-normal">
                        { group.month }
                    </h2>
                    {
                        group.data.map(event =>
                            <Card key={event.id} event={event} />)
                    }
                </div>);
        });

        return cards;
    }


    render() {
        if (this.props.authToken && this.props.authToken === null) {
            return <h4 className="text-danger text-center">Loading!</h4>;
        }
        if (this.props.wishList.isFetching && this.props.wishList.isFetching === null) {
            return <h4 className="text-danger text-center">Loading!</h4>;
        }

        if (this.props.wishList.error !== null) {
            return <h4 className="text-danger text-center">Error fetching your wanna go list!</h4>;
        }
        return (
            <div className="container mx-auto pt-5 pb-5">
                <h2 className="text-center mb-5">Wanna Go List</h2>

                {this.renderPastEvents()}
                <div className="upcoming-conf__container">
                    {this.renderUpcomingEvents()}
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ wishList, auth }) => {
    return {
        wishList,
        authToken: auth.token,
    };
};

const mapDispatchToProps = {
    fetchWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
