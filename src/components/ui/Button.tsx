// src/components/ui/button.tsx
import { cn } from '@/lib/cn';
import { LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: LucideIcon;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      icon: Icon,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'active:scale-[0.98]'
    );

    const variants = {
      default: 'bg-gray-900 text-white hover:bg-gray-800',
      primary: 'bg-teal-700 text-white hover:bg-teal-800',
      secondary: 'bg-teal-100 text-teal-900 hover:bg-teal-200',
      outline: 'border border-teal-700 bg-transparent text-teal-700 hover:bg-teal-50',
      ghost: 'hover:bg-teal-50 text-teal-700',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          Icon && <Icon className="mr-2 h-4 w-4" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };