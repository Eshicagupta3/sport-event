import React from "react";
import "./style.css";

type SnackbarType = {
  id: string;
  message: string;
  type?: string;
  action: (arg: string)=>void;
  actionTitle: string;
  actionBtn: string;
  icon?: string;
  toastStyle?: { [key: string]: string };
  toastClass?: string;
};

function Snackbar({
  id,
  message,
  type = "success",
  action,
  actionTitle,
  actionBtn,
  icon,
  toastStyle = {},
  toastClass = "",
}: SnackbarType) {
  return (
    <div className={`wrapper ${type} ${toastClass}`} style={toastStyle}>
      {icon && <div className={"icon"}>{icon}</div>}
      <span role="alert" aria-label={message} className="msg">{message}</span>
      {actionTitle && (
        <button
          className={"actionBtn"}
          title={actionTitle}
          onClick={() => action(id)}
        />
      )}
      {actionBtn && <div className={"actionBtn"}>{actionBtn}</div>}
    </div>
  );
}

export default Snackbar;
