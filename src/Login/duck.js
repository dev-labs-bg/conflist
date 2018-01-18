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
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                localStorage.setItem('token', data.token);
                dispatch(tokenReceive(data.token));
            })
            .catch( (e) => {
                console.log(e);
                dispatch(tokenFail(e));
            });
    };
}
