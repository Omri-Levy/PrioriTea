import {useQuery, useQueryClient} from "react-query";
import {AuthApi} from "../../../../../api/auth-api";
import {UserDto} from "@prioritea/types";


export const useUserInfoQuery = () => {
	const queryClient = useQueryClient();

  return useQuery<UserDto,
    Error
  >(['userInfo'], async () => {
    const { data } = await AuthApi.getUserInfo();

    return data.data.user;
  }, {
    retry: 0,
	  onError() {
		queryClient.setQueryData(['userInfo'], undefined);
	  }
  });
};
