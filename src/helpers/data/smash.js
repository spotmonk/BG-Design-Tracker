import gamesVersionsData from './gamesVerionsData';
import versionData from './versionData';

const getVersionsFromGameId = (gameId) => new Promise((resolve, reject) => {
  gamesVersionsData.getGameVersionsbyGameId(gameId)
    .then((gamesVersions) => {
      versionData.getAllVersions()
        .then((versions) => {
          const versionsToDisplay = [];
          gamesVersions.forEach((gv) => {
            console.warn('on version', gv);
            versions.forEach((v) => {
              console.warn('v id is ', v.id);
              if (v.id === gv.versionId) {
                console.warn('should be pushing', v);
                versionsToDisplay.push(v);
              }
            });
          });

          resolve(versionsToDisplay);
        });
    })
    .catch((err) => reject(err));
});

export default { getVersionsFromGameId };
