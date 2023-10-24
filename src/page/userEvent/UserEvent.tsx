import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/eventCard";
import { useToast } from "../../hook/useToast";
import { ALL_EVENTS_ROUTE, EVENT_REMOVED_TEXT } from "../../constants";
import { EventContext, EventFnContext } from "../../context";
import { REMOVE_EVENT } from "../../context/action";
import { SportEventType } from "../../type";

const UserEvents = () => {
  const { selectedEvents } = useContext(EventContext);
  const { dispatch } = useContext(EventFnContext);
  const toast = useToast();
  const onEventClick = useCallback(
    (eventId: string) => {
      dispatch && dispatch({
        type: REMOVE_EVENT,
        payload: eventId,
      });
      toast.info(
        EVENT_REMOVED_TEXT
      );
    },
    [dispatch, toast]
  );
  if (!selectedEvents || selectedEvents.length === 0) {
    return (
      <div className="no-userEvent">
        <button data-testid="all-event-btn" className="allevent">
          <Link to={ALL_EVENTS_ROUTE}>Go All Events</Link>
        </button>
      </div>
    );
  }
  return (
    <ul className="allevents-container">
      {selectedEvents?.map((event: SportEventType) => (
        <EventCard
          key={event.id}
          eventId={event.id}
          title={event.event_name}
          category={event.event_category}
          startTime={event.start_time}
          endTime={event.end_time}
          btnText={"REMOVE"}
          isEventSelected
          onEventClick={onEventClick}
        />
      ))}
    </ul>
  );
};

export default UserEvents;
