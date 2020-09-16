import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllPlaytests = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/playtests.json`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

export default { getAllPlaytests };
