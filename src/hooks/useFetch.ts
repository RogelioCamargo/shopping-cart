import { useState, useCallback, useEffect } from "react";

interface FetchResult {
	data: null | Array<unknown>;
	loading: boolean;
	error: string;
}

const useFetch = (url: string): FetchResult => {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// we added fetchData in our dependency array of useEffect so in order to
	// avoid an infinite loop, we use useCallback so the function is only
	// recreated when there is a new url
	const fetchData = useCallback(async () => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			setResult(data);
			setLoading(false);
		} catch (error) {
			if (error instanceof Error) setError(error.message);
			else setError(error as string);
			setLoading(false);
		}
	}, [url]);

	useEffect(() => {
		fetchData();
	}, [url, fetchData]);

	return { data: result, loading, error };
};

export default useFetch;
