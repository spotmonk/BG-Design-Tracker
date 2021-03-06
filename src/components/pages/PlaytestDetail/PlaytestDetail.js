import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import feedbackData from '../../../helpers/data/feedbackData';
import playtestData from '../../../helpers/data/playtestData';
import playtestsFeedbackData from '../../../helpers/data/playtestsFeedbackData';
import smash from '../../../helpers/data/smash';

import FeedbackCard from '../../shared/FeedbackCard/FeedbackCard';
import './PlaytestDetail.scss';

const PlaytestDetail = (props) => {
  const [playtest, setPlaytest] = useState({});
  const [feedback, setFeedback] = useState([]);

  const newfeedback = () => {
    feedbackData.getHighestPlaytestNumber()
      .then((resp) => {
        const tempobj = {
          number: resp + 1,
          playerName: '',
          enjoyment: 0,
          playAgain: true,
          goodFeedback: '',
          badFeedback: '',
          favoriteFeature: '',
        };
        feedbackData.newFeedback(tempobj)
          .then((response) => {
            const pfObj = {
              playtestId: props.match.params.playtestId,
              feedbackId: response.data.name,
            };
            playtestsFeedbackData.addPlaytestFeedback(pfObj)
              .then(() => {
                props.history.push('/temp');
                props.history.goBack();
              });
          });
      })
      .catch((err) => console.error('can not create new feedback', err));
  };

  useEffect(() => {
    const { playtestId } = props.match.params;
    playtestData.getPlaytestById(playtestId)
      .then((resp) => setPlaytest(resp.data))
      .catch((err) => console.error(err));
    smash.getFeedbackfromPlaytestId(playtestId)
      .then((response) => setFeedback(response))
      .catch((err) => console.error('can not get feedback', err));
  }, [props.match.params]);

  const deletePlaytest = () => {
    smash.deletePlaytest(props.match.params.playtestId)
      .then(() => props.history.push('/'))
      .catch((err) => console.error('Could not delete playtest', err));
  };

  const feedbackCards = feedback.map((fb) => <FeedbackCard feedback={fb} />);

  return (
    <>
    <div className="container">
      <div className="d-flex justify-content-around m-3">
      <Link to={`/editplaytest/${props.match.params.playtestId}`} ><button className="btn btn-warning">Edit Playtest</button></Link>
      <h3>Overall Feel {playtest.playtestFeel}</h3>
      <button className="btn btn-danger" onClick={deletePlaytest} >Delete Playtest</button>
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
    <button href="#" onClick={newfeedback} style={{ textDecoration: 'none', color: 'black' }}>
      <div className="card m-3" style={{ minWidth: '18rem', maxWidth: '18rem' }}>
      <i className="fas fa-plus fa-9x"></i><br/><h3>New Feedback</h3>
      </div>
    </button>
    {feedbackCards}
  </>
  );
};

export default PlaytestDetail;
