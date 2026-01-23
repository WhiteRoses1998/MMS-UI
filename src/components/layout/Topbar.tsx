// src/components/layout/Topbar.tsx
import { Menu } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';

export default function Topbar() {
  const { toggle } = useSidebar();

  return (
    <header className="bg-teal-700 text-white h-16 flex items-center justify-between px-4 shadow-md fixed top-0 left-0 right-0 z-20">
      {/* Hamburger button - แสดงตลอดทุกขนาดหน้าจอ */}
      <button onClick={toggle} className="p-2 rounded hover:bg-teal-600 transition-colors">
        <Menu size={18} />
      </button>

      <div className="text-lg font-semibold flex-1 text-center">MMS</div>

      <div className="flex items-center gap-4">
        <span>Powerpower</span>
        <button className="hover:underline">Logout</button>
      </div>
    </header>
  );
}