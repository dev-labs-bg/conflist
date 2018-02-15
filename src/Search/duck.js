import API from '../core/Api';

// Actions
const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
const MAYBE_UPDATE_SUGGESTIONS = 'MAYBE_UPDATE_SUGGESTIONS';
const LOAD_SUGGESTIONS_BEGIN = 'LOAD_SUGGESTIONS_BEGIN';
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
            suggestions: [],
        };

    case LOAD_SUGGESTIONS_BEGIN:
        return {
            ...state,
            isLoading: true,
        };

    case MAYBE_UPDATE_SUGGESTIONS: {
        // Ignore suggestions if input value changed
        if (action.value !== state.value) {
            return {
                ...state,
                isLoading: false,
            };
        }
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

export function loadSuggestionsBegin() {
    return {
        type: LOAD_SUGGESTIONS_BEGIN,
    };
}

export function searchFail(e) {
    return {
        type: FAIL,
        e,
    };
}

export function maybeUpdateSuggestions(suggestions, value) {
    return {
        type: MAYBE_UPDATE_SUGGESTIONS,
        suggestions,
        value,
    };
}

export function searchTags(searchString) {
    return (dispatch) => {
        API.searchTags(searchString)
            .then((response) => {
                dispatch(loadSuggestionsBegin());
                dispatch(maybeUpdateSuggestions(response.data, searchString));
            })
            .catch((e) => {
                dispatch(searchFail(e.response.status));
            });
    };
}
