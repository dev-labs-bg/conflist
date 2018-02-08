import API from '../core/Api';

const initialState = {
    isAuthenticated: false,
    isLoading: null,
    error: null,
    token: null,
};

// Actions
const REQUEST = 'jwtToken/REQUEST';
const RECEIVE = 'jwtToken/RECEIVE';
const FAIL = 'jwtToken/FAIL';
const SET = 'jwtToken/SET';
const GET = 'jwtToken/GET';

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
            isLoading: true,
        };
    case RECEIVE:
        return {
            ...state,
            token: action.token,
            isLoading: false,
            isAuthenticated: true,
        };
    case FAIL:
        return {
            ...state,
            error: action.error,
            isLoading: false,
            isAuthenticated: false,
        };
    case SET:
        localStorage.setItem('token', action.token);
        return {
            ...state,
        };
    case GET: {
        const token = localStorage.getItem('token');
        return {
            ...state,
            isAuthenticated: !!token,
            isLoading: false,
            token,
        };
    }
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

export function setToken(token) {
    return {
        type: SET,
        token,
    };
}

export function getToken() {
    return {
        type: GET,
    };
}

export function jwtTokenRequest() {
    return dispatch => {
        dispatch(tokenRequest());
        API.requestToken()
            .then(response => {
                dispatch(tokenReceive(response.data.token));
                dispatch(setToken(response.data.token));
            })
            .catch((e) => {
                dispatch(tokenFail(e.response.status));
            });
    };
}
