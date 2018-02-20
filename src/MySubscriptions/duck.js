import API from '../core/Api';
import Event from '../Events/Event';

// Actions
const SUBSCRIBE_SUCCEESS = 'subscribeTag/SUCCESS';
const SUBSCRIBE_FAIL = 'subscribeTag/FAIL';

const UNSUBSCRIBE_SUCCEESS = 'unSubscribeTag/SUCCESS';
const UNSUBSCRIBE_FAIL = 'unSubscribeTag/FAIL';


const initialState = {
    data: [],
    error: null,
    isFetching: null,
    lastFetched: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case SUBSCRIBE_SUCCEESS: {
        return {
            ...state,
            data: action.event,
        };
    }
    case SUBSCRIBE_FAIL:
        return {
            ...state,
            error: action.error,
        };
    case UNSUBSCRIBE_SUCCEESS: {
        const data = state.data.filter(ev => ev.id !== action.event._id);
        return {
            ...state,
            data: data,
        };
    }
    case UNSUBSCRIBE_FAIL:
        return {
            ...state,
            error: action.error,
        };
    default: return state;
    }
}

// Action Creators
export function subscribeTagSuccess(event) {
    return {
        type: SUBSCRIBE_SUCCEESS,
        event,
    };
}

export function subscribeTagFail(error) {
    return {
        type: SUBSCRIBE_FAIL,
        error,
    };
}

export function unsubscribeTagSuccess(event) {
    return {
        type: UNSUBSCRIBE_SUCCEESS,
        event,
    };
}

export function unsubscribeTagFail(error) {
    return {
        type: UNSUBSCRIBE_FAIL,
        error,
    };
}

export function subscribeTag(_token, _tag, _successCb, _errorCb) {
    return (dispatch) => {
        API.subscribeByTag(_token, _tag)
            .then((response) => {
                dispatch(subscribeTagSuccess(response.data));
                _successCb(response.data)
            })
            .catch((error) => {
                dispatch(subscribeTagFail(error.response.status));
                _errorCb(error.response.status);
            });
    };
}
