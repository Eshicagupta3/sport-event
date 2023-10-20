import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useReducer } from "react";
import { MemoryRouter } from "react-router-dom";
import UserEventsPage from ".";
import { EventContext, EventFnContext } from "../../context";
import { eventReducer } from "../../context/action";
import { ALL_EVENTS_DATA } from "../../mockData";
import { ALL_USER_EVENTS_DATA } from "../../mockData/userEvent";

jest.mock("../../api/event", () => ({
  __esModule: true,
  fetchUserEventData: () => ({ data: null }),
}));
const Component = () => {
  const [eventData, dispatch] = useReducer(eventReducer, {
    allEvents: ALL_EVENTS_DATA,
    selectedEvents: ALL_USER_EVENTS_DATA,
  });
  return (
    <MemoryRouter>
      <EventFnContext.Provider value={{ dispatch }}>
        <EventContext.Provider value={eventData}>
          <UserEventsPage />
        </EventContext.Provider>
      </EventFnContext.Provider>
    </MemoryRouter>
  );
};

describe("Render User Event Page", () => {
  it("show page Loader", () => {
    render(<Component />);
    expect(screen.getByTestId("page-loader")).toBeInTheDocument();
  });
  it("show user event card data", async () => {
    render(<Component />);
    await waitFor(async () => {
      const items = screen.getAllByTestId("event-card");
      expect(items.length).toBe(1);
    });
  });
});

describe("Remove User Event", () => {
  it("remove user event", async () => {
    render(<Component />);
    await waitFor(async () => {
      const items = screen.getAllByTestId("event-card");
      expect(items.length).toBe(1);
    });
    expect(screen.getByText("REMOVE")).toBeInTheDocument();
    const btns = screen.getAllByText("REMOVE");
    btns.forEach((btn)=>{
      fireEvent.click(btn);
    })
    await waitFor(async () => {
      expect(screen.getByTestId("all-event-btn")).toBeInTheDocument();

    });
  });
});
