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
        this.eventsGroupedByMonth = {};
        this.pastConferences = {};
    }

    componentDidMount() {
        this.props.fetchWishList(this.props.authToken);
    }

    renderCards = () => {
        if (this.props.wishList.data !== null) {

            this.props.wishList.data.forEach((event) => {
                const monthYear = moment(event.start).format('MMMM|YYYY');
                const month = moment(event.start).format('MM');
                const monthpast = moment().isAfter(event.start);

                if (monthpast) {
                    this.pastConferences[month] = {
                        month: moment(event.start).format('MMMM'),
                        data: this.eventsGroupedByMonth[monthYear] ?
                            [...this.eventsGroupedByMonth[monthYear].data, event] : [event],
                    };
                } else {
                    this.eventsGroupedByMonth[month] = {
                        month: moment(event.start).format('MMMM'),
                        data: this.eventsGroupedByMonth[monthYear] ?
                            [...this.eventsGroupedByMonth[monthYear].data, event] : [event],
                    };
                }
            });
        }

        const cards = [];

         _.forEach(this.pastConferences, (group, key) => {
            cards.push(
                <div key={key} className="mb-5">
                    <h4 className="mb-3">Last
                        <span className="text-info"> 1 </span>
                    from all Past conferences
                    </h4>
                    {
                        group.data.map(event =>
                            <Card key={event.id} event={event} past />)
                    }
                </div>);
        });

        _.forEach(this.eventsGroupedByMonth, (group, key) => {
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
        return (
            <div className="container mx-auto pt-5 pb-5">
                <h2 className="text-center mb-5">Wanna Go List</h2>

                <div className="upcoming-conf__container">
                    {this.renderCards()}
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
