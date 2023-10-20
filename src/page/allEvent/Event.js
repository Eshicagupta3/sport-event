import React, { useCallback, useContext, useMemo } from "react";
import EventCard from "../../components/eventCard";
import { MAX_EVENT_THRESHOLD } from "../../components/eventCard/constants";
import { eventClash, userEventExist } from "../../components/eventCard/util";
import { useToast } from "../../components/snackbar/useToast";
import { EventContext, EventFnContext } from "../../context";
import { REMOVE_EVENT, SELECT_EVENT } from "../../context/action";

const SingleEvent = React.memo(
  ({ event, selectedEvents, onRemoveEventClick, toast, dispatch }) => {
    const isEventSelected = userEventExist(event.id, selectedEvents);
    const isEventDisable = useMemo(() => {
      return (
        !isEventSelected &&
        (selectedEvents.length === MAX_EVENT_THRESHOLD ||
          eventClash(event.start_time, event.end_time, selectedEvents))
      );
    }, [selectedEvents, event, isEventSelected]);
    const onEventClick = useCallback(() => {
      if (isEventDisable) {
        return;
      }
      dispatch({
        type: SELECT_EVENT,
        payload: event,
      });
      toast.info(
        'Event Selected'
      );
    }, [dispatch, event, isEventDisable, toast]);

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
  const toast = useToast();
  const onRemoveEventClick = useCallback(
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
  return (
    <ul className="allevents-container">
      {allEvents?.map((event) => (
        <SingleEvent
          key={event.id}
          event={event}
          toast={toast}
          dispatch={dispatch}
          selectedEvents={selectedEvents}
          onRemoveEventClick={onRemoveEventClick}
        />
      ))}
    </ul>
  );
};

export default Events;
