import axios from 'axios';
import { baseUrl } from '../config';
import { store } from '../index';
import { removeToken } from '../Login/duck';
import history from '../core/history';

const instance = axios.create({
    baseURL: `${baseUrl}api/v1/`,
});

const API = {
    fetchConferences: () =>
        instance.get('conferences'),
    fetchSpeakers: () =>
        instance.get('speakers'),
    fetchTags: () =>
        instance.get('tags'),
    fetchConferenceDeatails: confAlias =>
        instance.get(`conferences/${confAlias}`),
    requestToken: () =>
        axios({
            url: `${baseUrl}auth/request-jwt`,
            method: 'post',
            withCredentials: true,
        }),
    attendConference: (eventId, token) =>
        instance.post(
            `conferences/${eventId}/attend`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        ),
    unattendConference: (eventId, token) =>
        instance.post(
            `conferences/${eventId}/cancel-attend`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        ),
    fetchCurrentUser: token =>
        axios({
            url: `${baseUrl}api/v1/users/me`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    updateCurrentUser: (token, _updatedValue) =>
        instance.post(
            'users/me',
            _updatedValue,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        ),
    fetchWishList: token =>
        axios({
            url: `${baseUrl}api/v1/users/me/conferences`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    searchTags: searchString =>
        instance.get(`search/${searchString}`),
    getEventsByTag: tag =>
        instance.get(`conferences/tags/${tag}`),
    subscribeByTag: (token, tag) =>
        instance.post(
            'users/me/subscribe',
            {
                tag,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        ),
    unsubscribeByTag: (token, tag) =>
        instance.post(
            'users/me/unsubscribe',
            {
                tag,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        ),
    getEventsBySpeaker: speakerId =>
        instance.get(`speakers/${speakerId}/conferences`),
    fetchConferencesByDate: date =>
        instance.get(`conferences/date/${date}`),
    fetchConferencesinThreeMonthPeriod: (start, end, startDateSearch, endDateSearch) =>
        instance.get(`conferences?_sort=start&_order=DESC&_start=${start}&_end=${end}&_after=${startDateSearch}&_before=${endDateSearch}`),
};



axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    if (!error.response) {
        // Axios error object. Contains it's own "message" in the error object.
        return Promise.reject(error);
    }

    if (error.response.status === 440 || error.response.status === 401) {
        history.push('/');
        store.dispatch(removeToken());
    }
    // Do something with response error
    return Promise.reject(error.response.data);
});


export default API;
