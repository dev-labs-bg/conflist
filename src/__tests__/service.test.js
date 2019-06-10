import { orderEventsByMonth, orderEventsByMonthChronologicaly } from '../service';

xdescribe('Services', () => {
    const events = {
        isFetching: false,
        data: [
            { data: {}, start: 'Wed Jun 05 2019' },
            { data: {}, start: 'Wed May 05 2019' },
            { data: {}, start: 'Wed Jun 01 2019' },
            { data: {}, start: 'Wed May 02 2019' },
            { data: {}, start: 'Wed May 08 2019' },
        ],
    };

    const result = {
        pastEvents: [
            {
                data: [
                    { data: {}, start: 'Wed May 05 2019' },
                    { data: {}, start: 'Wed May 02 2019' },
                    { data: {}, start: 'Wed May 08 2019' },
                ],
                month: 'May',
            },
            {
                data: [
                    { data: {}, start: 'Wed Jun 05 2019' },
                    { data: {}, start: 'Wed Jun 01 2019' },
                ],
                month: 'June',
            },
        ],
        upcomingEvents: [],
    };
    const orderedResult = {
        pastEvents: [
            {
                data: [
                    { data: {}, start: 'Wed May 05 2019' },
                    { data: {}, start: 'Wed May 02 2019' },
                    { data: {}, start: 'Wed May 08 2019' },
                ],
                month: 'May',
            },
            {
                data: [
                    { data: {}, start: 'Wed Jun 05 2019' },
                    { data: {}, start: 'Wed Jun 01 2019' },
                ],
                month: 'June',
            },
        ],
        upcomingEvents: [],
    };
    it('Order Events By Month', () => {
        expect(orderEventsByMonth(events)).toEqual(result);
    });

    it('Order Events By Month Chronologicaly', () => {
        expect(orderEventsByMonthChronologicaly(result.pastEvents)).toEqual(orderedResult.pastEvents)
        expect(orderEventsByMonthChronologicaly(result.upcomingEvents)).toEqual([]);
    })
});
