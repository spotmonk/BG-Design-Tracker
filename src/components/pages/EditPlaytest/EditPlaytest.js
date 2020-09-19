import React, { useState, useEffect } from 'react';
import playtestData from '../../../helpers/data/playtestData';

import './EditPlaytest.scss';

const PlaytestDetail = (props) => {
  const [feel, setFeel] = useState(5);
  const [playDate, setPlayDate] = useState('');
  const [playTime, setPlayTime] = useState('');
  const [playLocation, setPlayLocation] = useState('');
  const [playType, setPlayType] = useState('');
  const [playerCount, setPlayerCount] = useState(0);
  const [goals, setGoals] = useState('');
  const [notes, setNotes] = useState('');
  const [good, setGood] = useState('');
  const [bad, setBad] = useState('');
  const [changes, setChanges] = useState('');

  useEffect(() => {
    playtestData.getPlaytestById(props.match.params.playtestId)
      .then((resp) => {
        setPlayLocation(resp.data.Location);
        setBad(resp.data.badNotes);
        setChanges(resp.data.changesToMake);
        const dateTime = resp.data.dateTime.split(' ');
        setPlayDate(dateTime[0]);
        setPlayTime(dateTime[1]);
        setNotes(resp.data.generalNotes);
        setGood(resp.data.goodNotes);
        setPlayerCount(resp.data.playerCount);
        setFeel(resp.data.playtestFeel);
        setGoals(resp.data.playtestGoals);
        setPlayType(resp.data.type);
      })
      .catch((err) => console.error('could not get game', err));
  }, [props.match.params]);

  const feelChange = (e) => {
    setFeel(e.target.value);
  };

  const playDateChange = (e) => {
    setPlayDate(e.target.value);
  };

  const playTimeChange = (e) => {
    setPlayTime(e.target.value);
  };

  const playTypeChange = (e) => {
    setPlayType(e.target.value);
  };

  const playerCountChange = (e) => {
    setPlayerCount(e.target.value);
  };

  const playLocationChange = (e) => {
    setPlayLocation(e.target.value);
  };

  const goalsChange = (e) => {
    setGoals(e.target.value);
  };

  const notesChange = (e) => {
    setNotes(e.target.value);
  };

  const goodChange = (e) => {
    setGood(e.target.value);
  };

  const badChange = (e) => {
    setBad(e.target.value);
  };

  const changesChange = (e) => {
    setChanges(e.target.value);
  };

  const savePlaytest = () => {
    const tempObj = {
      Location: playLocation,
      badNotes: bad,
      changesToMake: changes,
      dateTime: `${playDate} ${playTime}`,
      generalNotes: notes,
      goodNotes: good,
      playerCount,
      playtestFeel: feel,
      playtestGoals: goals,
      type: playType,
    };

    playtestData.updatePlaytest(props.match.params.playtestId, tempObj)
      .then(() => { props.history.push(`/playtest/${props.match.params.playtestId}`); })
      .catch((err) => console.warn('could not create new playtest', err));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-around m-3">
        <h3>Overall Feel: {feel} <br />
        1<input type="range" min="1" max="10" value={feel} id="feelRange" onChange={feelChange}/>10
        </h3>
        <button className="btn btn-success" onClick={savePlaytest}>Save Playtest</button>
      </div>
      <div className="col-12  flex-wrap">
        <div className="d-flex m-3">
        <div className="text-left col-4">
          <h4>Playtest Date: <br/><input type="date" value="date" onChange={playDateChange} /><input type="time" value="time" onChange={playTimeChange}/></h4>
          <h4>Playtest Location: <input type="text" value={playLocation}onChange={playLocationChange}/></h4>
          <h4>Playtest Type: <input type="text" value={playType} onChange={playTypeChange}/></h4>
          <h4>Number of Players: <input type="number" value={playerCount} onChange={playerCountChange}/></h4>
        </div>
        <div className="col-4">
          <h6>Playtest Goals:</h6>
          <div className="notes"><textarea value={goals}onChange={goalsChange}></textarea></div>
        </div>
        <div className="col-4">
          <h6>General Notes:</h6>
          <div className="notes"><textarea value={notes} onChange={notesChange}></textarea></div>
        </div>
        </div>
        <div className="d-flex m-3">
          <div className="col-4">
            <h6>What was good?:</h6>
            <div className="notes"><textarea value={good} onChange={goodChange}></textarea></div>
          </div>
          <div className="col-4">
            <h6>What was bad?:</h6>
            <div className="notes"><textarea value={bad} onChange={badChange}></textarea></div>
          </div>
          <div className="col-4">
            <h6>Changes to Make:</h6>
            <div className="notes"><textarea value={changes} onChange={changesChange}></textarea></div>
          </div>

        </div>

     </div>
    </div>
  );
};

export default PlaytestDetail;
