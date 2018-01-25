import API from '../../core/Api';

// Actions
const REQUEST = 'wishList/REQUEST';
const SET = 'wishList/SET';
const FAIL = 'wishList/FAIL';
const DELETE = 'wishList/DELETE';

const initialState = {
    lastFetched: null,
    isFetching: null,
    data: [],
    error: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQUEST:
        return {
            ...state,
            isFetching: true,
        };
    case SET:
        return {
            ...state,
            isFetching: false,
            lastFetched: new Date().valueOf(),
            data: [
                ...state.data,
                action.id,
            ],
        };
    case FAIL:
        return {
            ...state,
            isFetching: false,
            error: action.error,
        };
    default: return state;
    }
}

// Action Creaters
export function requestWishListEvent() {
    return {
        type: SET,
    };
}

export function setWishListEvent(id) {
    return {
        type: SET,
        id,
    };
}

export function setWishListEventFail(error) {
    return {
        type: FAIL,
        error,
    };
}


export function attendConference(_eventId, _token) {
    return (dispatch) => {
        dispatch(requestWishListEvent());
        API.attendConference(_eventId, _token)
            .then((response) => {
                console.log(response);
                dispatch(setWishListEvent(response.data));
            })
            .catch((error) => {
                dispatch(setWishListEventFail(error.response.data.message));
            });
    };
}
