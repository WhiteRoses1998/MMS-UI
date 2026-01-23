// src/components/layout/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/cn';

export default function AppLayout() {
  const { isOpen } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - พับหายไปจริง */}
      <Sidebar />

      {/* Main Content - ขยับเต็มจอเมื่อพับ */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isOpen ? "ml-64" : "ml-0"
      )}>
        <Topbar />
        <main className="flex-1 overflow-y-auto pt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}