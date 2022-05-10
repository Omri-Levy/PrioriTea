import {useQuery} from "react-query";
import {AuthApi} from "../../../../../api/auth-api";
import {UserDto} from "@prioritea/types";


export const useUserInfoQuery = () => {

  return useQuery<UserDto,
    Error
  >(['userInfo'], async () => {
    const { data } = await AuthApi.getUserInfo();

    return data.data.user;
  }, {
    retry: 0,
  });
};
