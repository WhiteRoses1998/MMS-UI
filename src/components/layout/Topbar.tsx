// src/components/layout/Topbar.tsx
import { Menu } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { useNavigate } from 'react-router-dom'; // ← เพิ่มบรรทัดนี้

export default function Topbar() {
  const { toggle } = useSidebar();
  const navigate = useNavigate(); // ← เพิ่มบรรทัดนี้

  // ← เพิ่มฟังก์ชันนี้
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header className="bg-teal-700 text-white h-16 flex items-center justify-between px-4 shadow-md fixed top-0 left-0 right-0 z-20">
      <button onClick={toggle} className="p-2 rounded hover:bg-teal-600 transition-colors">
        <Menu size={18} />
      </button>

      <div className="text-lg font-semibold flex-1 text-center">MMS</div>

      <div className="flex items-center gap-4">
        <span>Powerpower</span>
        <button onClick={handleLogout} className="hover:underline"> {/* ← เพิ่ม onClick */}
          Logout
        </button>
      </div>
    </header>
  );
}