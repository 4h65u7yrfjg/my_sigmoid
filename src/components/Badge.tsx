import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface BadgeProps {
  icon?: LucideIcon;
  text: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  animated?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  icon: Icon,
  text,
  variant = 'primary',
  size = 'md',
  glow = false,
  animated = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center gap-2 font-semibold rounded-full border backdrop-blur-sm transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30',
    secondary: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30',
    accent: 'bg-gradient-to-r from-pink-500/20 to-orange-500/20 border-pink-400/30 text-pink-300 hover:from-pink-500/30 hover:to-orange-500/30',
    success: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30',
    warning: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 text-yellow-300 hover:from-yellow-500/30 hover:to-orange-500/30',
    error: 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/30 text-red-300 hover:from-red-500/30 hover:to-pink-500/30'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const glowClasses = glow ? {
    primary: 'shadow-lg shadow-cyan-500/25',
    secondary: 'shadow-lg shadow-purple-500/25',
    accent: 'shadow-lg shadow-pink-500/25',
    success: 'shadow-lg shadow-green-500/25',
    warning: 'shadow-lg shadow-yellow-500/25',
    error: 'shadow-lg shadow-red-500/25'
  } : {};
  
  const animatedClasses = animated ? 'hover:scale-105 hover:-translate-y-1' : 'hover:scale-105';
  
  return (
    <span 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${glow ? glowClasses[variant] : ''} 
        ${animatedClasses}
        ${className}
      `}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />}
      {text}
    </span>
  );
};

export default Badge;