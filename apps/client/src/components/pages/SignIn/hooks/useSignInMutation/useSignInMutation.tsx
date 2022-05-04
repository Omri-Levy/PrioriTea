import {useMutation, useQueryClient} from "react-query";
import {AuthApi} from "../../../../../api/auth-api";
import {ISignInForm} from "../../interfaces";

export const asyncTimeout = async (ms = 0) =>
	new Promise((resolve) => setTimeout(resolve, ms)
	);

export const useSignInMutation = () => {
	const queryClient = useQueryClient();

  return useMutation(
    ["signUp"],
    async ({ email, password }: ISignInForm) => {
      return AuthApi.signIn(email, password);
    },
	  {
		  onSuccess: () => {
			  queryClient.invalidateQueries(['userInfo']);
		  }
	  }
  );
};
