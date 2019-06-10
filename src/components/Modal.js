import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  const modalHTML = (
    <div
      onClick={props.onDismiss}
      className="ui dimmer modals visibile active "
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.header}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalHTML, document.querySelector("#modal"));
};

export default Modal;
