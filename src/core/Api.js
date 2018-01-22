import axios from 'axios';

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
        axios({
            url: 'https://api.conflist.devlabs-projects.com/auth/request-jwt',
            method: 'post',
            withCredentials: true,
        }),
};

export default API;
