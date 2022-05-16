import {FunctionComponent} from "react";
import {Checkbox} from "@mantine/core";
import "./IndeterminateCheckbox.css";

export const IndeterminateCheckbox: FunctionComponent<{ indeterminate: boolean }> =
	({indeterminate, ...rest}) =>
		(
			<Checkbox
				// @ts-ignore
				indeterminate={indeterminate}
				className={`checkbox`}
				transitionDuration={0}
				size={"xs"}
				{...rest}
			/>
		);

