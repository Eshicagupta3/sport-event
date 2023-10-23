import { INITIAL_DATA } from ".";
import { removeSelectedEvent } from "./util";

export const UPDATE_ALL_EVENT = "update_all_event";
export const UPDATE_SELCTED_EVENT = "update_selcted_event";
export const SELECT_EVENT = "select_event";
export const REMOVE_EVENT = "remove_event";

export const eventReducer = (
  state: any,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case UPDATE_ALL_EVENT: {
      return { ...state, allEvents: action.payload };
    }
    case UPDATE_SELCTED_EVENT: {
      return { ...state, selectedEvents: action.payload };
    }
    case SELECT_EVENT: {
      return {
        ...state,
        selectedEvents: [...state.selectedEvents, action.payload],
      };
    }
    case REMOVE_EVENT: {
      const newSelctedEvent = removeSelectedEvent(
        state.selectedEvents,
        action.payload
      );
      return { ...state, selectedEvents: newSelctedEvent };
    }
    default:
      return INITIAL_DATA;
  }
};
