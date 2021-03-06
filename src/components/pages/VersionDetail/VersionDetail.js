import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import smash from '../../../helpers/data/smash';
import versionData from '../../../helpers/data/versionData';

import VersionCard from '../../shared/VersionCard/VersionCard';
import PlaytestCard from '../../shared/PlaytestCard/PlaytestCard';

const VersionDetail = (props) => {
  const [version, setVersion] = useState({});
  const [playtests, setPlaytests] = useState([]);

  useEffect(() => {
    const { versionId } = props.match.params;
    versionData.getVersionById(versionId)
      .then((resp) => setVersion(resp.data))
      .catch((err) => console.error(err));
    smash.getPlaytestsFromVersionID(versionId)
      .then((resp) => setPlaytests(resp))
      .catch((err) => console.error(err));
  }, [props.match.params]);

  const playtestCards = playtests.map((playtest) => <PlaytestCard key={playtest.id} versionID={props.match.params.versionId} version={version} playtest={playtest} />);

  return (
    <div className="container">
    <div className="col-12 d-flex flex-row flex-wrap h-100">
      <div className="col-xl-4">
        <div>
          <VersionCard ed={true} versionId={props.match.params.versionId} history={props.history} version={version} />
        </div>
      </div>
      <div className=" col-xl-8 card-deck">
      <Link to={{ pathname: '/newplaytest/', versionId: `${props.match.params.versionId}` }} style={{ textDecoration: 'none', color: 'black' }}>
      <div className="card m-3" style={{ minWidth: '18rem', maxWidth: '18rem' }}><i className="fas fa-plus fa-9x"></i><br/><h3>New Playtest</h3></div>
      </Link>
        {playtestCards}
      </div>
    </div>
    </div>
  );
};

export default VersionDetail;
