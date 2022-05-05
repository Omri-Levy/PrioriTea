import {useMutation, useQueryClient} from "react-query";
import {AuthApi} from "../../../../../api/auth-api";
import {ISignInForm} from "../../interfaces";

type AsyncTimeout = {
	(ms: number): Promise<unknown>;
	<TPayload,>(ms: number, payload: TPayload): Promise<TPayload>;
}

export const asyncTimeout: AsyncTimeout = async (ms = 0, payload?: any)  =>
	new Promise((resolve) => setTimeout(() => resolve(payload)
		, ms)
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
