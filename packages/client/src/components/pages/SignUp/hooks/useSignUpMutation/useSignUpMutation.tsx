import {useMutation} from "react-query";
import {AuthApi} from "../../../../../api/auth-api/auth-api";
import {ISignUpForm} from "../../interfaces";

export const useSignUpMutation = () =>
	useMutation(
		async ({
				   email,
				   name,
				   password,
				   passwordConfirmation,
			   }: ISignUpForm) =>
			AuthApi.signUp(email, name, password, passwordConfirmation)
	);

