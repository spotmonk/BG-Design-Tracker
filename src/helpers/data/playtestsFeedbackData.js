import axios from 'axios';
// import utils from '../utils';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const addPlaytestFeedback = (pfObj) => axios.post(`${baseUrl}/playtestsFeedback.json`, pfObj);

export default { addPlaytestFeedback };
