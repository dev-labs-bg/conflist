import axios from 'axios';

const API = {
    fetchConferences: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/confrences'),
    fetchSpeakers: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/speakers'),
    fetchTags: () =>
        axios.get('https://api.conflist.devlabs-projects.com/api/v1/tags'),
};

export default API;
