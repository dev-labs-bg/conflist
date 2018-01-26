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
                action.id,
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
            isFetching: true,
        };
    case cancelAttendSuccess:
        const data = state.data.filter(id => id !== action.id);
        return {
            ...state,
            isFetching: false,
            data: data,
        };
    case cancelAttendFail:
        return {
            ...state,
            isFetching: false,
            error: action.error,
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

export function attendEventSet(id) {
    return {
        type: attendSet,
        id,
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

export function cancelAttendEventSuccess(id) {
    return {
        type: cancelAttendSuccess,
        id,
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
                dispatch(attendEventSet(response.data[0]._id));
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
                dispatch(cancelAttendEventSuccess(response.data[0]._id));
            })
            .catch((error) => {
                dispatch(cancelAttendEventFail(error.response.data.message));
            });
    };
}
