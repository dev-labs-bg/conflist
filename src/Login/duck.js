import API from '../core/Api';

const initialState = {
    isAuthenticated: false,
    error: null,
    token: null,
};

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
            isAuthenticated: true,
        };
    case FAIL:
        return {
            ...state,
            error: action.error,
            isAuthenticated: false,
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
                localStorage.setItem('token', response.data.token);
                dispatch(tokenReceive(response.data.token));
            })
            .catch( (e) => {
                dispatch(tokenFail(e));
            });
    };
}
