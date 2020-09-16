import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getVersionPlaytestByVersionId = (versionId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/versionsPlaytests.json?orderBy="versionId"&equalTo="${versionId}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

export default { getVersionPlaytestByVersionId };
