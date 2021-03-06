import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../../shared/GameCard/GameCard';
import gameData from '../../../helpers/data/gameData';
import smash from '../../../helpers/data/smash';

import VersionCard from '../../shared/VersionCard/VersionCard';

const GameDetail = (props) => {
  const [game, setGame] = useState({});
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const { gameId } = props.match.params;
    gameData.getGameById(gameId)
      .then((resp) => setGame(resp.data))
      .catch((err) => console.error(err));
    smash.getVersionsFromGameId(gameId)
      .then((resp) => setVersions(resp))
      .catch((err) => console.error('no get versions', err));
  }, [props.match.params]);

  const versionCards = versions.map((version) => <VersionCard ed={false} key={version.id} game={game} version={version} />);

  return (
    <div className="container">
    <div className="col-12 d-flex flex-row flex-wrap h-100">
      <div className="col-xl-4">
        <div>
          <GameCard ed={true} gameId={props.match.params} history={props.history} game={game} />
        </div>
      </div>
      <div className=" col-xl-8 card-deck">
        <Link to={{ pathname: '/newversion/', gameId: `${props.match.params.gameId}` }} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="card m-3" style={{ minWidth: '18rem', maxWidth: '18rem' }}>
            <i className="fas fa-plus fa-9x"></i><br/><h3>New version</h3>
          </div>
        </Link>
        {versionCards}
      </div>
    </div>
    </div>
  );
};

export default GameDetail;
