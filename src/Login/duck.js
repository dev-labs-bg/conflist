import API from '../core/Api';

const initialState = {};

// Actions
const REQUEST = 'jwtToken/REQUEST';
const RECEIVE = 'jwtToken/RECEIVE';
const FAIL = 'jwtToken/FAIL';

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
        };
    case RECEIVE:
        return {
            ...state,
            token: action.token,
        };
    case FAIL:
        return {
            ...state,
            error: action.error,
        };
    default: return state;
    }
}

// Action Creaters
export function tokenRequest() {
    return {
        type: REQUEST,
    };
}

export function tokenReceive(token) {
    return {
        type: RECEIVE,
        token,
    };
}

export function tokenFail(error) {
    return {
        type: FAIL,
        error,
    };
}

export function jwtTokenRequest() {
    return dispatch => {
        dispatch(tokenRequest());
        API.requestToken()
            .then(response => {
                console.log(response);
                dispatch(tokenReceive(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(tokenFail(error.response));
            });
    };
}
