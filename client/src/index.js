import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import EmployeeSearch from "./Pages/EmployeeSearch";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import MissingEmployees from "./Pages/MissingEmployees";
import DivisionList from "./Pages/DivisionList";
import DivisionUpdater from "./Pages/DivisionUpdater";
import CompanyCreator from "./Pages/CompanyCreator";
import PetCreator from "./Pages/PetCreator";
import ToolCreator from "./Pages/ToolCreator";
import KittensCreator from "./Pages/KittensCreator";
import BoardGamesCreator from "./Pages/BoardGamesCreator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "equipments/create",
        element: <EquipmentCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/employees/search/:search",
        element: <EmployeeSearch />,
      },
      {
        path: "/equipments",
        element: <EquipmentList />,
      },
      {
        path: "/missing",
        element: <MissingEmployees />,
      },
      {
        path: "/divisions",
        element: <DivisionList />,
      },
      {
        path: "/divisions/update/:id",
        element: <DivisionUpdater />,
      },
      {
        path: "/prevcompany/create",
        element: <CompanyCreator />,
      },
      {
        path: "/employees/pets/:id",
        element: <PetCreator />,
      },
      {
        path: "/tools",
        element: <ToolCreator />,
      },
      {
        path: "/employees/kittens/:id",
        element: <KittensCreator />,
      },
      {
        path: "/boardgames",
        element: <BoardGamesCreator />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
