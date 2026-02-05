// src/router/index.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/Login";
// import Dashboard from "@/pages/Dashboard";
import ChangePassword from "@/pages/ChangePassword";
import WorkOrderPage from "@/pages/WorkOrderPage"; // หน้าว่าง (แก้จาก ActivityWorkOrderPage)
import PreWorkOrderPage from "@/features/PreWorkOrder/pages/PreWorkOrderPage";
import ActivityWorkOrderPage from "@/features/WorkOrder/pages/ActivityWorkOrderPage";
import HistoricalWorkOrderPage from "@/features/WorkOrder/pages/HistoricalWorkOrderPage";
import React from "react";

/**
 * ProtectedRoute
 * ใช้ token เป็นตัวตัดสินการ login (JWT)
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/WorkOrderPage" replace />, //หน้าแรกเป็นหน้า WorkOrder
      },
      // {
      //   path: "dashboard",
      //   element: <Dashboard />, ///ซ่อนไว้ก่อน ยังไม่ได้ใช้
      // },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      // Work Order Routes - ตรงกับ Sidebar
      {
        path: "workorder",
        children: [
          {
            index: true, // /workorder - หน้าว่าง
            element: <WorkOrderPage />,
          },
          {
            path: "prework", // /workorder/prework
            element: <PreWorkOrderPage />,
          },
          {
            path: "activity", // /workorder/activity
            element: <ActivityWorkOrderPage />,
          },
          {
            path: "history", // /workorder/history
            element: <HistoricalWorkOrderPage/>
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
          <a
            href="/login"
            className="mt-6 inline-block bg-teal-700 text-white px-6 py-3 rounded hover:bg-teal-800"
          >
            Back to Login
          </a>
        </div>
      </div>
    ),
  },
]);

export default router;