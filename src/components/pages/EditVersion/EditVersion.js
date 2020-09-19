import React, { useState, useEffect } from 'react';
import versionData from '../../../helpers/data/versionData';

const EditVersion = (props) => {
  const [versionChanges, setVersionChanges] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [GVOne, setGVOne] = useState('');
  const [GVTwo, setGVTwo] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    versionData.getVersionById(props.match.params.versionId)
      .then((resp) => {
        setVersionChanges(resp.data.changes);
        setImageUrl(resp.data.imgUrl);
        setDate(resp.data.creationDate);
        const versionNumbers = resp.data.version.split('.');
        setGVOne(versionNumbers[0]);
        setGVTwo(versionNumbers[1]);
      })
      .catch((err) => console.error('could not get game', err));
  }, [props.match.params]);

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
      creationDate: date,
      version: `${GVOne}.${GVTwo}`,
    };

    versionData.updateVersion(props.match.params.versionId, versionObj)
      .then(() => props.history.push(`/version/${props.match.params.versionId}`))
      .catch((err) => console.warn('failed to update version', err));
  };

  return (
    <div>
        <form>
          <div className="formgroup">
          <label htmlFor="gameVersionOne">Game Version</label>
            <div className="input-group col-xs-1">
            <input type="number" min="0" class="form-control" id="gameVersionOne" value={GVOne} onChange={changeGVOneEvent}/><h1>.</h1>
            <input type="number" min="0" class="form-control" id="gameVersionTwo" value={GVTwo} onChange={changeGVTwoEvent}/>
            </div>
          </div>
          <div class="form-group">
            <label htmlFor="gameName">Version Image URL</label>
            <input type="url" class="form-control" id="imgURL" value={imgUrl} onChange={changeImgUrlEvent}/>
          </div>
          <div class="form-group">
            <label htmlFor="versionChanges">Game Changes</label>
            <textarea class="form-control" id="versionChanges" rows="3" value={versionChanges} onChange={changeVersionChangesEvent}></textarea>
          </div>
          <div class="form-group">
            <label htmlFor="gameDescription">Game Description</label>
            <input type="date" class="form-control" id="versionDate" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <button class="btn btn-success" onClick={saveVersion}>Save Version</button>
        </form>
  </div>
  );
};

export default EditVersion;
