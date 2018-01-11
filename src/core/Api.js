import axios from 'axios';

const API = {
    fetchConferences: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/conferences'),
    fetchSpeakers: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/speakers'),
    fetchTags: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/tags'),
    searchConference: confAlias =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/conferences/' + confAlias),
};

export default API;
