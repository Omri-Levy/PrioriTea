import {Alert} from "@mantine/core";
import {FunctionComponent} from "react";
import {AlertCircle} from "tabler-icons-react";
import {ErrorAlertProps} from "./interfaces";
import "./ErrorAlert.css";

export const ErrorAlert: FunctionComponent<ErrorAlertProps> = ({
																   title,
																   children,
															   }) => (
	<Alert
		className={`error-alert`}
		color="red"
		icon={<AlertCircle size={16}/>}
		variant="outline"
		title={title}
	>
		{children}
	</Alert>
);
