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
        const events = action.data.data.map(ev => new Event(ev));
        const eventsFetched = state.eventsFetched + action.data.data.length;
        return {
            ...state,
            isFetching: false,
            eventsFetched,
            numberOfEvents: parseInt(action.data.headers['x-total-count'], 0),
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
        return {
            ...initialState,
        };
    default: return state;
    }
}

// Action Creators
export function requestEventsList() {
    return {
        type: REQUEST,
    };
}

export function receiveEventsList(data) {
    return {
        type: RECEIVE,
        data,
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
    }
}

export function fetchConferences(start, end, successCb) {
    return (dispatch) => {
        dispatch(requestEventsList());
        API.fetchConferencesByDesc(start, end)
            .then((response) => {
                dispatch(receiveEventsList(response));
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
