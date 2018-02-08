import moment from 'moment';

export const orderEventsByMonth = (_wishList) => {
    const pastEvents = {};
    const upcomingEvents = {};

    if (_wishList.data.length === 0) {
        return {};
    }
    if (_wishList.isFetching && _wishList.isFetching === null) {
        return {};
    }

    _wishList.data.forEach((event) => {
        const month = moment(event.start).format('MMMM');
        const monthIsPast = moment().isAfter(event.start);

        if (monthIsPast) {
            pastEvents[month] = {
                month: moment(event.start).format('MMMM'),
                data: pastEvents[month] ?
                    [...pastEvents[month].data, event] : [event],
            };
        } else {
            upcomingEvents[month] = {
                month: moment(event.start).format('MMMM'),
                data: upcomingEvents[month] ?
                    [...upcomingEvents[month].data, event] : [event],
            };
        }
    });
    return { pastEvents, upcomingEvents };
}
