import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllPlaytestFeedback = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/playtestsFeedback.json`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getPlaytestsFeedbackbyPlaytestId = (playtestId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/playtestsFeedback.json?orderBy="playtestId"&equalTo="${playtestId}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getPlaytestsFeedbackbyFeedbackId = (feedbackId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/playtestsFeedback.json?orderBy="feedbackId"&equalTo="${feedbackId}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const addPlaytestFeedback = (pfObj) => axios.post(`${baseUrl}/playtestsFeedback.json`, pfObj);

const removePlaytestFeedback = (PFId) => axios.delete(`${baseUrl}/playtestsFeedback/${PFId}.json`);

export default {
  getAllPlaytestFeedback,
  addPlaytestFeedback,
  getPlaytestsFeedbackbyPlaytestId,
  removePlaytestFeedback,
  getPlaytestsFeedbackbyFeedbackId,
};
