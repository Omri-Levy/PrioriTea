import { Alert } from "@mantine/core";
import { FunctionComponent } from "react";
import { AlertCircle } from "tabler-icons-react";
import { ErrorAlertProps } from "./interfaces";

export const ErrorAlert: FunctionComponent<ErrorAlertProps> = ({
  title,
  children,
}) => {
  return (
    <Alert
      color="red"
      icon={<AlertCircle size={16} />}
      variant="outline"
      title={title}
      mb={10}
    >
      {children}
    </Alert>
  );
};
