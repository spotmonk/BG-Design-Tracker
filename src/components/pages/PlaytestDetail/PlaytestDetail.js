import React, { useEffect, useState } from 'react';
import playtestData from '../../../helpers/data/playtestData';
import './PlaytestDetail.scss';

const PlaytestDetail = (props) => {
  const [playtest, setPlaytest] = useState({});

  useEffect(() => {
    const { playtestId } = props.match.params;
    playtestData.getPlaytestById(playtestId)
      .then((resp) => setPlaytest(resp.data))
      .catch((err) => console.error(err));
  }, [props.match.params]);

  return (
    <div className="container">
      <div className="d-flex justify-content-around m-3">
      <button className="btn btn-warning">Edit Playtest</button>
      <h3>Overall Feel {playtest.playtestFeel}</h3>
      <button className="btn btn-danger">Delete Playtest</button>
      </div>
      <div className="col-12  flex-wrap">
      <div className="d-flex m-3">
      <div className="text-left col-4">
        <h4>Playtest Date: <br/>{playtest.dateTime}</h4>
        <h4>Playtest Location: {playtest.Location}</h4>
        <h4>Playtest Type: {playtest.type}</h4>
        <h4>Number of Players: {playtest.playerCount}</h4>
      </div>
      <div className="col-4">
        <h6>Playtest Goals:</h6>
        <div className="notes">{playtest.playtestGoals}</div>
      </div>
      <div className="col-4">
        <h6>General Notes:</h6>
        <div className="notes">{playtest.generalNotes}</div>
      </div>
      </div>
      <div className="d-flex m-3">
        <div className="col-4">
          <h6>What was good?:</h6>
          <div className="notes">{playtest.goodNotes}</div>
        </div>
        <div className="col-4">
          <h6>What was bad?:</h6>
          <div className="notes">{playtest.badNotes}</div>
        </div>
        <div className="col-4">
          <h6>Changes to Make:</h6>
          <div className="notes">{playtest.changesToMake}</div>
        </div>

      </div>

    </div>
    </div>
  );
};

export default PlaytestDetail;
