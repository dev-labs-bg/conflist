import API from '../core/Api';

// Actions
const REQUEST = 'user/REQUEST';
const RECEIVE = 'user/RECEIVE';
const FAIL = 'user/FAIL';

// Reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
        };
    case RECEIVE:
        return {
            ...state,
            data: action.user,
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

export function fetchCurrentUser(_token) {
    return (dispatch) => {
        dispatch(requestCurrentUser());
        API.fetchCurrentUser(_token)
            .then((response) => {
                dispatch(receiveCurrentUser(response.data));
            })
            .catch((error) => {
                dispatch(failCurrentUser(error.response));
            });
    };
}
