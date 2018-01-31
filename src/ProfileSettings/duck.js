import API from '../core/Api';

const initialState = {
    lastFetched: null,
    isFetching: null,
    data: null,
    error: null,
};

// Actions
const REQUEST = 'user/REQUEST';
const RECEIVE = 'user/RECEIVE';
const FAIL = 'user/FAIL';

const UPDATE_SUCCESS = 'userUpdate/SUCCESS';
const UPDATE_FAIL = 'userUpdate/FAIL';

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
            isFetching: true,
        };
    case RECEIVE:
        return {
            ...state,
            isFetching: false,
            lastFetched: new Date().valueOf(),
            data: action.user,
        };
    case FAIL:
        return {
            ...state,
            isFetching: false,
            error: action.error,
        };
    case UPDATE_SUCCESS:
        return {
            ...state,
            data: action.user,
        };
    case UPDATE_FAIL:
        return {
            ...state,
            error: action.error,
        };
    default: return state;
    }
}

// Action Creators
export function requestCurrentUser() {
    return {
        type: REQUEST,
    };
}

export function receiveCurrentUser(user) {
    return {
        type: RECEIVE,
        user,
    };
}

export function failCurrentUser(error) {
    return {
        type: FAIL,
        error,
    };
}

export function successUpdateUser(user) {
    return {
        type: UPDATE_SUCCESS,
        user,
    };
}

export function failUpdateUser(error) {
    return {
        type: UPDATE_FAIL,
        error,
    };
}

export function updateCurrentUser(_token, _name) {
    return (dispatch) => {
        API.updateCurrentUser(_token, _name)
            .then((response) => {
                dispatch(successUpdateUser(response.data));
            })
            .catch((error) => {
                dispatch(failUpdateUser(error.response.status));
            });
    };
}

export function fetchCurrentUser(_token) {
    return (dispatch) => {
        dispatch(requestCurrentUser());
        API.fetchCurrentUser(_token)
            .then((response) => {
                dispatch(receiveCurrentUser(response.data));
            })
            .catch((error) => {
                dispatch(failCurrentUser(error.response.status));
            });
    };
}
