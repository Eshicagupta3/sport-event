import { useCallback, useContext, useEffect, useState } from "react";
import { EventFnContext } from "../context";
const useFetch = ({ apiFn, payload, action }) => {
  const { dispatch } = useContext(EventFnContext);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, err } = await apiFn(payload);
    console.log(data,"data")
    if (err) {
      setPageError("Error in Loading. Please Try Again");
      return;
    }
    data && dispatch && dispatch({ type: action, payload: data });
    setLoading(false);
  }, [apiFn, payload, action, dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return {
    loading,
    pageError,
    // pageData,
  };
};
export default useFetch;
