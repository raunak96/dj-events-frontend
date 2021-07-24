import { useEffect, useRef } from "react";

const useIntersectionObserver = ({
	onIntersection,
	isLoading = false,
	hasMore = true,
}) => {
	const observerRef = useRef();

	useEffect(() => {
		if (!observerRef.current || isLoading) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && hasMore) {
					onIntersection();
				}
			},
			{ threshold: 0.5 }
		);
		observer.observe(observerRef.current);
		return () => {
			observer.disconnect();
		};
	}, [hasMore, isLoading, onIntersection]);

	return observerRef;
};

export default useIntersectionObserver;
