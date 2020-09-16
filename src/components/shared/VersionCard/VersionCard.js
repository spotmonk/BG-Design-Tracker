import React from 'react';
import { Link } from 'react-router-dom';

const VersionCard = (props) => {
  const { version } = props;
  return (
  <div>
      <div className="card m-3" style={{ minWidth: '18rem', maxWidth: '18rem' }}>
      <Link to={ props.ed
        ? '#'
        : { pathname: `/version/${version.id}` }}
      style={{ textDecoration: 'none', color: 'black' }}>
        <img src={version.imgUrl} className="card-img-top" alt={version.version} />
        <div className="card-body">
          {props.game
            ? <h5 className="card-title">{props.game.name}</h5>
            : ''}
          <h5 className="card-title">{version.version}</h5>
          <p>{version.changes}</p>
          <h6>Created {version.creationDate}</h6>
        </div>
        </Link>
        { props.ed
          ? <div><button onClick={() => console.warn('button pressed')} className="edbtn btn btn-warning">Edit Game</button>
            <button className="edbtn btn btn-danger">Delete Game</button></div>
          : ''}
      </div>
  </div>
  );
};

export default VersionCard;
