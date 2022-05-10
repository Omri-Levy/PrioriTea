import {useUserInfoQuery} from "../useUserInfoQuery/useUserInfoQuery";

export const useIsAuth = () => {
  const { data } = useUserInfoQuery();

  return !!data;
};
