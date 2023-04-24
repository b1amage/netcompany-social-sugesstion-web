import { useState, useEffect } from "react";
import axios from "axios";
import testApi from "../api/testApi";

const useFetchData = (url, handler) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await handler();
      setData(response.data.results);
      setIsLoading(false);
    };

    fetchData();
  }, [url, handler]);

  return { data, error, isLoading };
};

export default useFetchData;
