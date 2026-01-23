// src/components/ui/sidebar-item.tsx
import { cn } from '@/lib/cn';
import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { forwardRef } from 'react';

interface SidebarItemProps {
  icon?: LucideIcon;
  label: string;
  to: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ icon: Icon, label, to, disabled = false, className, onClick }, ref) => {
    return (
      <NavLink
        ref={ref}
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all',
            'hover:bg-teal-800/80 hover:text-white',
            isActive
              ? 'bg-teal-800 text-white'
              : 'text-teal-100 hover:bg-teal-800/60',
            disabled && 'pointer-events-none opacity-50',
            className
          )
        }
        aria-disabled={disabled}
      >
        {Icon && (
          <Icon
            className={cn(
              'h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110',
              'text-teal-300'
            )}
          />
        )}
        <span className="flex-1 truncate">{label}</span>
      </NavLink>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

export { SidebarItem };