import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ALL_EVENT_ROUTE } from "./api/constants";
import App from "./App";
import { ALL_EVENTS_DATA } from "./mockData";

// const server = setupServer(
//   rest.get(ALL_EVENT_ROUTE, (req, res, ctx) => {
//     return res(ctx.json(ALL_EVENTS_DATA));
//   })
// );

// describe("Test Select User Event", () => {
//   it("select user event and should appear on my events", async () => {
//     server.listen();
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );
//     server.close();
//     await waitFor(async () => {
//       const items = screen.getAllByTestId("event-card");
//       expect(items.length).toBe(10);
//     });
//     const btn = screen.getAllByTestId("card-btn");
//     if (btn.length) {
//       fireEvent.click(btn[0]);
//       fireEvent.click(btn[1]);
//     }
//     await waitFor(async () => {
//       expect(screen.getAllByText("REMOVE")).toHaveLength(2);
//     });
//     const myEventBtn = screen.getByTestId("myevent-tab");
//     fireEvent.click(myEventBtn);
//     await waitFor(async () => {
//       expect(screen.getAllByText("REMOVE")).toHaveLength(2);
//     });
//   });
// });
