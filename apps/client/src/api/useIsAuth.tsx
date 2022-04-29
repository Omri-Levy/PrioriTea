import { useUserInfoQuery } from "./useUserInfoQuery";


export const useIsAuth = () => {
  const { data } = useUserInfoQuery();

  return !!data;
};
