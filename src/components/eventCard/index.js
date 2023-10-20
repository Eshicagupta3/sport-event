import React, { useCallback } from "react";
import "./style.css";
import { getTimeFormat } from "./util";

const EventCard = React.memo(
  ({
    title,
    category,
    startTime,
    endTime,
    btnText,
    onEventClick,
    isEventSelected = false,
    isEventDisable = false,
    eventId,
  }) => {
    const onBtnClick = useCallback(() => {
      onEventClick(eventId);
    }, [onEventClick, eventId]);
    const sTime = getTimeFormat(startTime);
    const eTime = getTimeFormat(endTime);

    return (
      <li
        data-testid="event-card"
        className={`event-card ${isEventSelected ? "card-selected" : ""}`}
      >
        <p className="card-title">{category}</p>
        <p className="card-subtitle">{title}</p>
        <time className="card-starttime time"> {sTime} </time>
        <time className="card-endtime time"> {eTime}</time>

        <button
          data-testid="card-btn"
          className={`card-btn ${isEventDisable ? "disable-btn" : "active"}`}
          onClick={onBtnClick}
        >
          {btnText}
        </button>
      </li>
    );
  }
);

export default EventCard;
