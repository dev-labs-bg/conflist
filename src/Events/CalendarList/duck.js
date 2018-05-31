import API from '../../core/Api';
import Event from '../Event';

const initialState = {
    isFetching: null,
    lastFetched: null,
    data: [],
    error: null,
};

// Actions
const REQUEST = 'calendarList/REQUEST';
const RECEIVE = 'calendarList/RECEIVE';
const FAIL = 'calendarList/FAIL';

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
        return {
            ...state,
            isFetching: false,
            lastFetched: new Date().valueOf(),
            data: events,
            error: null,
        };
    }
    case FAIL:
        return {
            ...state,
            isFetching: false,
            error: action.error,
        };
    default: return state;
    }
}

// Action Creators
export function requestCalendarList() {
    return {
        type: REQUEST,
    };
}

export function receiveCalendarList(conferences) {
    return {
        type: RECEIVE,
        data: conferences,
    };
}

export function failCalendarList(error) {
    return {
        type: FAIL,
        error,
    };
}

export function fetchConferencesByDate(date) {
    return (dispatch) => {
        dispatch(requestCalendarList(date));
        API.fetchConferencesByDate(date)
            .then((response) => {
                console.log(response)
                dispatch(receiveCalendarList(response.data));
            })
            .catch((error) => {
                dispatch(failCalendarList(error.response.status));
            });
    };
}
