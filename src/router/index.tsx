// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import ChangePassword from '@/pages/ChangePassword';
import WorkOrderPage from '@/pages/WorkOrderPage';
import PreWorkOrderPage from '@/pages/PreWorkOrderPage';

// Component สำหรับตรวจสอบ Authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// สร้าง router
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path : 'preworkorder',
        element: <PreWorkOrderPage />
      },
      {
        path: 'workorder',
        element: <WorkOrderPage />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
          <a href="/login" className="mt-6 inline-block bg-teal-700 text-white px-6 py-3 rounded hover:bg-teal-800">
            Back to Login
          </a>
        </div>
      </div>
    ),
  },
]);

export default router;