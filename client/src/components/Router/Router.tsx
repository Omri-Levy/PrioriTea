import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { Header } from "../Header/Header";
import { Home } from "../pages/Home/Home";
import { Profile } from "../pages/Profile/Profile";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";

export const Router = () => {
  const { isSignedIn } = useAuthContext();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {isSignedIn && <Route path="/" element={<Home />} />}
        {isSignedIn && <Route path="/profile" element={<Profile />} />}
        {!isSignedIn && <Route path="/sign-in" element={<SignIn />} />}
        {!isSignedIn && <Route path="/sign-up" element={<SignUp />} />}
      </Routes>
    </BrowserRouter>
  );
};
