import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllGamesVersions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gamesVersions.json`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getGameVersionsbyGameId = (gameId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gamesVersions.json?orderBy="gameId"&equalTo="${gameId}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getGameVersionsbyVersionId = (versionId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gamesVersions.json?orderBy="versionId"&equalTo="${versionId}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const addGameVersion = (gvObj) => axios.post(`${baseUrl}/gamesVersions.json`, gvObj);

const removeGameVersion = (gvId) => axios.delete(`${baseUrl}/gamesVersions/${gvId}.json`);

export default {
  getAllGamesVersions,
  getGameVersionsbyGameId,
  addGameVersion,
  getGameVersionsbyVersionId,
  removeGameVersion,
};
