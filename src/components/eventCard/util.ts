import { SportEventType } from "../../type";

export const userEventExist = (
  eventId: string,
  selectedEvents: SportEventType[] | []
) => {
  return (
    selectedEvents.findIndex((event: SportEventType) => event.id === eventId) >=
    0
  );
};

export const eventClash = (
  startTime: string,
  endTime: string,
  selectedEvents: SportEventType[] | []
) => {
  if (!startTime || !endTime || selectedEvents.length === 0) {
    return false;
  }
  let isClash = false;
  const sTime = new Date(startTime).getTime();
  const eTime = new Date(endTime).getTime();
  for (let eIdx = 0; eIdx < selectedEvents.length; eIdx++) {
    const event = selectedEvents[eIdx];
    if (!event.start_time || !event.end_time) {
      continue;
    }
    const eventSTime = new Date(event.start_time).getTime();
    const eventETime = new Date(event.end_time).getTime();
    if (!(eventSTime > eTime || eventETime < sTime)) {
      isClash = true;
      break;
    }
  }
  return isClash;
};

export const getTimeFormat = (time: string) => {
  if (!time) {
    return "";
  }
  const date = new Date(time);
  const hrs = date.getHours();
  let min: string | number = date.getMinutes();
  min = min < 10 ? "0" + min : min.toString();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.toLocaleString("default", { weekday: "short" });
  return (
    day +
    " " +
    date.getDate() +
    " " +
    month +
    " " +
    date.getFullYear() +
    " at " +
    hrs +
    ":" +
    min
  );
};
