import React from 'react';
import { Link } from 'react-router-dom';
import smash from '../../../helpers/data/smash';

const VersionCard = (props) => {
  const { version } = props;

  const deleteVersion = () => (
    smash.deleteVersion(props.versionId)
      .then(() => props.history.push('/'))
      .catch((err) => console.error('could not delete version', err))
  );
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
          ? <div><Link to={`/editversion/${props.versionId}`}>
            <button className="edbtn btn btn-warning">Edit Version</button>
            </Link>
            <button className="edbtn btn btn-danger" onClick={deleteVersion} >Delete Version</button></div>
          : ''}
      </div>
  </div>
  );
};

export default VersionCard;
