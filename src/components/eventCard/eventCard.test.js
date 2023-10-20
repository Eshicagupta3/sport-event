import React from "react";
import { render, screen } from "@testing-library/react";
import EventCard from ".";
import { ALL_EVENTS_DATA } from "../../mockData";
import { eventClash, getTimeFormat } from "./util";
const event = ALL_EVENTS_DATA[0];

describe("Time Format", () => {
  it("should render empty string", () => {
    expect(getTimeFormat("")).toBe("");
  });
  it("should render correct format", () => {
    expect(getTimeFormat("2022-12-17 16:00:00")).toBe("17 Dec 2022,16:00");
  });
});

describe("Event Clashes", () => {
  it("Event Time not Clashes when empty", () => {
    expect(eventClash("", "")).toBe(false);
    expect(eventClash("", "")).toBe(false);
    expect(eventClash("2022-12-17 16:00:00", "2022-12-17 16:00:00", [])).toBe(
      false
    );
  });
  it("Event Time Clashes when empty", () => {
    expect(
      eventClash("2022-12-17 16:00:00", "2022-12-17 17:00:00", [
        {
          start_time: "2022-12-17 17:00:00",
          end_time: "2022-12-17 18:00:00",
        },
      ])
    ).toBe(true);
    expect(
        eventClash("2022-12-17 16:00:00", "2022-12-17 17:00:00", [
          {
            start_time: "2022-12-17 14:00:00",
            end_time: "2022-12-17 16:00:00",
          },
        ])
      ).toBe(true);
      expect(
        eventClash("2022-12-17 16:00:00", "2022-12-17 17:00:00", [
          {
            start_time: "2022-12-17 16:00:00",
            end_time: "2022-12-17 17:00:00",
          },
        ])
      ).toBe(true);
  });
  it("Event Time not  Clashes", () => {
    expect(
        eventClash("2022-12-17 16:00:00", "2022-12-17 17:00:00", [
          {
            start_time: "2022-12-17 14:00:00",
            end_time: "2022-12-17 15:00:00",
          },
        ])
      ).toBe(false);
      expect(
        eventClash("2022-12-17 16:00:00", "2022-12-17 17:00:00", [
          {
            start_time: "2022-12-17 18:00:00",
            end_time: "2022-12-17 20:00:00",
          },
        ])
      ).toBe(false);
  });
});

describe("Render Event Card", () => {
  const onClick = jest.fn;
  it("Card Details Should Render", () => {
    render(
      <EventCard
        eventId={event.id}
        title={event.event_name}
        category={event.event_category}
        startTime={event.start_time}
        endTime={event.end_time}
        btnText={"Remove"}
        onEventClick={onClick}
      />
    );
    expect(screen.getByText("Swimming")).toBeInTheDocument();
    expect(screen.getByText("Butterfly 100M")).toBeInTheDocument();
    expect(screen.getByText("17 Dec 2022,13:00")).toBeInTheDocument();
    expect(screen.getByText("17 Dec 2022,16:00")).toBeInTheDocument();
  });
});
