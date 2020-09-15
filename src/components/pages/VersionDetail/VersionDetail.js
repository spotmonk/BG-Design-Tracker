import React, { useState, useEffect } from 'react';
import smash from '../../../helpers/data/smash';

import VersionCard from '../../shared/VersionCard/VersionCard';
import versionData from '../../../helpers/data/versionData';

const GameDetail = (props) => {
  const [version, setVersion] = useState({});
  const [playtests, setPlaytests] = useState([]);

  useEffect(() => {
    const { versionId } = props.match.params;
    versionData.getVersionById(versionId)
      .then((resp) => setVersion(resp.data))
      .catch((err) => console.error(err));
    // smash.getVersionsFromGameId(gameId)
    //   .then((resp) => setVersions(resp))
    //   .catch((err) => console.error('no get versions', err));
  }, [props.match.params]);

  // const versionCards = versions.map((version) => <VersionCard ed={false} key={version.id} game={game} version={version} />);

  return (
<div className="container">
    <div className="col-12 d-flex flex-row flex-wrap h-100">
      <div className="col-xl-4">
        <div>
          <VersionCard ed={true} version={version} />
        </div>
      </div>
      <div className=" col-xl-8 card-deck">
      <div className="card m-3" style={{ minWidth: '18rem', maxWidth: '18rem' }}><i className="fas fa-plus fa-9x"></i><br/><h3>New Playtest</h3></div>
        {/* {versionCards} */}
      </div>
    </div>
    </div>
  );
};

export default GameDetail;
