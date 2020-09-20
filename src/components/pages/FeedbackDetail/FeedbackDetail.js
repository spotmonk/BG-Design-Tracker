import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import feedbackData from '../../../helpers/data/feedbackData';

const FeedbackDetail = (props) => {
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const { feedbackId } = props.match.params;
    feedbackData.getFeedbackById(feedbackId)
      .then((resp) => setFeedback(resp.data))
      .catch((err) => console.error(err));
  }, [props.match.params]);

  return (
  <>
    <div className="d-flex justify-content-around m-3">
      <h2>Name: {feedback.playerName}</h2>
      <h3>Overall Feel: {feedback.enjoyment}</h3>
      <h2>Play Again?: {feedback.playAgain === 'true' ? 'Yes' : 'No'}</h2>
    </div>
    <div className="d-flex m-3">
        <div className="col-4">
          <h6>What was good?:</h6>
          <div className="notes">{feedback.goodFeedback}</div>
        </div>
        <div className="col-4">
          <h6>What was bad?:</h6>
          <div className="notes">{feedback.badFeedback}</div>
        </div>
        <div className="col-4">
          <h6>Favorite Feature:</h6>
          <div className="notes">{feedback.favoriteFeature}</div>
        </div>
      </div>
      <div className="d-flex justify-content-around m-3">
      <Link to={`/editfeedback/${props.match.params.feedbackId}`}><button className="btn btn-warning">Edit Feedback</button></Link>
      <button className="btn btn-danger">Delete Feedback</button>
      </div>

  </>
  );
};

export default FeedbackDetail;
