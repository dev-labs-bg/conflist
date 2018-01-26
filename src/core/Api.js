import axios from 'axios';

const baseUrl = 'https://api.conflist.devlabs-projects.com/';
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
};

export default API;
