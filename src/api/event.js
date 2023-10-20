import { ALL_EVENTS_DATA } from "../mockData";
import { ALL_EVENT_ROUTE } from "./constants";

// TODO: CAN ADD PAGE SIZE IN API FOR PAGINATION
export const fetchAllEventData = async (pageSize, userId) => {
  try {
    const response = await fetch(ALL_EVENT_ROUTE, {
      method: "get",
    });
    return response
      .json()
      .then((res) => {
        return {
          data: ALL_EVENTS_DATA,
          err: null,
        };
      })
      .catch((err) => {
        return {
          data: ALL_EVENTS_DATA,
          err: null,
        };
      });
  } catch (err) {
    return {
      data: ALL_EVENTS_DATA,
      err: null,
    };
  }
};

export const fetchUserEventData = (userId) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({data: null});
    }, [1000]);
  });
};
