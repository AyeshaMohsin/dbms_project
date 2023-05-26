import React, { Component } from "react";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import CustomerRegistration from "./components/CustomerRegistration";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

import "./App.css"


function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path : "/login",
          element: <Login />,
        },
        {
          path: "/CustomerRegistration",
          element: <CustomerRegistration />
        },
        {
          path: "/dashboard",
          element: <Dashboard/>
        }

      ],
    },
  ]);

  return <RouterProvider router={router}/>
}

export default App;
