import API from '../../core/Api';
import Event from '../Event';

const initialState = {
    isFetching: null,
    numberOfEvents: 7,
    eventsFetched: null,
    lastFetched: null,
    data: null,
    error: null,
};

// Actions
const REQUEST = 'eventsList/REQUEST';
const RECEIVE = 'eventsList/RECEIVE';
const FAIL = 'eventsList/FAIL';

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
        console.log(eventsFetched)
        return {
            ...state,
            isFetching: false,
            eventsFetched,
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
export function requestEventsList() {
    return {
        type: REQUEST,
    };
}

export function receiveEventsList(conferences) {
    return {
        type: RECEIVE,
        data: conferences,
    };
}

export function failEventsList(error) {
    return {
        type: FAIL,
        error: error,
    };
}

export function fetchConferences(start, end, successCb) {
    return dispatch => {
        dispatch(requestEventsList());
        API.fetchConferencesByDesc(start,end)
            .then(response => {
                dispatch(receiveEventsList(response.data));
                successCb();
            })
            .catch(error => {
                dispatch(failEventsList(error.response));
            });
    };
}
