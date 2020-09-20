import React, { useState } from 'react';
import feedbackData from '../../../helpers/data/feedbackData';

const GetNumber = (props) => {
  const [reference, setReference] = useState(0);

  const submitNumber = (e) => {
    e.preventDefault();
    feedbackData.getFeedbackIdfromNumber(reference)
      .then((feedbackId) => props.history.push(`/feedback/${feedbackId}`))
      .catch((err) => console.warn('can not get feedback', err));
  };
  return (
    <>
      <h3>What's your feedback reference number?</h3>
      <input type="number" class="form-control" id="referenceNumber" onChange={(e) => setReference(e.target.value)} />
      <button className="btn btn-warning" onClick={submitNumber}>Submit Number</button>
    </>
  );
};

export default GetNumber;
