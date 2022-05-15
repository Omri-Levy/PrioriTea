import {useEffect} from "react";
import {useIsMountedRef} from "../useIsMountedRef/useIsMountedRef";

export const useIsMounted = () => {
	const isMounted = useIsMountedRef();

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return isMounted;
};
