import React from 'react';
import { Link } from 'react-router-dom';

const PlaytestCard = (props) => {
  const { feedback } = props;
  return (
  <div>
        <div className="card m-3" style={{ minWidth: '18rem', maxWidth: '18rem' }}>
        <div className="card-body">
        <Link to={`/feedback/${feedback.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        {feedback.playerName.length > 0
          ? <>
            <h2 className="card-title">{feedback.playerName}</h2>
            </>
          : ''
        }
        <h4>Feedback Reference Number: {feedback.number}</h4>
        </Link>
        <Link to={`/editfeedback/${feedback.id}`}>
        <button className="btn btn-warning">Edit Feedback</button>
      </Link>
      </div>
      </div>
  </div>
  );
};

export default PlaytestCard;
