import React from 'react';
import { Link } from 'react-router-dom';

const PlaytestCard = (props) => {
  const { playtest } = props;
  return (
  <div>
    <Link to={`/playtest/${playtest.id}`}>
      <div className="card m-3" style={{ minWidth: '18rem', maxWidth: '18rem' }}>
      <div className="card-body">
      <h2 className="card-title">Playtest</h2>
      <h4 className="card-title">{playtest.dateTime}</h4>
      <h4>Players: {playtest.playerCount}</h4>
      <h4>Location: {playtest.Location}</h4>
      <h4>Type: {playtest.type}</h4>
      </div>
      </div>
      </Link>
  </div>
  );
};

export default PlaytestCard;
