import {forwardRef, FunctionComponent} from "react";
import {Checkbox} from "@mantine/core";
import './IndeterminateCheckbox.css';

export const IndeterminateCheckbox: FunctionComponent = forwardRef(
	// @ts-ignore
	({indeterminate, ...rest}, ref) => {

		return (
			<Checkbox
				// @ts-ignore
				indeterminate={indeterminate}
				className={`checkbox`}
				transitionDuration={0}
				size={'xs'}
				{...rest}
			/>
		);
	});
