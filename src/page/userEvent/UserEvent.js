import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/eventCard";
import { useToast } from "../../components/snackbar/useToast";
import { EventContext, EventFnContext } from "../../context";
import { REMOVE_EVENT } from "../../context/action";

const UserEvents = () => {
  const { selectedEvents } = useContext(EventContext);
  const { dispatch } = useContext(EventFnContext);
  const toast = useToast();
  const onEventClick = useCallback(
    (eventId) => {
      dispatch({
        type: REMOVE_EVENT,
        payload: eventId,
      });
      toast.info(
        'Event Removed From Selected Events'
      );
    },
    [dispatch, toast]
  );
  if (!selectedEvents || selectedEvents.length === 0) {
    return (
      <div className="no-userEvent">
        <button data-testid="all-event-btn" className="allevent">
          <Link to="/">Go All Events</Link>
        </button>
      </div>
    );
  }
  return (
    <ul className="allevents-container">
      {selectedEvents?.map((event) => (
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
