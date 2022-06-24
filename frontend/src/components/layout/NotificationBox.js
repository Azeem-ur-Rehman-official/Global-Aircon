import React from 'react';
import '../css/notifiication.css';
const NotificationBox = (props) => {
  return (
    <div className="uperBox">
      <div className="middleBox">
        <button
          className="btn-success not-btn"
          onClick={() => props.box()}
        >
          X
        </button>
        <h3 className="NotificationHeading mb-3">
          Notification
        </h3>
        <h4>{props.heading}</h4>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default NotificationBox;
