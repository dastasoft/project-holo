import { useState, useEffect } from 'react';

const useFetchData = fetchFunction => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    const data = await fetchFunction();
    if (data.success) {
      setData(data.data.data);
    } else {
      setError(data.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [fetchFunction]);

  return [data, loading, error];
};

export default useFetchData;
