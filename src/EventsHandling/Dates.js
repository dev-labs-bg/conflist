import moment from 'moment';

const date = (dates) => {
    const start = dates.start = moment(dates.start).format('Do');
    const end = dates.end = moment(dates.end).format('Do MMM, YYYY');
    return [start, '-', end];
};

export default date;
