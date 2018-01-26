import API from '../../core/Api';

// Actions
const attendRequest = 'attendEvent/REQUEST';
const attendSet = 'attendEvent/SET';
const attendFail = 'attendEvent/FAIL';
const cancelAttendRequest = 'cancelAttend/REQUEST';
const cancelAttendSuccess = 'cancelAttend/SUCCESS';
const cancelAttendFail = 'cancelAttend/FAIL';

const initialState = {
    lastFetched: null,
    isFetching: null,
    data: [],
    error: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case attendRequest:
        return {
            ...state,
            isFetching: true,
        };
    case attendSet:
        return {
            ...state,
            isFetching: false,
            lastFetched: new Date().valueOf(),
            data: [
                ...state.data,
                action.event,
            ],
        };
    case attendFail:
        return {
            ...state,
            isFetching: false,
            error: action.error,
        };
    case cancelAttendRequest:
        return {
            ...state,

        };
    case cancelAttendSuccess:
        return {
            ...state,
        };
    case cancelAttendFail:
        return {
            ...state,
        };
    default: return state;
    }
}

// Action Creators
export function attendEventRequest() {
    return {
        type: attendRequest,
    };
}

export function attendEventSet(event) {
    return {
        type: attendSet,
        event,
    };
}

export function attendEventFail(error) {
    return {
        type: attendFail,
        error,
    };
}

export function cancelAttendEventRequest() {
    return {
        type: cancelAttendRequest,
    };
}

export function cancelAttendEventSuccess() {
    return {
        type: cancelAttendSuccess,
    };
}

export function cancelAttendEventFail(error) {
    return {
        type: cancelAttendFail,
        error,
    };
}

export function attendConference(_eventId, _token) {
    return (dispatch) => {
        dispatch(attendEventRequest());
        API.attendConference(_eventId, _token)
            .then((response) => {
                dispatch(attendEventSet(response.data));
            })
            .catch((error) => {
                dispatch(attendEventFail(error.response.data.message));
            });
    };
}

export function cancelAttendConference(_eventId, _token) {
    return (dispatch) => {
        dispatch(cancelAttendEventRequest());
        API.cancelAttendConference(_eventId, _token)
            .then((response) => {
                dispatch(cancelAttendEventSuccess(response.data));
            })
            .catch((error) => {
                dispatch(cancelAttendEventFail(error.response.data.message));
            });
    };
}
