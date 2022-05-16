import { useUserInfoQuery } from "../useUserInfoQuery/useUserInfoQuery";

export const useIsAuth = () => !!useUserInfoQuery().data;
