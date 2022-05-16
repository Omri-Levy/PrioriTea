import {useMutation, useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";
import {AuthApi} from "../../../../../api/auth-api/auth-api";
import {ISignInForm} from "../../interfaces";

export const useSignInMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(
		async ({email, password}: ISignInForm) =>
			AuthApi.signIn(email, password)
		,
		{
			onSuccess({data}) {
				const {user} = data?.data ?? {};

				queryClient.setQueryData(["userInfo"], user);

				navigate("/", {replace: true});
			},
			onSettled() {
				queryClient.invalidateQueries(["userInfo"]);
			},
		}
	);
};
