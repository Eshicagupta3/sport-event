import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React, { useReducer } from "react";
import AllEventsPage from ".";
import { ALL_EVENT_ROUTE } from "../../api/constants";
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
  // const dispatch = jest.fn();
  return (
    <EventFnContext.Provider value={{ dispatch }}>
      <EventContext.Provider value={eventData}>
        <AllEventsPage />
      </EventContext.Provider>
    </EventFnContext.Provider>
  );
};

describe("Render All Event Page", () => {
  it("show page Loader", () => {
    render(<Component />);
    expect(screen.getByTestId("page-loader")).toBeInTheDocument();
  });
  // it("show error screen", () => {
  //   jest.mock("../../hook/useFetch", () => ({
  //     __esModule: true,
  //     default: { loading: false, pageError: true },
  //   }));
  //   render(<Component />);
  //   expect(screen.getByTestId("page-error")).toBeInTheDocument();
  // });
  it("show event card data", async () => {
    server.listen();
    render(<Component />);
    server.close();

    await waitFor(async () => {
      const items = screen.getAllByTestId("event-card");
      expect(items.length).toBe(10);
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
      expect(items.length).toBe(10);
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
