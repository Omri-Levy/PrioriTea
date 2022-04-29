import { useMutation } from "react-query";
import { AuthApi } from "../../../../../api/auth-api";
import { ISignInForm } from "../../interfaces";

export const useSignInMutation = () => {
  return useMutation(
    ["signUp"],
    async ({ email, password }: ISignInForm) => {
      return AuthApi.signIn(email, password);
    }
  );
};
