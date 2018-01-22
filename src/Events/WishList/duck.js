// Actions
const SET = 'wishList/SET';


// Reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
    case SET:
        const events = [];
        events.push(action.event);
        return {
            ...state,
            event: events,
        };
    default: return state;
    }
}

// Action Creaters
export function setWishListEvent(event) {
    return {
        type: SET,
        event,
    };
}
