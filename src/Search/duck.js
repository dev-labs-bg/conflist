import API from '../core/Api';

// Actions
const UPDATE_INPUT_VALUE = 'search/UPDATE_INPUT_VALUE';
const CLEAR_SUGGESTIONS = 'search/CLEAR_SUGGESTIONS';
const RECEIVE_SUGGESTIONS = 'search/RECEIVE_SUGGESTIONS';
const REQUEST_SUGGESTIONS = 'search/REQUEST_SUGGESTIONS';
const FAIL = 'search/FAIL';

const initialState = {
    value: '',
    suggestions: [],
    isLoading: false,
    error: null,
};

// reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case UPDATE_INPUT_VALUE:
        return {
            ...state,
            value: action.value,
        };

    case CLEAR_SUGGESTIONS:
        return {
            ...state,
            value: '',
            suggestions: [],
        };

    case REQUEST_SUGGESTIONS:
        return {
            ...state,
            isLoading: true,
            error: null,
        };

    case RECEIVE_SUGGESTIONS: {
        return {
            ...state,
            suggestions: action.suggestions,
            isLoading: false,
        };
    }
    case FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.e,
        };
    default: return state;
    }
}

// Action creaters
export function updateInputValue(value) {
    return {
        type: UPDATE_INPUT_VALUE,
        value,
    };
}

export function clearSuggestions() {
    return {
        type: CLEAR_SUGGESTIONS,
    };
}

export function requestSuggestions() {
    return {
        type: REQUEST_SUGGESTIONS,
    };
}

export function searchFail(e) {
    return {
        type: FAIL,
        e,
    };
}

export function receiveSuggestions(suggestions, value) {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions,
        value,
    };
}

export function searchTags(searchString) {
    return (dispatch) => {
        dispatch(requestSuggestions());
        API.searchTags(searchString)
            .then((response) => {
                dispatch(receiveSuggestions(response.data, searchString));
            })
            .catch((e) => {
                dispatch(searchFail(e.response.status));
            });
    };
}
