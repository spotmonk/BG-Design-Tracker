import React, { useEffect, useState } from 'react';
import gameData from '../../../helpers/data/gameData';
import authData from '../../../helpers/data/authData';

import GameCard from '../../shared/GameCard/GameCard';

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameData.getGamesByUid(authData.getUid())
      .then((response) => setGames(response))
      .catch((err) => console.warn("couldn't get games", err));
  }, []);

  const gameCards = games.map((game) => <GameCard ed={false} key={game.id} game={game} />);

  return (
    <div className='card-deck'>
      {gameCards}
    </div>
  );
};

export default Home;
