import React, { useState, useEffect } from 'react';
import GameCard from '../../shared/GameCard/GameCard';
import gameData from '../../../helpers/data/gameData';

const GameDetail = (props) => {
  const [game, setGame] = useState({});

  useEffect(() => {
    const { gameId } = props.match.params;
    gameData.getGameById(gameId)
      .then((resp) => setGame(resp.data))
      .catch((err) => console.error(err));
  }, [props.match.params]);

  return (
    <div className="col-12 row row-wrap h-100">
      <div className="col-4">
        <div>
          <GameCard ed={true} game={game} />
          <div className="col-12">
          </div>
        </div>
      </div>
      <div className="col-8 card-columns"></div>
    </div>
  );
};

export default GameDetail;
