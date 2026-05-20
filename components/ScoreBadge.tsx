'use client';

import { motion } from 'framer-motion';

interface ScoreBadgeProps {
  label: string;
  value: string | number;
  icon?: string;
}

export function ScoreBadge({ label, value, icon }: ScoreBadgeProps) {
  return (
    <motion.div
      className="glossy-card px-5 py-3 text-center min-w-fit"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-xs text-gray-600 font-fredoka uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-2xl font-baloo2 font-bold text-orange-600">
        {icon} {value}
      </p>
    </motion.div>
  );
}
