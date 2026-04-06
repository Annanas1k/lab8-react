import { useState, useEffect } from "react";
import { getCache, setCache } from "../utils/cache";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    // AbortController ne permite să anulăm cererea dacă e nevoie
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const cached = getCache(url);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Eroare: ${response.status}`);
        }

        const json = await response.json();

        setCache(url, json);
        setData(json);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();

  }, [url]); 

  return { data, loading, error };
}

export default useFetch;