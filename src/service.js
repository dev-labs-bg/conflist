import moment from 'moment';

/**
 * Order Events based on their date
 * @param  {Array} _eventsList [array of Events]
 * @return {object} { pastEvents, upcomingEvents }
 */

export const orderEventsByMonth = (_eventsList) => {
    const pastEvents = {};
    const upcomingEvents = {};

    if (_eventsList.data.length === 0) {
        return {};
    }
    if (_eventsList.isFetching && _eventsList.isFetching === null) {
        return {};
    }

    _eventsList.data.forEach((event) => {
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
