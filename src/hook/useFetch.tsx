import { useCallback, useContext, useEffect, useState } from "react";
import { EventFnContext } from "../context";

type UseFetchType =  {
  apiFn: (arg1: any) => Promise<any>,
  payload?: any,
  action: string
}

const useFetch = ({ apiFn, payload, action }: UseFetchType) => {
  const { dispatch } = useContext(EventFnContext);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<boolean|string>(false);
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, err } = await apiFn(payload);
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
    fetchData,
  };
};
export default useFetch;
