import API from '../core/Api';
import Event from '../Events/Event';
import { updateTags } from '../ProfileSettings/duck';

// Actions
const SUBSCRIBE_SUCCEESS = 'subscribeTag/SUCCESS';
const SUBSCRIBE_FAIL = 'subscribeTag/FAIL';

const UNSUBSCRIBE_SUCCEESS = 'unSubscribeTag/SUCCESS';
const UNSUBSCRIBE_FAIL = 'unSubscribeTag/FAIL';

const FETCH_TAGS_SUCCESS = 'fetchTags/SUCCESS';
const FETCH_TAGS_FAIL = 'fetchTags/FAIL';

const initialState = {
    tags: [],
    error: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case SUBSCRIBE_SUCCEESS: {
        return {
            ...state,
            tags: action.tags,
            error: null,
        };
    }
    case SUBSCRIBE_FAIL:
        return {
            ...state,
            error: action.error,
        };
    case UNSUBSCRIBE_SUCCEESS: {
        return {
            ...state,
            error: null,
        };
    }
    case UNSUBSCRIBE_FAIL:
        return {
            ...state,
            error: action.error,
        };
    case FETCH_TAGS_SUCCESS:
        return {
            ...state,
            tags: action.tags,
            error: null,
        };
    case FETCH_TAGS_FAIL:
        return {
            ...state,
            error: action.error,
        };
    default: return state;
    }
}

// Action Creators
export function subscribeTagSuccess(tags) {
    return {
        type: SUBSCRIBE_SUCCEESS,
        tags,
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

export function fetchTagsSuccess(tags) {
    return {
        type: FETCH_TAGS_SUCCESS,
        tags,
    };
}

export function fetchTagsFail(error) {
    return {
        type: FETCH_TAGS_FAIL,
        error,
    };
}

export function fetchTags() {
    return (dispatch) => {
        API.fetchTags()
            .then((response) => {
                dispatch(fetchTagsSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchTagsFail(error.response.status));
            });
    }
}

export function subscribeTag(_token, _tag, _successCb = () => {}, _errorCb = () => {}) {
    return (dispatch) => {
        API.subscribeByTag(_token, _tag)
            .then((response) => {
                dispatch(subscribeTagSuccess(response.data));
                dispatch(updateTags(response.data))
                _successCb(response.data);
            })
            .catch((error) => {
                dispatch(subscribeTagFail(error.response.status));
                _errorCb(error.response.status);
            });
    };
}

export function unsubscribeTag(_token, _tag) {
    return (dispatch) => {
        API.unsubscribeByTag(_token, _tag)
            .then((response) => {
                dispatch(unsubscribeTagSuccess(response.data));
                dispatch(updateTags(response.data));
            })
            .catch((error) => {
                dispatch(unsubscribeTagFail(error.response));
            });
    };
}
