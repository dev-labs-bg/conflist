import axios from 'axios';

// Actions
const FETCH_CONFERENCES = 'conflist/src/core/duck/FETCH_CONFERENCES';
const SET_CONFERENCEES = 'SET_CONFERENCEES';

// Action Creators
export function setConferences( conferences ) => {
    return {
        type: SET_CONFERENCEES,
        conferences: conferences
    };
};

export function fetchConferences(state, action) {
    return dispatch => {
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/conferences')
            .then(response => {
                dispatch(setConferences(response));
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
    case SET_CONFERENCEES:
        return {
            ...state,
            conferences: state.conferences
        }
    default: return state;
    }
}
