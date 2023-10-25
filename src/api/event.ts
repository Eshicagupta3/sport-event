import { ALL_EVENTS_DATA } from "../mockData";
import { ALL_EVENT_ROUTE } from "./constants";

function timeoutPromise(
  ms: number,
  promise: Promise<Response>
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("promise timeout"));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

// TODO: CAN ADD PAGE SIZE IN API FOR PAGINATION
export const fetchAllEventData = async (pageSize?: string, userId?: string) => {
  try {
    const response = await timeoutPromise(
      4000,
      fetch(ALL_EVENT_ROUTE, {
        method: "get",
      })
    );
    return response
      .json()
      .then((res) => {
        return {
          data: ALL_EVENTS_DATA,
          err: null,
        };
      })    // PASS DUMMY DATA, THIS API ROUTE IS NOT WORKING
      .catch((err) => {
        return {
          data: ALL_EVENTS_DATA,
          err: null,
        };
      });
  } catch (err) {

    return {
      data: null,
      err: err,
    };
  }
};

export const fetchUserEventData = (userId?: string) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ data: null });
    }, 1000);
  });
};
