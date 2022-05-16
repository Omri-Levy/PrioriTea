import { FunctionComponent } from "react";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FieldErrorProps } from "./interfaces";

export const FieldError: FunctionComponent<FieldErrorProps> = ({ field }) => {
	if (!field) {
		return null;
	}

	return <ErrorAlert>{field.message}</ErrorAlert>;
};
