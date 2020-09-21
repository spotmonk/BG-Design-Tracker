import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllPlaytests = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/playtests.json`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getPlaytestById = (playtestId) => axios.get(`${baseUrl}/playtests/${playtestId}.json`);

const newPlaytest = (playtestObject) => axios.post(`${baseUrl}/playtests.json`, playtestObject);

const updatePlaytest = (playtestId, playtestObject) => axios.put(`${baseUrl}/playtests/${playtestId}.json`, playtestObject);

const removePlaytest = (playtestId) => axios.delete(`${baseUrl}/playtests/${playtestId}.json`);

export default {
  getAllPlaytests,
  getPlaytestById,
  newPlaytest,
  updatePlaytest,
  removePlaytest,
};
