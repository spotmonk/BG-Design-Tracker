import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllVersions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/versions.json`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getVersionById = (versionId) => axios.get(`${baseUrl}/versions/${versionId}.json`);

const addVersion = (versionObj) => axios.post(`${baseUrl}/versions.json`, versionObj);

const updateVersion = (versionId, versionObj) => axios.put(`${baseUrl}/versions/${versionId}.json`, versionObj);

const removeVersion = (versionId) => axios.delete(`${baseUrl}/versions/${versionId}.json`);

export default {
  getAllVersions,
  getVersionById,
  addVersion,
  updateVersion,
  removeVersion,
};
