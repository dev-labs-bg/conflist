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
    data: [],
    error: null,
    isFetching: null,
    lastFetched: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case ATTEND_SUCCEESS: {
        const event = new Event(action.event);
        return {
            ...state,
            data: [
                ...state.data,
                event,
            ],
        };
    }
    case ATTEND_FAIL:
        return {
            ...state,
            error: action.error,
        };
    case UNATTEND_SUCCESS: {
        const data = state.data.filter(ev => ev.id !== action.event._id);
        return {
            ...state,
            data: data,
        };
    }
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
            lastFetched: new Date().valueOf(),
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
export function attendEventSuccess(event) {
    return {
        type: ATTEND_SUCCEESS,
        event,
    };
}

export function attendEventFail(error) {
    return {
        type: ATTEND_FAIL,
        error,
    };
}

export function unattendEventSuccess(event) {
    return {
        type: UNATTEND_SUCCESS,
        event,
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

function fetchWishList(_token) {
    return (dispatch) => {
        dispatch(requestWishList());
        API.fetchWishList(_token)
            .then((response) => {
                dispatch(receiveWishList(response.data));
            })
            .catch((error) => {
                dispatch(failWishList(error.response.status));
            });
    };
}

export function fetchWishListIfNeeded(_token) {
    return (dispatch, getState) => {
        const state = getState().wishList;

        // Case 1
        const isDataEmptyOrIsTheWishlistNeverFetched =
            state.data.length === 0 && state.lastFetched === null;
        if (isDataEmptyOrIsTheWishlistNeverFetched) {
            dispatch(fetchWishList(_token));
            return;
        }

        // Case 2
        const outOfDateAfter = 15 * 60 * 1000; // 15 minutes
        const isLimitExceeded = (new Date().valueOf() - state.lastFetched) > outOfDateAfter;
        if (isLimitExceeded) {
            dispatch(fetchWishList(_token));
        }
    };
}

export function attendConference(_eventId, _token, _successCb, _errorCb) {
    return (dispatch) => {
        API.attendConference(_eventId, _token)
            .then((response) => {
                dispatch(attendEventSuccess(response.data[0]));
                _successCb(response.data[0]);
            })
            .catch((error) => {

                dispatch(attendEventFail(error.response));
                _errorCb(error.response);
            });
    };
}

export function unattendConference(_eventId, _token) {
    return (dispatch) => {
        API.unattendConference(_eventId, _token)
            .then((response) => {
                dispatch(unattendEventSuccess(response.data[0]));
            })
            .catch((error) => {
                dispatch(unattendEventFail(error.response));
            });
    };
}
