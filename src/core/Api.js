import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.conflist.devlabs-projects.com/api/v1/',
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
            url: 'https://api.conflist.devlabs-projects.com/auth/request-jwt',
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
};

export default API;
