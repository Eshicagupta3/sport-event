import React, { useCallback, useContext, useMemo } from "react";
import EventCard from "../../components/eventCard";
import { eventClash, userEventExist } from "../../components/eventCard/util";
import { useToast } from "../../hook/useToast";
import {
  EVENT_ADDED_TEXT,
  EVENT_REMOVED_TEXT,
  EVENT_THRESHOLD_REACHED,
  MAX_EVENT_THRESHOLD,
} from "../../constants";
import { EventContext, EventFnContext } from "../../context";
import { REMOVE_EVENT, SELECT_EVENT } from "../../context/action";
import { SportEventType } from "../../type";

type SingleEventType = {
  event: SportEventType;
  selectedEvents: SportEventType[] | [];
  onRemoveEventClick: (arg: string) => void;
  toast: any;
  dispatch: React.Dispatch<{
    type: string;
    payload: SportEventType | string;
  }> | null;
  eventThresholdReached: boolean;
};
const SingleEvent = React.memo(
  ({
    event,
    selectedEvents,
    onRemoveEventClick,
    toast,
    dispatch,
    eventThresholdReached,
  }: SingleEventType) => {
    const isEventSelected = userEventExist(event.id, selectedEvents);
    const isEventDisable = useMemo(() => {
      return (
        !isEventSelected &&
        (eventThresholdReached ||
          eventClash(event.start_time, event.end_time, selectedEvents))
      );
    }, [selectedEvents, event, isEventSelected, eventThresholdReached]);
    const onEventClick = useCallback(() => {
      if (isEventDisable) {
        return;
      }
      dispatch &&
        dispatch({
          type: SELECT_EVENT,
          payload: event,
        });
       let toastText =  EVENT_ADDED_TEXT;
      if (selectedEvents.length === MAX_EVENT_THRESHOLD - 1) {
        toastText += '. ' + EVENT_THRESHOLD_REACHED
      }
      toast.info(toastText);
    }, [dispatch, event, isEventDisable, toast, selectedEvents.length]);

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
    (eventId: string) => {
      dispatch &&
        dispatch({
          type: REMOVE_EVENT,
          payload: eventId,
        });
      toast.info(EVENT_REMOVED_TEXT);
    },
    [dispatch, toast]
  );
  const eventThresholdReached = selectedEvents.length === MAX_EVENT_THRESHOLD;
  return (
    <ul className="allevents-container">
      {allEvents?.map((event) => (
        <SingleEvent
          key={event.id}
          event={event}
          toast={toast}
          dispatch={dispatch}
          selectedEvents={selectedEvents}
          eventThresholdReached={eventThresholdReached}
          onRemoveEventClick={onRemoveEventClick}
        />
      ))}
    </ul>
  );
};

export default Events;
