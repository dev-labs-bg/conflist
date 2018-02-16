import axios from 'axios';
import { baseUrl } from '../config';

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
    updateCurrentUser: (token, _name) =>
        instance.post(
            'users/me',
            {
                name: _name,
            },
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
};

export default API;
