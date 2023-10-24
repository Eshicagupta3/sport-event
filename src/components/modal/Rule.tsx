import React from "react";
import "./style.css";
const RuleModal = () => {
  return (
    <ul aria-label="Sport Event Participation Rule" className="events-rule">
      <li>You can partipicate in 3 events</li>
      <li>Timing of selected events cannot clash </li>
    </ul>
  );
};

const Modal = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="rule-modal">
      <div className="card">
        <button
          onClick={onClick}
          aria-label="close rule modal"
          className="cross-button"
        >
          x
        </button>
        <RuleModal />
      </div>
    </div>
  );
};

export default Modal;
