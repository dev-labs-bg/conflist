import axios from 'axios';

const instance = axios.create({
    baseUrl: 'https://api.conflist.devlabs-projects.com/auth/request-jwt',
    timeout: 1000,
    headers: { credentials: 'include' },
});

const API = {
    fetchConferences: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/conferences'),
    fetchSpeakers: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/speakers'),
    fetchTags: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/tags'),
    fetchConferenceDeatails: confAlias =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/conferences/' + confAlias),
    requestToken: () =>
        fetch(new Request("https://api.conflist.devlabs-projects.com/auth/request-jwt", {
            method: 'POST',
            credentials: 'include',
        })),
};

export default API;
