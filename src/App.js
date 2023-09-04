import React, { lazy, Suspense } from "react";
import { Navbar, Footer } from "./components/index";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.scss";
import New from "./pages/New";
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Write = lazy(() => import("./pages/Write"));
const Single = lazy(() => import("./pages/Single"));

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/new",
        element: <New />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app bg-gray-700">
      <div className="container">
        <Suspense
          fallback={
            <div className="loading">
              <CircularProgress /> <span>Loading...</span>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
