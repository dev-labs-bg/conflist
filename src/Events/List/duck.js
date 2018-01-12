import API from '../../core/Api';
import Event from '../Event';

const initialState = {
    isFetching: null,
    lastFetched: null,
    data: null,
    error: null,
};

// Actions
const REQUEST = 'events/REQUEST';
const RECEIVE = 'events/RECEIVE';
const FAIL = 'events/FAIL';

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
export function fetchConferencesRequest() {
    return {
        type: REQUEST,
    };
}

export function fetchConferencesReceived(conferences) {
    return {
        type: RECEIVE,
        data: conferences,
    };
}

export function fetchConferencesFailed(error) {
    return {
        type: FAIL,
        error: error,
    };
}

export function fetchConferences(state, action) {
    return dispatch => {
        dispatch(fetchConferencesRequest());
        API.fetchConferences()
            .then(response => {
                dispatch(fetchConferencesReceived(response.data));
            })
            .catch(error => {
                dispatch(fetchConferencesFailed(error.response.status));
            });
    };
}
