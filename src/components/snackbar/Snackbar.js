import React from 'react';
import './style.css';

function Snackbar({
  id,
  message,
  type = 'success',
  action,
  actionTitle,
  actionBtn,
  icon,
  toastStyle = {},
  toastClass = '',
}) {
  return (
    <div
      className={`wrapper ${type} ${toastClass}`}
      style={toastStyle}
    >
      {icon && <div className={'icon'}>{icon}</div>}
      <span
        className="msg"
      >
        {message}
      </span>
      {actionTitle && (
        <button
          className={'actionBtn'}
          type="text"
          title={actionTitle}
          onClick={() => action(id)}
        />
      )}
      {actionBtn && <div className={'actionBtn'}>{actionBtn}</div>}
    </div>
  );
}

export default Snackbar;
