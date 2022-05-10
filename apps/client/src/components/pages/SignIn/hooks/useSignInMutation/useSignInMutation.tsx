import {useMutation, useQueryClient} from "react-query";
import {AuthApi} from "../../../../../api/auth-api";
import {ISignInForm} from "../../interfaces";
import {useNavigate} from "react-router-dom";

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
	const navigate = useNavigate();

  return useMutation(
    async ({ email, password }: ISignInForm) => {
      return AuthApi.signIn(email, password);
    },
	  {
		  onSuccess() {
			  queryClient.invalidateQueries(['userInfo']);

			  navigate("/", { replace: true });
		  }
	  }
  );
};
