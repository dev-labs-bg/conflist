import API from '../../core/Api';

// Actions
const ATTEND_REQUEST = 'attendEvent/REQUEST';
const ATTEND_SUCCEESS = 'attendEvent/SUCCESS';
const ATTEND_FAIL = 'attendEvent/FAIL';

const UNATTEND_REQUEST = 'unattend/REQUEST';
const UNATTEND_SUCCESS = 'unattend/SUCCESS';
const UNATTEND_FAIL = 'unattend/FAIL';

const initialState = {
    data: [],
    error: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case ATTEND_REQUEST:
        return {
            ...state,
        };
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
    case UNATTEND_REQUEST:
        return {
            ...state,
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
    default: return state;
    }
}

// Action Creators
export function attendEventRequest() {
    return {
        type: ATTEND_REQUEST,
    };
}

export function attendEventSet(id) {
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

export function unattendEventRequest() {
    return {
        type: UNATTEND_REQUEST,
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

export function attendConference(_eventId, _token) {
    return (dispatch) => {
        dispatch(attendEventRequest());
        API.attendConference(_eventId, _token)
            .then((response) => {
                dispatch(attendEventSet(response.data[0]._id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(attendEventFail(error.response.data));
            });
    };
}

export function unattendConference(_eventId, _token) {
    return (dispatch) => {
        dispatch(unattendEventRequest());
        API.unattendConference(_eventId, _token)
            .then((response) => {
                dispatch(unattendEventSuccess(response.data[0]._id));
            })
            .catch((error) => {
                dispatch(unattendEventFail(error.response.data));
            });
    };
}
