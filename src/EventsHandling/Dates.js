import moment from 'moment';

/**
*
*/
const date = (dates) => {
    const startDate = moment(dates.start).format('Do');
    const endDate = moment(dates.end).format('Do MMM, YYYY');

    return `${startDate}-${endDate}`;
};

export default date;
