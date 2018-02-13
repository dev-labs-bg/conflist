import API from '../core/Api';

const initialState = {
    isLoading: null,
    error: null,
    data: [],
};

// Actions
const REQUEST = 'search/REQUEST';
const RECEIVE = 'search/RECEIVE';
const FAIL = 'search/FAIL';


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
            isLoading: false,
            data: action.data,
        };
    case FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        };
    default: return state;
    }
}


// Action Creaters
export function searchRequest() {
    return {
        type: REQUEST,
    };
}

export function searchReceive(data) {
    return {
        type: RECEIVE,
        data,
    };
}

export function searchFail(error) {
    return {
        type: FAIL,
        error,
    };
}

export function searchTags(searchString) {
    return (dispatch) => {
        dispatch(searchRequest());
        API.searchTags(searchString)
            .then((response) => {
                dispatch(searchReceive(response.data));
            })
            .catch((e) => {
                dispatch(searchFail(e.response.status));
            });
    };
}
