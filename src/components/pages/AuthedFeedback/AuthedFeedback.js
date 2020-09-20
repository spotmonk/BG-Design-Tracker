import React, { useState, useEffect } from 'react';
import feedbackData from '../../../helpers/data/feedbackData';

const AuthedFeedback = (props) => {
  const [feel, setFeel] = useState(5);
  const [name, setName] = useState('');
  const [playAgain, setPlayAgain] = useState(true);
  const [good, setGood] = useState('');
  const [bad, setBad] = useState('');
  const [favorite, setFavorite] = useState('');
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const { feedbackId } = props.match.params;
    feedbackData.getFeedbackById(feedbackId)
      .then((resp) => {
        setFeel(resp.data.enjoyment);
        setName(resp.data.playerName);
        setPlayAgain(resp.data.playAgain);
        setGood(resp.data.goodFeedback);
        setBad(resp.data.badFeedback);
        setFavorite(resp.data.favoriteFeature);
        setNumber(resp.data.number);
      })
      .catch((err) => console.error(err));
  }, [props.match.params]);

  const saveFeedback = () => {
    const tempobj = {
      badFeedback: bad,
      enjoyment: feel,
      favoriteFeature: favorite,
      goodFeedback: good,
      number,
      playAgain,
      playerName: name,
    };
    feedbackData.updateFeedback(props.match.params.feedbackId, tempobj)
      .then(() => props.history.push(`/feedback/${props.match.params.feedbackId}`))
      .catch((err) => console.error('could not update', err));
  };

  return (
  <>
     <div className="d-flex justify-content-around m-3">
        <h3>Overall Feel: {feel} <br />
        1<input type="range" min="1" max="10" value={feel} id="feelRange" onChange={(e) => setFeel(e.target.value) }/>10
        </h3>
        <button className="btn btn-success" onClick={saveFeedback} >Save Feedback</button>
      </div>
      <div className="d-flex justify-content-around m-3">
      <h3>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value) }/></h3>
        <h3>Play Again?:</h3>
        <select value={playAgain} onChange={(e) => setPlayAgain(e.target.value)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
      </div>
      <div className="d-flex m-3">
          <div className="col-4">
            <h6>What was good?:</h6>
            <div className="notes"><textarea value={good} onChange={(e) => setGood(e.target.value)}></textarea></div>
          </div>
          <div className="col-4">
            <h6>What was bad?:</h6>
            <div className="notes"><textarea value={bad} onChange={(e) => setBad(e.target.value)}></textarea></div>
          </div>
          <div className="col-4">
            <h6>Favorite Feature:</h6>
            <div className="notes"><textarea value={favorite} onChange={(e) => setFavorite(e.target.value)}></textarea></div>
          </div>
        </div>

  </>
  );
};

export default AuthedFeedback;
