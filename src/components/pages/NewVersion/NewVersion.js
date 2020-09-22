import React, { useState } from 'react';
import moment from 'moment';
import gamesVerionsData from '../../../helpers/data/gamesVerionsData';
import versionData from '../../../helpers/data/versionData';

const NewVersion = (props) => {
  const [versionChanges, setVersionChanges] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [GVOne, setGVOne] = useState('');
  const [GVTwo, setGVTwo] = useState('');

  const changeVersionChangesEvent = (e) => {
    e.preventDefault();
    setVersionChanges(e.target.value);
  };
  const changeImgUrlEvent = (e) => {
    e.preventDefault();
    setImageUrl(e.target.value);
  };
  const changeGVOneEvent = (e) => {
    e.preventDefault();
    setGVOne(e.target.value);
  };

  const changeGVTwoEvent = (e) => {
    e.preventDefault();
    setGVTwo(e.target.value);
  };

  const saveVersion = (e) => {
    e.preventDefault();
    const versionObj = {
      changes: versionChanges,
      imgUrl,
      creationDate: moment(Date.now()).format('YYYY-MM-DD'),
      version: `${GVOne}.${GVTwo}`,
    };

    versionData.addVersion(versionObj)
      .then((response) => {
        const gvObj = {
          gameId: props.location.gameId,
          versionId: response.data.name,
        };
        gamesVerionsData.addGameVersion(gvObj)
          .then(() => props.history.push(`/game/${props.location.gameId}`));
      })
      .catch((err) => console.warn('failed to add version', err));
  };

  return (
    <div>
        <form>
          <div className="formgroup">
          <label htmlFor="gameVersionOne">Game Version</label>
            <div className="input-group col-xs-1">
            <input type="number" min="0" className="form-control" id="gameVersionOne" onChange={changeGVOneEvent}/><h1>.</h1>
            <input type="number" min="0" className="form-control" id="gameVersionTwo" onChange={changeGVTwoEvent}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="gameName">Version Image URL</label>
            <input type="url" className="form-control" id="imgURL" onChange={changeImgUrlEvent}/>
          </div>
          <div className="form-group">
            <label htmlFor="versionChanges">Game Changes</label>
            <textarea className="form-control" id="versionChanges" rows="3" onChange={changeVersionChangesEvent}></textarea>
          </div>
          <button className="btn btn-success" onClick={saveVersion}>Save Version</button>
        </form>
  </div>
  );
};

export default NewVersion;
