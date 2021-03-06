import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getGamesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/games.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getGameById = (gameId) => axios.get(`${baseUrl}/games/${gameId}.json`);

const addGame = (gameObj) => axios.post(`${baseUrl}/games.json`, gameObj);

const updateGame = (gameId, gameObj) => axios.put(`${baseUrl}/games/${gameId}.json`, gameObj);

const removeGame = (gameId) => axios.delete(`${baseUrl}/games/${gameId}.json`);

export default {
  getGamesByUid,
  getGameById,
  addGame,
  updateGame,
  removeGame,
};
