import React from "react";
import { fetchUserEventData } from "../../api/event";
import PageLoader from "../../components/pageLoader";
import { UPDATE_SELCTED_EVENT } from "../../context/action";
import useFetch from "../../hook/useFetch";
import UserEvents from "./UserEvent";

const UserEventsPage = () => {
  const { loading, pageError, fetchData } = useFetch({
    apiFn: fetchUserEventData,
    action: UPDATE_SELCTED_EVENT,
  });
  if (pageError) {
    return (
      <div test-id="page-error" className="page-error">
        <div className="">{pageError}</div> 
        <button onClick={fetchData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }
  if (loading) {
    return <PageLoader />;
  }
  return <UserEvents />;
};

export default UserEventsPage;
