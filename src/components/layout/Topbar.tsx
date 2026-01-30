import { Menu } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { toggle } = useSidebar();
  const navigate = useNavigate();

  const [pnsName, setPnsName] = useState<string>('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await apiFetch('/users/me');
        setPnsName(res.data.pns_name);
      } catch {
        // token หมด / ไม่ผ่าน
        navigate('/login');
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="bg-teal-700 text-white h-16 flex items-center justify-between px-4 shadow-md fixed top-0 left-0 right-0 z-20">
      <button onClick={toggle} className="p-2 rounded hover:bg-teal-600">
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-4">
        <span className="font-medium">
          {pnsName || '—'}
        </span>
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </header>
  );
}
