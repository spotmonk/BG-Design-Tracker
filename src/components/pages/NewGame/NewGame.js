import React, { useState } from 'react';
import moment from 'moment';
import gameData from '../../../helpers/data/gameData';
import authData from '../../../helpers/data/authData';

const NewGame = (props) => {
  const [name, setName] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const changeGameNameEvent = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const changeImgUrlEvent = (e) => {
    e.preventDefault();
    setImageUrl(e.target.value);
  };
  const changeGameDescirptionEvent = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const saveGame = (e) => {
    e.preventDefault();
    const tempObj = {
      name,
      imgUrl,
      description,
      creationDate: moment(Date.now()).format('YYYY-MM-DD'),
      uid: authData.getUid(),
    };

    gameData.addGame(tempObj)
      .then(() => props.history.push('/home'))
      .catch((err) => console.error('failed to create', err));
  };

  return (
    <div>
        <form>
          <div className="form-group">
            <label htmlFor="gameName">Game Name</label>
            <input type="text" className="form-control" id="gameName" onChange={changeGameNameEvent} />
          </div>
          <div className="form-group">
            <label htmlFor="gameName">Game Image URL</label>
            <input type="url" className="form-control" id="imgURL" onChange={changeImgUrlEvent}/>
          </div>
          <div className="form-group">
            <label htmlFor="gameDescription">Game Description</label>
            <input type="text" className="form-control" id="gameName" onChange={changeGameDescirptionEvent}/>
          </div>
          <button className="btn btn-success" onClick={saveGame}>Save Game</button>
        </form>
  </div>
  );
};

export default NewGame;
