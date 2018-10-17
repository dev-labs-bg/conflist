import moment from 'moment';
import API from '../../core/Api';
import Event from '../Event';

const initialState = {
    isFetching: null,
    numberOfEvents: null,
    eventsFetched: null,
    lastFetched: null,
    data: null,
    error: null,
};

// Actions
const REQUEST = 'eventsList/REQUEST';
const RECEIVE = 'eventsList/RECEIVE';
const FAIL = 'eventsList/FAIL';
const RESET = 'eventsList/RESET';

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
            isFetching: true,
        };
    case RECEIVE: {
        const events = action.data.map(ev => new Event(ev));
        const eventsFetched = state.eventsFetched + action.data.length;
        return {
            ...state,
            isFetching: false,
            eventsFetched,
            numberOfEvents: action.numberOfEvents,
            lastFetched: new Date().valueOf(),
            data: state.data !== null && state.data.length !== 0 ?
                [...state.data, ...events] : events,
            error: null,
        };
    }
    case FAIL:
        return {
            ...state,
            isFetching: false,
            error: action.error,
        };
    case RESET:
        return initialState;
    default: return state;
    }
}

// Action Creators
export function requestEventsList() {
    return {
        type: REQUEST,
    };
}

export function receiveEventsList(data, numberOfEvents) {
    return {
        type: RECEIVE,
        data,
        numberOfEvents,
    };
}

export function failEventsList(error) {
    return {
        type: FAIL,
        error,
    };
}

export function resetEventsList() {
    return {
        type: RESET,
    };
}

export function fetchConferences(start, end, successCb) {
    const startDateSearch = moment().format('YYYY-MM');
    const endDateSearch = moment().add(3, 'months').format('YYYY-MM-DD');

    return (dispatch) => {
        dispatch(requestEventsList());
        API.fetchConferencesinThreeMonthPeriod(start, end, startDateSearch, endDateSearch)
            .then((response) => {
                const numberOfEvents = parseInt(response.headers['x-total-count'], 0);
                dispatch(receiveEventsList(response.data, numberOfEvents));
                successCb(response.data);
            })
            .catch((error) => {
                dispatch(failEventsList(error.response));
            });
    };
}

export function resetConferences() {
    return (dispatch) => {
        dispatch(resetEventsList());
    };
}
