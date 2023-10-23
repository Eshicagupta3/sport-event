import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React, { useReducer } from "react";
import AllEventsPage from ".";
import { ALL_EVENT_ROUTE } from "../../api/constants";
import { ToastProvider } from "../../components/snackbar/useToast";
import { EventContext, EventFnContext } from "../../context";
import { eventReducer } from "../../context/action";
import { ALL_EVENTS_DATA } from "../../mockData";

const server = setupServer(
  rest.get(ALL_EVENT_ROUTE, (req, res, ctx) => {
    return res(ctx.json(ALL_EVENTS_DATA));
  })
);

const Component = () => {
  const [eventData, dispatch] = useReducer(eventReducer, {
    allEvents: ALL_EVENTS_DATA,
    selectedEvents: [],
  });
  return (
    <ToastProvider>
      <EventFnContext.Provider value={{ dispatch }}>
        <EventContext.Provider value={eventData}>
          <AllEventsPage />
        </EventContext.Provider>
      </EventFnContext.Provider>
    </ToastProvider>
  );
};

describe("Render All Event Page", () => {
  it("show page Loader", () => {
    render(<Component />);
    expect(screen.getByTestId("page-loader")).toBeInTheDocument();
  });
  it("show event card data", async () => {
    server.listen();
    render(<Component />);
    server.close();

    await waitFor(async () => {
      const items = screen.getAllByTestId("event-card");
      expect(items.length).toBe(15);
    });
  });
});

describe("Select User Event", () => {
  it("User Event get Selected and Show Remove Button", async () => {
    server.listen();
    render(<Component />);
    server.close();
    await waitFor(async () => {
      const items = screen.getAllByTestId("event-card");
      expect(items.length).toBe(15);
    });
    const btn = screen.getAllByTestId("card-btn");
    if (btn.length) {
      fireEvent.click(btn[0]);
      fireEvent.click(btn[1]);
    }
    await waitFor(async () => {
      expect(screen.getAllByText("REMOVE")).toHaveLength(2);
    });
  });
});
