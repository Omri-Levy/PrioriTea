import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { AuthApi } from "../../../api/auth-api";

export const Profile: FunctionComponent = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentFullName, setCurrentFullName] = useState("");
  const fetchCurrentUser = useCallback(async () => {
    const { data } = await AuthApi.getUserInfo();

    setCurrentEmail(data?.user?.email);
    setCurrentFullName(data?.user?.fullName);
  }, []);

  useEffect(() => {
    fetchCurrentUser()
      .then()
      .catch((err) => console.error(err));
  }, [fetchCurrentUser]);

  return (
      <div className="form-container">
        <div className="form-label">Email: {currentEmail}</div>
        <div className="form-label">Full Name: {currentFullName}</div>
      </div>
  );
};
