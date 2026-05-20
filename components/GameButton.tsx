'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GameButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  className?: string;
}

export function GameButton({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}: GameButtonProps) {
  const baseClasses = 'glossy-button font-fredoka uppercase tracking-widest transition-all';

  const variantClasses = {
    primary: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:scale-110 active:scale-95',
    secondary: 'bg-gradient-to-br from-green-400 to-green-600 text-white hover:scale-110 active:scale-95',
    success: 'bg-gradient-to-br from-green-400 to-green-600 text-white hover:scale-110 active:scale-95',
    danger: 'bg-gradient-to-br from-red-400 to-red-600 text-white hover:scale-110 active:scale-95'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-2xl'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={!disabled ? { scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.6)' } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
}
