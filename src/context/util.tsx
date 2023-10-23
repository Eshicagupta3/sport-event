import { SportEventType } from "../type";

export const removeSelectedEvent = (selctedEvent: SportEventType[] | [], eventId: string) => {
  return selctedEvent?.filter((event) => event.id !== eventId);
};
