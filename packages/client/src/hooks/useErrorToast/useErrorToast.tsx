import {showNotification} from "@mantine/notifications";
import {AlertCircle} from "tabler-icons-react";

export const useErrorToast = () => (message: string) =>
	showNotification({
		icon: <AlertCircle size={24}
		/>,
		title: "Error",
		// @ts-ignore
		message,
	})
;
