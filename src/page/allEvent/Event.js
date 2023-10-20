import React, { useCallback, useContext, useMemo } from "react";
import EventCard from "../../components/eventCard";
import { MAX_EVENT_THRESHOLD } from "../../components/eventCard/constants";
import { eventClash, userEventExist } from "../../components/eventCard/util";
import { EventContext, EventFnContext } from "../../context";
import { REMOVE_EVENT, SELECT_EVENT } from "../../context/action";

const SingleEvent = React.memo(
  ({ event, selectedEvents, onRemoveEventClick }) => {
    const { dispatch } = useContext(EventFnContext);
    const onEventClick = useCallback(() => {
      console.log("event click",event)
      dispatch({
        type: SELECT_EVENT,
        payload: event,
      });
    }, [dispatch, event]);
    const isEventSelected = userEventExist(event.id, selectedEvents);
    const isEventDisable = useMemo(() => {
      return (
        !isEventSelected &&
        (selectedEvents.length === MAX_EVENT_THRESHOLD ||
          eventClash(event.start_time, event.end_time, selectedEvents))
      );
    }, [selectedEvents, event, isEventSelected]);
    const btnText = isEventSelected ? "REMOVE" : "SELECT";
    return (
      <EventCard
        eventId={event.id}
        title={event.event_name}
        category={event.event_category}
        startTime={event.start_time}
        endTime={event.end_time}
        key={event.id}
        btnText={btnText}
        isEventDisable={isEventDisable}
        isEventSelected={isEventSelected}
        onEventClick={isEventSelected ? onRemoveEventClick : onEventClick}
      />
    );
  }
);

const Events = () => {
  const { allEvents, selectedEvents } = useContext(EventContext);
  const { dispatch } = useContext(EventFnContext);
  const onRemoveEventClick = useCallback(
    (eventId) => {
      dispatch({
        type: REMOVE_EVENT,
        payload: eventId,
      });
    },
    [dispatch]
  );
  return (
    <ul className="allevents-container">
      {allEvents?.map((event) => (
        <SingleEvent
          key={event.id}
          event={event}
          selectedEvents={selectedEvents}
          onRemoveEventClick={onRemoveEventClick}
        />
      ))}
    </ul>
  );
};

export default Events;
