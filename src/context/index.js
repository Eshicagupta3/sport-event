import React from 'react'

export const INITIAL_DATA = {
    allEvents: [],
    selectedEvents: [],
}
const EventContext = React.createContext(INITIAL_DATA);

const EventFnContext = React.createContext(null);

export {
    EventContext,
    EventFnContext
}