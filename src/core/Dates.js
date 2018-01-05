import moment from 'moment';

/**
 * Formats the date from UTC format into string
 *
 * @param  {object} with start and end numbers
 * @return {string}
 */
const returnFormattedDate = (dates) => {
    let startDate;
    const endDate = moment(dates.end).format('Do MMM, YYYY');
    /**
     * Compares start and end date months
     */
    const startDateMonth = moment(dates.start).format('MM');
    const endDateMonth = moment(dates.end).format('MM');
    if (startDateMonth !== endDateMonth) {
        startDate = moment(dates.start).format('Do MMM');
    } else {
        startDate = moment(dates.start).format('Do');
    }

    return `${startDate}-${endDate}`;
};

export default returnFormattedDate;
