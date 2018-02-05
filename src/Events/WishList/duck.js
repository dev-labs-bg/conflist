import API from '../../core/Api';
import Event from '../Event';

// Actions
const ATTEND_SUCCEESS = 'attendEvent/SUCCESS';
const ATTEND_FAIL = 'attendEvent/FAIL';

const UNATTEND_SUCCESS = 'unattend/SUCCESS';
const UNATTEND_FAIL = 'unattend/FAIL';

const WISHLIST_REQUEST = 'wishlist/REQUEST';
const WISHLIST_RECEIVE = 'wishlist/RECEIVE';
const WISHLIST_FAIL = 'wishlist/FAIL';

const initialState = {
    data: null,
    error: null,
    isFetching: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case ATTEND_SUCCEESS:
        return {
            ...state,
            data: [
                ...state.data,
                action.id,
            ],
        };
    case ATTEND_FAIL:
        return {
            ...state,
            error: action.error,
        };
    case UNATTEND_SUCCESS:
        const data = state.data.filter(id => id !== action.id);
        return {
            ...state,
            data: data,
        };
    case UNATTEND_FAIL:
        return {
            ...state,
            error: action.error,
        };
    case WISHLIST_REQUEST:
        return {
            ...state,
            isFetching: true,
        };
    case WISHLIST_RECEIVE: {
        const events = action.data.map(ev => new Event(ev));
        return {
            ...state,
            data: events,
            isFetching: false,
        };
    }
    case WISHLIST_FAIL:
        return {
            ...state,
            error: action.error,
            isFetching: false,
        };
    default: return state;
    }
}

// Action Creators
export function attendEventSuccess(id) {
    return {
        type: ATTEND_SUCCEESS,
        id,
    };
}

export function attendEventFail(error) {
    return {
        type: ATTEND_FAIL,
        error,
    };
}

export function unattendEventSuccess(id) {
    return {
        type: UNATTEND_SUCCESS,
        id,
    };
}

export function unattendEventFail(error) {
    return {
        type: UNATTEND_FAIL,
        error,
    };
}
export function requestWishList() {
    return {
        type: WISHLIST_REQUEST,
    };
}

export function receiveWishList(data) {
    return {
        type: WISHLIST_RECEIVE,
        data,
    };
}

export function failWishList(error) {
    return {
        type: WISHLIST_FAIL,
        error,
    };
}

export function fetchWishList(_token) {
    return (dispatch) => {
        API.fetchWishList(_token)
            .then((response) => {
                dispatch(receiveWishList(response.data));
            })
            .catch((error) => {
                dispatch(failWishList(error.response));
            });
    };
}

export function attendConference(_eventId, _token) {
    return (dispatch) => {
        API.attendConference(_eventId, _token)
            .then((response) => {
                dispatch(attendEventSuccess(response.data[0]._id));
            })
            .catch((error) => {
                dispatch(attendEventFail(error.response));
            });
    };
}

export function unattendConference(_eventId, _token) {
    return (dispatch) => {
        API.unattendConference(_eventId, _token)
            .then((response) => {
                dispatch(unattendEventSuccess(response.data[0]._id));
            })
            .catch((error) => {
                dispatch(unattendEventFail(error.response));
            });
    };
}
