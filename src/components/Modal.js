import React from 'react';
import ReactDOM from 'react-dom';
import history from "../history";

const renderStartMapGame = () => {
  return (
    // <div style={{ textAlign: "right" }}>
    <button
      onClick={() => history.push("/shapesgameboardmap")}
      className="ui button primary"
    >
      Start Map Game
    </button>
    // </div>
  );
};
const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
