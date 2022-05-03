import { useQuery } from "react-query";
import { AuthApi } from "../../../../../api/auth-api";


export const useUserInfoQuery = () => {

  return useQuery<{
    email: string;
    name: string;
  },
    Error
  >(['userInfo'], async () => {
    const { data } = await AuthApi.getUserInfo();

    return data.data.user;
  }, {
    retry: 0,
  });
};
