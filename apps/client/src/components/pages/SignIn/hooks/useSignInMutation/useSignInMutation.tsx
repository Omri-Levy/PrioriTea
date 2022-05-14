import {useMutation, useQueryClient} from "react-query";
import {AuthApi} from "../../../../../api/auth-api/auth-api";
import {ISignInForm} from "../../interfaces";
import {useNavigate} from "react-router-dom";

export const useSignInMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(
		async ({email, password}: ISignInForm) => {
			return AuthApi.signIn(email, password);
		},
		{
			onSuccess({data}) {
				const {user} = data?.data;

				queryClient.setQueryData(['userInfo'], user)

				navigate("/", {replace: true});
			},
			onSettled() {
				queryClient.invalidateQueries(['userInfo']);
			}
		}
	);
};
