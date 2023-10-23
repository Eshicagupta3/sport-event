import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_EVENTS_ROUTE, HOME_ROUTE, MY_EVENT_ROUTE } from "../../constants";
import './style.css';
const RuleModal = React.lazy(() => import("../modal/Rule"));

export const Header = ({ path }: {path: string}) => {
  const [show, setShow] = useState(false);
  const onRuleClick = () => {
    setShow((data) => !data);
  };
  return (
    <section className="header-tabs">
      <Link
        data-testid="home-tab"
        to={HOME_ROUTE}
        className={`${path === HOME_ROUTE ? "active" : ""}`}
      >
        Home
      </Link>
      <Link
        data-testid="allevent-tab"
        to={ALL_EVENTS_ROUTE}
        className={`${path === ALL_EVENTS_ROUTE ? "active" : ""}`}
      >
        Events
      </Link>
      <Link
        data-testid="myevent-tab"
        to={MY_EVENT_ROUTE}
        className={`${path === MY_EVENT_ROUTE ? "active" : ""}`}
      >
        My Events
      </Link>
      <button onClick={onRuleClick} className="rule-tab">
        Rules
      </button>
      {show && (
        <Suspense>
          <RuleModal onClick={onRuleClick} />
        </Suspense>
      )}
    </section>
  );
};
