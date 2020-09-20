import gamesVersionsData from './gamesVerionsData';
import versionData from './versionData';
import versionsPlaytestsData from './versionsPlaytestsData';
import playtestData from './playtestData';
import playtestsFeedbackData from './playtestsFeedbackData';
import feedbackData from './feedbackData';

const getVersionsFromGameId = (gameId) => new Promise((resolve, reject) => {
  gamesVersionsData.getGameVersionsbyGameId(gameId)
    .then((gamesVersions) => {
      versionData.getAllVersions()
        .then((versions) => {
          const versionsToDisplay = [];
          gamesVersions.forEach((gv) => {
            versions.forEach((v) => {
              if (v.id === gv.versionId) {
                versionsToDisplay.push(v);
              }
            });
          });

          resolve(versionsToDisplay);
        });
    })
    .catch((err) => reject(err));
});

const getPlaytestsFromVersionID = (versionID) => new Promise((resolve, reject) => {
  versionsPlaytestsData.getVersionPlaytestByVersionId(versionID)
    .then((versionsPlaytests) => {
      playtestData.getAllPlaytests()
        .then((playtests) => {
          const playtestsToDisplay = [];
          versionsPlaytests.forEach((vp) => {
            playtests.forEach((p) => {
              if (p.id === vp.playtestId) {
                playtestsToDisplay.push(p);
              }
            });
            resolve(playtestsToDisplay);
          });
        });
    })
    .catch((err) => reject(err));
});

const getFeedbackfromPlaytestId = (playtestId) => new Promise((resolve, reject) => {
  playtestsFeedbackData.getPlaytestsFeedbackbyPlaytestId(playtestId)
    .then((playtestFeedback) => {
      feedbackData.getAllFeedbaack()
        .then((feedback) => {
          const feedbackToDisplay = [];
          playtestFeedback.forEach((pf) => {
            feedback.forEach((f) => {
              if (f.id === pf.feedbackId) {
                feedbackToDisplay.push(f);
              }
            });
          });
          resolve(feedbackToDisplay);
        });
    })
    .catch((err) => reject(err));
});

export default { getVersionsFromGameId, getPlaytestsFromVersionID, getFeedbackfromPlaytestId };
