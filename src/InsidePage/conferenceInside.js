import API from '../core/Api';
import Event from '../EventsHandling/Event';
import * as _ from 'lodash';

const initialState = {
    error: null,
    data: null,
};

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
            data: { isFetching: true },
        };
    case RECEIVE: {
        const events = {};
        const event = new Event(action.data);
        _.assign({ event, lastFetched: new Date().valueOf(), isFetching: false }, events);
        return {
            ...state,
            data: events,
            error: null,
        };
    }
    case FAIL:
        return {
            ...state,
            error: action.error,
            data: { isFetching: false },
        };
    default: return state;
    }
}

// Action Creaters
export function fetchConferenceRequest() {
    return {
        type: REQUEST,
    };
}

export function fetchConferenceReceive(event) {
    return {
        type: RECEIVE,
        data: event,
    };
}

export function fetchConferenceFail(error) {
    return {
        type: FAIL,
        error: error,
    };
}

export function searchConference() {
    return dispatch => {
        dispatch(fetchConferenceRequest());
        API.searchConference()
            .then(response => {
                dispatch(fetchConferenceReceive(response.data));
            })
            .catch(error => {
                dispatch(fetchConferenceFail(error.response.status));
            });
    };
}

