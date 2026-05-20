'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TimerCircleProps {
  timeLeft: number;
  totalTime: number;
}

export function TimerCircle({ timeLeft, totalTime }: TimerCircleProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      setPulse(true);
    } else {
      setPulse(false);
    }
  }, [timeLeft]);

  const percentage = (timeLeft / totalTime) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let color = '#22c55e'; // green
  if (percentage < 50) color = '#fbbf24'; // yellow
  if (percentage < 25) color = '#ef4444'; // red

  return (
    <motion.div
      className="relative w-32 h-32"
      animate={pulse ? { scale: [1, 1.1, 1] } : {}}
      transition={pulse ? { duration: 0.5, repeat: Infinity } : {}}
    >
      <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.3, ease: 'linear' }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-600 font-fredoka uppercase tracking-wider">WAKTU</p>
          <p className="text-4xl font-baloo2 font-bold text-orange-600 font-bold">
            {Math.ceil(timeLeft)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
