import axios from 'axios';

export const fetchConferences = () => {
    axios.get('https://api.conflist.devlabs-projects.com/api/v1/conferences')
        .then(response => {
            console.log(response);
        })
        .catch(response => {
            console.log('error');
        });
};

export default fetchConferences;
