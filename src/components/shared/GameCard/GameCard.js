import React from 'react';
import { Link } from 'react-router-dom';
import smash from '../../../helpers/data/smash';

const GameCard = (props) => {
  const { game } = props;

  const deleteGame = () => {
    smash.deleteGame(props.gameId.gameId)
      .then(() => props.history.push('/'))
      .catch((err) => console.error('could not delete version', err));
  };

  return (
  <div>
      <div className="card m-3" style={{ width: '18rem' }}>
      <Link to={ props.ed
        ? ''
        : `/game/${game.id}`}
      style={{ textDecoration: 'none', color: 'black' }}>
        <img src={game.imgUrl} className="card-img-top" alt={game.name} />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p>{game.description}</p>
          <h6>Created {game.creationDate}</h6>
        </div>
        </Link>
        { props.ed
          ? <div>
            <Link to={`/editgame/${props.gameId.gameId}`}>
              <button className="edbtn btn btn-warning">Edit Game</button>
            </Link>
            <button className="edbtn btn btn-danger" onClick={deleteGame}>Delete Game</button></div>
          : ''}
      </div>
  </div>
  );
};

export default GameCard;
