import React, { useEffect, useState } from 'react';
import gameData from '../../../helpers/data/gameData';
import authData from '../../../helpers/data/authData';

const NewGame = (props) => {
  const [game, setGame] = useState({});
  const [name, setName] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    gameData.getGameById(props.match.params.gameId)
      .then((resp) => setGame(resp.data))
      .catch((err) => console.error('could not get game', err));
  }, [props.match.params]);

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

  const changeGameDateEvent = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const saveGame = (e) => {
    e.preventDefault();
    const tempObj = {
      name,
      imgUrl,
      description,
      creationDate: date,
      uid: authData.getUid(),
    };

    gameData.updateGame(props.match.params.gameId, tempObj)
      .then(() => props.history.push('/home'))
      .catch((err) => console.error('failed to create', err));
  };

  return (
    <div>
        <form>
          <div class="form-group">
            <label htmlFor="gameName">Game Name</label>
            <input type="text" class="form-control" id="gameName" value={game.name} onChange={changeGameNameEvent} />
          </div>
          <div class="form-group">
            <label htmlFor="gameName">Game Image URL</label>
            <input type="url" class="form-control" id="imgURL" defaultValue={game.imgUrl} onChange={changeImgUrlEvent}/>
          </div>
          <div class="form-group">
            <label htmlFor="gameDescription">Game Description</label>
            <input type="text" class="form-control" id="gameName" defaultValue={game.description} onChange={changeGameDescirptionEvent}/>
          </div>
          <div class="form-group">
            <label htmlFor="gameDescription">Game Description</label>
            <input type="date" class="form-control" id="gameDate" defaultValue={game.dateTime} onChange={changeGameDateEvent}/>
          </div>

          <button class="btn btn-success" onClick={saveGame}>Save Game</button>
        </form>
  </div>
  );
};

export default NewGame;
