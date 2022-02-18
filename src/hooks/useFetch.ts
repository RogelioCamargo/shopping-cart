import { useState, useCallback, useEffect } from "react";

interface FetchResult {
	data: null | unknown | Array<unknown>;
	loading: boolean;
	error: null | string;
}

// useFetch hook takes heavy inspiration from Apollos's GraphQL useQuery hook
// like the useQuery hook, it abstracts the fetching of data and simply
// returns an object containing the data, loading state, and error message
const useFetch = (url: string): FetchResult => {
	const [result, setResult] = useState<null | unknown | unknown[]>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<null | string>(null);

	// we added fetchData in our dependency array of useEffect
	// in order to avoid an infinite loop, we use useCallback
	// so the function is only recreated when there is a new url
	const fetchData = useCallback(async () => {
		try {
			const response = await fetch(url);
			if (!response.ok)
				throw new Error(
					`${response.status} - ${response.statusText || "Error"}`
				);
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
