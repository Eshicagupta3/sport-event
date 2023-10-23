import React from "react";
import { SportEventType } from "../type";

export const INITIAL_DATA = {
  allEvents: [],
  selectedEvents: [],
};

export type INITIAL_DATA_TYPE = {
  allEvents: SportEventType[] | [];
  selectedEvents: SportEventType[] | [];
};
const EventContext = React.createContext<INITIAL_DATA_TYPE>(INITIAL_DATA);

const INITIAL_FUN_DATA = {
  dispatch: null,
};

export type ContentFnType = {
  dispatch: React.Dispatch<{ type: string; payload: any }> | null;
};

const EventFnContext = React.createContext<ContentFnType>(INITIAL_FUN_DATA);

export { EventContext, EventFnContext };
