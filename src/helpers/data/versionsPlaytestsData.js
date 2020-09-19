import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getVersionPlaytestByVersionId = (versionId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/versionsPlaytests.json?orderBy="versionId"&equalTo="${versionId}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const addVersionPlaytest = (VPObject) => axios.post(`${baseUrl}/versionsPlaytests.json`, VPObject);

export default { getVersionPlaytestByVersionId, addVersionPlaytest };
