import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getVersionPlaytestByVersionId = (versionId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/versionsPlaytests.json?orderBy="versionId"&equalTo="${versionId}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getVersionPlaytestByPlaytestId = (PlaytestId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/versionsPlaytests.json?orderBy="playtestId"&equalTo="${PlaytestId}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const addVersionPlaytest = (VPObject) => axios.post(`${baseUrl}/versionsPlaytests.json`, VPObject);

const removeVersionPlaytest = (vpId) => axios.delete(`${baseUrl}/versionsPlaytests/${vpId}.json`);

export default {
  getVersionPlaytestByVersionId,
  addVersionPlaytest,
  getVersionPlaytestByPlaytestId,
  removeVersionPlaytest,
};
