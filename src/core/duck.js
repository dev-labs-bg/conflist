import axios from 'axios';

// Actions
const FETCH_CONFERENCES = 'conflist/src/core/duck/FETCH_CONFERENCES';

// Action Creators
export function fetchConferences(state, action) {
    return dispatch => {
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/conferences')
            .then(response => {
                console.log(response);
            })
            .catch(response => {
                console.log('error');
            });
    };
}

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
    case FETCH_CONFERENCES:
        return fetchConferences(state, action);
    default: return state;
    }
}
