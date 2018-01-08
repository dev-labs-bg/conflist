import API from './Api';

const initialState = {
    isFetching: null,
    lastFetched: null,
    conferences: null,
    error: null,
};

// Actions
const REQUEST = 'api/REQUEST';
const RECEIVE = 'api/RECEIVE';
const FAIL = 'api/FAIL';

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
            isFetching: true,
            lastFetched: null,
            conferences: null,
            error: null,
        };
    case RECEIVE:
        return {
            ...state,
            isFetching: false,
            lastFetched: new Date().valueOf(),
            conferences: action.conferences,
            error: false,
        };
    case FAIL:
        return {
            ...state,
            isFetching: false,
            lastFetched: null,
            conferences: null,
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
};

export function fetchConferencesReceived(conferences) {
    return {
        type: RECEIVE,
        conferences: conferences,
    };
};

export function fetchConferencesFailed(error) {
    return {
        type: FAIL,
        error: error,
    };
};

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
