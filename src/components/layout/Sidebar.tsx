// src/components/layout/Sidebar.tsx
import { useSidebar } from '@/hooks/useSidebar';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/cn';

const menuItems = [
  { label: 'Pre Work Order', path: '/preworkorder' },
  { label: 'Work Order', path: '/workorder' },
  { label: 'Change Password', path: '/change-password' },
  { label: 'Dashboard', path: '/dashboard' },
];

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const location = useLocation();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggle();
    }
  };

  return (
    <div
      className={cn(
        "bg-teal-900 text-white w-64 h-full fixed top-0 left-0 z-30 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"  // พับหายไปจริง (ไม่ fix หน้า)
      )}
    >
      {/* Header in Sidebar */}
      <div className="p-4 flex items-center justify-between">
        <div className="text-xl font-bold">MMS Admin</div>
        <button onClick={toggle} className="p-2 rounded hover:bg-teal-800">
          <X size={24} />
        </button>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={handleLinkClick}
            className={cn(
              "block px-6 py-3 hover:bg-teal-800 transition-colors",
              location.pathname === item.path && "bg-teal-800 text-white"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}