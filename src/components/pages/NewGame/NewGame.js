import React, { useState } from 'react';

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

  return (
    <div>
        <form>
          <div class="form-group">
            <label for="gameName">Game Name</label>
            <input type="text" class="form-control" id="gameName" onChange={changeGameNameEvent} />
          </div>
          <div class="form-group">
            <label for="gameName">Game Image URL</label>
            <input type="url" class="form-control" id="imgURL" onChange={changeImgUrlEvent}/>
          </div>
          <div class="form-group">
            <label for="gameDescription">Game Description</label>
            <input type="text" class="form-control" id="gameName" onChange={changeGameDescirptionEvent}/>
          </div>
          <button class="btn btn-success">Save Game</button>
        </form>
  </div>
  );
};

export default NewGame;
