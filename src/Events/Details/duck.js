import API from '../../core/Api';
import Event from '../Event';

const initialState = {};

// Actions
const REQUEST = 'eventDetails/REQUEST';
const RECEIVE = 'eventDetails/RECEIVE';
const FAIL = 'eventDetails/FAIL';

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
export function RequestEventDetails(alias) {
    return {
        type: REQUEST,
        alias,
    };
}

export function ReceiveEventDetails(event) {
    return {
        type: RECEIVE,
        event,
    };
}

export function FailEventDetails(alias, error) {
    return {
        type: FAIL,
        error,
        alias,
    };
}

export function fetchConferenceDeatails(alias) {
    return dispatch => {
        dispatch(RequestEventDetails(alias));
        API.fetchConferenceDeatails()
            .then(response => {
                dispatch(ReceiveEventDetails(response.data));
            })
            .catch(error => {
                dispatch(FailEventDetails(alias, error.response.status));
            });
    };
}
