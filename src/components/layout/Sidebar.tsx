// src/components/layout/Sidebar.tsx
import { useSidebar } from '@/hooks/useSidebar';
import { 
  ChevronDown, 
  ChevronRight, 
  X, 
  LayoutDashboard, 
  ClipboardList, 
  Lock, 
  FileText, 
  Activity, 
  Layers, 
  History 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { useState, useEffect } from 'react';

const menuItems = [
  { 
    label: 'Dashboard', 
    path: '/dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'Work Order',
    path: '/workorder', // หน้าว่าง - จะ redirect ไป /workorder หรือแสดงข้อความให้เลือก submenu
    icon: ClipboardList,
    submenu: [
      { label: 'Pre Work Order', path: '/workorder/prework', icon: FileText },
      { label: 'Activity Work Order', path: '/workorder/activity', icon: Activity },
      { label: 'Work Order Group', path: '/workorder/group', icon: Layers },
      { label: 'Historical Work Order', path: '/workorder/history', icon: History },
    ]
  },
  { 
    label: 'Change Password', 
    path: '/change-password',
    icon: Lock
  },
];

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  // Auto-expand submenu ถ้า path ตรงกับ submenu item
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.submenu) {
        const isActive = item.submenu.some(
          (subItem) => location.pathname === subItem.path
        );
        if (isActive) {
          setExpandedMenu(item.label);
        }
      }
    });
  }, [location.pathname]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggle();
    }
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const isSubmenuActive = (submenu: { path: string }[]) => {
    return submenu.some(item => location.pathname === item.path);
  };

  return (
    <div
      className={cn(
        "bg-teal-900 text-white w-64 h-full fixed top-0 left-0 z-30 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header in Sidebar */}
      <div className="p-4 flex items-center justify-between border-b border-teal-800">
        <div className="text-xl font-bold">MMS</div>
        <button 
          onClick={toggle} 
          className="p-2 rounded hover:bg-teal-800 transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="mt-2 overflow-y-auto h-[calc(100vh-80px)]">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.submenu ? (
              <div>
                {/* Main Menu Item with Submenu - เป็น button ไม่ใช่ link */}
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-6 py-3 hover:bg-teal-800 transition-colors text-left",
                    (expandedMenu === item.label || isSubmenuActive(item.submenu)) && "bg-teal-800/50"
                  )}
                >
                  {item.icon && <item.icon size={20} className="flex-shrink-0" />}
                  <span className="flex-1">{item.label}</span>
                  {expandedMenu === item.label ? (
                    <ChevronDown size={18} className="transition-transform duration-200" />
                  ) : (
                    <ChevronRight size={18} className="transition-transform duration-200" />
                  )}
                </button>

                {/* Submenu Items - แสดงเมื่อ expanded */}
                <div
                  className={cn(
                    "bg-teal-950/30 overflow-hidden transition-all duration-200",
                    expandedMenu === item.label ? "max-h-96" : "max-h-0"
                  )}
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center gap-3 pl-12 pr-6 py-2.5 hover:bg-teal-800 transition-colors text-sm",
                        location.pathname === subItem.path && "bg-teal-800 text-white border-l-4 border-teal-400"
                      )}
                    >
                      {subItem.icon && <subItem.icon size={16} className="flex-shrink-0" />}
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* Regular Menu Item - เป็น Link ปกติ */
              <Link
                to={item.path}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 hover:bg-teal-800 transition-colors",
                  location.pathname === item.path && "bg-teal-800 text-white border-l-4 border-teal-400"
                )}
              >
                {item.icon && <item.icon size={20} className="flex-shrink-0" />}
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}