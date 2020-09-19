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

export default { getGamesByUid, getGameById, addGame };
