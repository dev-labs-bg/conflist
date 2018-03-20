import moment from 'moment';
import * as _ from 'lodash';

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

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

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

    pastEvents = _.sortBy(
        pastEvents,
        group => months.indexOf(group.month),
    );

    upcomingEvents = _.sortBy(
        upcomingEvents,
        group => months.indexOf(group.month),
    );

    return { pastEvents, upcomingEvents };
};
