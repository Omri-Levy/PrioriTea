import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../../../../api/auth-api/auth-api";

export const useSignOutMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(async () => AuthApi.signOut(), {
		onSuccess() {
			queryClient.setQueryData(["userInfo"], undefined);

			navigate("/sign-in", { replace: true });
		},
		onSettled() {
			queryClient.invalidateQueries(["userInfo"]);
		},
	});
};
