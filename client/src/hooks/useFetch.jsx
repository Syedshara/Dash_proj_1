import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return useMemo(() => ({ data, loading, error }), [data, loading, error]);
};

useFetch.propTypes = {
    url: PropTypes.string.isRequired,
};

export default useFetch;
