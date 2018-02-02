import API from '../core/Api';
import User from './User';

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

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
            isFetching: true,
        };
    case RECEIVE: {
        const data = new User(action.user);
        return {
            ...state,
            isFetching: false,
            lastFetched: new Date().valueOf(),
            data,
        };
    }
    case FAIL:
        return {
            ...state,
            isFetching: false,
            error: action.error,
        };
    case UPDATE_SUCCESS: {
        const data = new User(action.user);
        return {
            ...state,
            data,
        };
    }
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

export function updateCurrentUser(_token, _name, _successCb, _errorCb) {
    return (dispatch) => {
        API.updateCurrentUser(_token, _name)
            .then((response) => {
                dispatch(successUpdateUser(response.data));
                _successCb(response.data);
            })
            .catch((error) => {
                if (error.response === undefined) {
                    _errorCb('Check your internet connection!');
                } else {
                    _errorCb(error.response.status);
                }
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
