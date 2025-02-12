import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";

// Import the Product component lazily
const Dashboard = React.lazy(() => import("../page/Dashboard"));

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
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
