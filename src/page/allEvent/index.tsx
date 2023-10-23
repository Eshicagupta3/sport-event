import React from "react";
import { fetchAllEventData } from "../../api/event";
import PageLoader from "../../components/pageLoader";
import { UPDATE_ALL_EVENT } from "../../context/action";
import useFetch from "../../hook/useFetch";
import Events from "./Event";

const AllEventsPage = () => {
  const { loading, pageError, fetchData } = useFetch({
    apiFn: fetchAllEventData,
    action: UPDATE_ALL_EVENT,
  });
  if (pageError) {
    return (
      <div test-id="page-error" className="page-error">
        {pageError}
        <button onClick={fetchData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }
  if (loading) {
    return <PageLoader />;
  }
  return <Events />;
};

export default AllEventsPage;
