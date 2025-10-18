import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dataFetching = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);


    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: Status:- ${error}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(
        `${error}`
      );
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    dataFetching();
  }, [dataFetching]);

  return { data, loading, error, setLoading };
};

export default useFetch;
