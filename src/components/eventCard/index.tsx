import React, { useCallback } from "react";
import "./style.css";
import { getTimeFormat } from "./util";

type EventCardType = {
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  btnText: string;
  eventId: string;
  onEventClick: (arg: string) => void;
  isEventSelected?: boolean;
  isEventDisable?: boolean;
};

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
  }: EventCardType) => {
    const onBtnClick = useCallback(() => {
      onEventClick(eventId);
    }, [onEventClick, eventId]);
    const sTime = getTimeFormat(startTime);
    const eTime = getTimeFormat(endTime);

    return (
      <li
        aria-label="Sport Event Details"
        data-testid="event-card"
        className={`event-card ${isEventSelected ? "card-selected" : ""}`}
      >
        <p className="card-title">{category}</p>
        <p className="card-subtitle">{title}</p>
        <div className="event-time">
          <div className="">Starting From</div>
          <time className="card-starttime time"> {sTime} </time>
          <div className="">Ending At</div>
          <time className="card-endtime time"> {eTime}</time>
        </div>

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
