import axios from 'axios';
import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllFeedbaack = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/feedback.json`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getHighestPlaytestNumber = () => new Promise((resolve, reject) => {
  getAllFeedbaack()
    .then((resp) => {
      const highest = Math.max(...resp.map((fb) => fb.number));
      resolve(highest);
    })
    .catch((err) => reject(err));
});

const newFeedback = (feedbackObj) => axios.post(`${baseUrl}/feedback.json`, feedbackObj);

const getFeedbackById = (feedbackId) => axios.get(`${baseUrl}/feedback/${feedbackId}.json`);

const updateFeedback = (feedbackId, feedbackObj) => axios.put(`${baseUrl}/feedback/${feedbackId}.json`, feedbackObj);

const getFeedbackIdfromNumber = (number) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/feedback.json?orderBy="number"&equalTo=${number}`)
    .then(({ data }) => {
      resolve(utils.responseToArray(data));
    })
    .catch((err) => reject(err));
});

const removeFeedback = (feedbackId) => axios.delete(`${baseUrl}/feedback/${feedbackId}.json`);

export default {
  getAllFeedbaack,
  getHighestPlaytestNumber,
  newFeedback,
  getFeedbackById,
  updateFeedback,
  getFeedbackIdfromNumber,
  removeFeedback,
};
