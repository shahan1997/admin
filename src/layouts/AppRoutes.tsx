import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import ProtectedRoute from "./ProtectedRoute";

// Import the Product component lazily
const Dashboard = React.lazy(() => import("../page/ItemCard"));
const Order = React.lazy(() => import("../page/Order"));
const Login = React.lazy(() => import("../../../admin/src/page/Login"));
const Register = React.lazy(() => import("../../../admin/src/page/Registrar"));

/**
 * AppRoutes will load the app routes.
 * @returns
 */

const AppRoutes = () => {
  return (
    <Routes>
      {/* 
        The Product component is lazily loaded using Suspense.
        You can add other routes similarly if needed.
      */}

      {/* Default route - Redirect to /product */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/registrar"
        element={
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        }
      />

      <Route
        path="/order"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Order />
            </Suspense>{" "}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
