import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Header/Header";
import { useRoutes } from "./useRoutes";

export const Router = () => {
  const routes = useRoutes();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(function ({ path, element }) {
          return <Route path={path} element={element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};
