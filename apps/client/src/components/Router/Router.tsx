import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useIsAuth } from "../../api/useIsAuth";
import { AuthenticatedLayout } from "../AuthenticatedLayout/AuthenticatedLayout";
import { Section } from "../Section/Section";
import { UnauthenticatedLayout } from "../UnauthenticatedLayout/UnauthenticatedLayout";
import { useRoutes } from "./useRoutes";

export const Router = () => {
  const routes = useRoutes();
  const isAuth = useIsAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            isAuth ? <AuthenticatedLayout /> : <UnauthenticatedLayout />
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
