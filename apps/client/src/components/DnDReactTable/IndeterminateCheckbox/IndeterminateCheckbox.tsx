import {forwardRef, FunctionComponent, useEffect, useRef} from "react";
import {Checkbox} from "@mantine/core";

export const IndeterminateCheckbox: FunctionComponent = forwardRef(
	// @ts-ignore
	({indeterminate, ...rest}, ref) => {
		const defaultRef = useRef(null);
		const resolvedRef = ref || defaultRef;

		useEffect(() => {
			// @ts-ignore
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return (
			<Checkbox
				transitionDuration={0}
				size={'xs'}
				ml={"0.2rem"}
				styles={{input: {cursor: "pointer"}}}
				// @ts-ignore
				ref={resolvedRef}
				{...rest}
			/>
		);
	});
