import moment from 'moment';

/**
 * Formats the date from UTC format into string
 *
 * @param {
 *  start {number},
 *  end {number}
 * }
 * @return {string}
 */
export const getFormattedDate = ({ start, end }) => {
    const endDate = moment(end).format('Do MMM, YYYY');
    let startDate;
    /**
     * Compares start and end date months
     */
    if (moment(start).isSame(end, 'month')) {
        startDate = moment(start).format('Do');
    } else {
        startDate = moment(start).format('Do MMM');
    }

    return `${startDate}-${endDate}`;
};
