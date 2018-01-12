import API from '../core/Api';
import Event from '../EventsHandling/Event';

const initialState = {};

// Actions
const REQUEST = 'event/REQUEST';
const RECEIVE = 'event/RECEIVE';
const FAIL = 'event/FAIL';

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
            [action.alias]: {
                ...state[action.alias],
                isFetching: true,
                error: null,
            },
        };
    case RECEIVE: {
        return {
            ...state,
            [action.event.alias]: {
                ...state[action.event.alias],
                isFetching: false,
                lastFetched: new Date().valueOf(),
                data: new Event(action.event),
            },
        };
    }
    case FAIL:
        return {
            ...state,
            [action.alias]: {
                ...state[action.alias],
                isFetching: false,
                error: action.error,
            },
        };
    default: return state;
    }
}

// Action Creaters
export function fetchConferenceRequest(alias) {
    return {
        type: REQUEST,
        alias,
    };
}

export function fetchConferenceReceive(event) {
    return {
        type: RECEIVE,
        event,
    };
}

export function fetchConferenceFail(alias, error) {
    return {
        type: FAIL,
        error,
        alias,
    };
}

export function searchConference(alias) {
    return dispatch => {
        dispatch(fetchConferenceRequest(alias));
        API.searchConference()
            .then(response => {
                dispatch(fetchConferenceReceive(response.data));
            })
            .catch(error => {
                dispatch(fetchConferenceFail(alias, error.response.status));
            });
    };
}
