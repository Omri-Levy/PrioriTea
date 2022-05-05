import {useMutation} from "react-query";
import {AuthApi} from "../../../../../api/auth-api";
import {ISignUpForm} from "../../interfaces";

export const useSignUpMutation = () => {
  return useMutation(
    ["signUp"],
    async (
		{ email, name, password, passwordConfirmation }: ISignUpForm
	) => {
      return AuthApi.signUp(email, name, password, passwordConfirmation);
    }
  );
};
