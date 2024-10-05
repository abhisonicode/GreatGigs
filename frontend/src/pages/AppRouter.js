import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "./home/Home";
// import Add from "./add/Add";
import Gig from "./gig/Gig";
import Gigs from "./gigs/Gigs";
import Login from "./login/Login";
import Messages from "./messages/Messages";
import MyGigs from "./myGigs/MyGigs";
import Orders from "./orders/Orders";
import Register from "./register/Register";
import Message from "./message/Message";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Payment from "./payment/payment";
import Success from "./payment/success";

const Add = lazy(() => import("./add/Add"));

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Layout />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add",
        element: (
          <Suspense>
            <ProtectedRoute sellerProtected={true}>
              <Add></Add>
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/gig/:id",
        element: <Gig />,
      },
      {
        path: "/gigs",
        element: <Gigs></Gigs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/my-gigs",
        element: (
          <ProtectedRoute sellerProtected={true}>
            <MyGigs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Orders></Orders>
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute preventLoggedIn={true} isPublic={true}>
            <Register></Register>
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/success",
        element: (
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Home></Home>,
      },
    ],
  },
]);

export default AppRouter;
