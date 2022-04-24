import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { fetchFn } from "../../../static/js/requests/fetch-fn/fetch-fn";

export const Profile: FunctionComponent = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentFullName, setCurrentFullName] = useState("");
  const fetchCurrentUser = useCallback(async () => {
    const getCurrentUserUrl = `${process.env.REACT_APP_API}/get-current-user`;
    const getCurrentUserOptions = {
      method: "POST",
      credentials: "include",
    };
    const { data } = await fetchFn(getCurrentUserUrl, getCurrentUserOptions);

    setCurrentEmail(data.email);
    setCurrentFullName(data.fullName);
  }, []);

  useEffect(() => {
    fetchCurrentUser()
      .then()
      .catch((err) => console.error(err));
  }, [fetchCurrentUser]);

  return (
    <main className="body-container">
      <div className="form-container">
        <div className="form-label">Email: {currentEmail}</div>
        <div className="form-label">Full Name: {currentFullName}</div>
      </div>
    </main>
  );
};
