import { Link } from "react-router-dom";

export const Header = ({ path }) => (
    <section className="header-tabs">
      <Link
        data-testid="event-tab"
        to="/"
        className={`${path === "/" ? "active" : ""}`}
      >
        Events
      </Link>
      <Link
        data-testid="myevent-tab"
        to="/my-events"
        className={`${path === "/my-events" ? "active" : ""}`}
      >
        My Events
      </Link>
    </section>
  );