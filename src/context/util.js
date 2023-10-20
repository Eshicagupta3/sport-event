export const removeSelectedEvent = (selctedEvent, eventId) => {
  return selctedEvent?.filter((event) => event.id !== eventId);
};
