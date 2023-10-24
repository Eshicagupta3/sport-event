import React, { useMemo, useReducer } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/header";
import { ToastProvider } from "../hook/useToast";
import { EventContext, EventFnContext, INITIAL_DATA } from "../context";
import { eventReducer } from "../context/action";
import "./page.css";

const PageLayout = () => {
  const [eventData, dispatch] = useReducer(eventReducer, INITIAL_DATA);
  const location = useLocation();
  const path = location.pathname;
  const storeFnValue = useMemo(() => {
    // MORE FUNCTION CAN POSSIBLE, AS APP GROWS LIKE SNACKBAR
    return {
      dispatch,
    };
  }, [dispatch]);
  const storeValue = useMemo(() => {
    return eventData;
  }, [eventData]);
  return (
    <main className="sports-layout">
      <header className="sport-header">
        <section className="header-profile">
          <div className="profile-img"></div>
          <div className="profile-name">Isha</div>
        </section>
        <Header path={path} />
      </header>
      <section className="sport-events">
        <ToastProvider>
          <EventFnContext.Provider value={storeFnValue}>
            <EventContext.Provider value={storeValue}>
              <Outlet />
            </EventContext.Provider>
          </EventFnContext.Provider>
        </ToastProvider>
      </section>
    </main>
  );
};

export default PageLayout;
