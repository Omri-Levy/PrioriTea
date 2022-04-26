import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { AuthenticatedLayout } from "../AuthenticatedLayout/AuthenticatedLayout";
import { Section } from "../Section/Section";
import { UnauthenticatedLayout } from "../UnauthenticatedLayout/UnauthenticatedLayout";
import { useRoutes } from "./useRoutes";

export const Router = () => {
  const routes = useRoutes();
  const { isSignedIn } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            isSignedIn ? <AuthenticatedLayout /> : <UnauthenticatedLayout />
          }
        >
          {routes.map(function ({ path, element, text }) {
            return (
              <Route
                index={path === "/"}
                key={`${path}-route`}
                path={path}
                element={<Section title={text}>{element}</Section>}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
