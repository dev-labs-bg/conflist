import moment from 'moment';
import * as _ from 'lodash';

/**
 * Reorder EventsList object chronologicaly by months
 * @param  {object} _events
 * @return {array}     [Array of Events]
 */
export const orderEventsByMonthChronologicaly = (_events) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const eventsList = _.sortBy(
        _events,
        group => months.indexOf(group.month),
    );

    return eventsList;
};

/**
 * Order Events based on their date
 * @param  {Array} _eventsList [array of Events]
 * @return {object} { pastEvents, upcomingEvents }
 */
export const orderEventsByMonth = (_eventsList) => {
    let pastEvents = {};
    let upcomingEvents = {};

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

    pastEvents = orderEventsByMonthChronologicaly(pastEvents);
    upcomingEvents = orderEventsByMonthChronologicaly(upcomingEvents);

    return { pastEvents, upcomingEvents };
};
