'use client';

import { motion } from 'framer-motion';

interface AnimatedCloudProps {
  left?: string;
  top?: string;
  scale?: number;
  duration?: number;
  delay?: number;
}

export function AnimatedCloud({
  left = '10%',
  top = '10%',
  scale = 1,
  duration = 8,
  delay = 0
}: AnimatedCloudProps) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left, top }}
      animate={{
        x: [0, 30, 0],
        y: [0, -15, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <svg
        width={60 * scale}
        height={40 * scale}
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 20C8 20 2 16 2 10C2 5.58172 5.58172 2 10 2C10.5 2 11 2.05 11.5 2.14C13.5 0.5 16 0 18.5 0C23.1944 0 27.0581 3.10701 28.5 7.3C28.83 7.26 29.16 7.25 29.5 7.25C35.299 7.25 40 11.951 40 17.75C40 20.05 39.47 22.22 38.52 24.11C39.65 25.25 40.47 26.73 40.87 28.41C44.48 27.16 47.5 24.01 47.5 20.25C47.5 16.2 44.68 12.81 40.95 12.18C39.5 5.6 33.3 0.5 26 0.5C22.8 0.5 19.8 1.37 17.3 3C15.6 1.2 13.1 0 10.25 0C5.81 0 2.08 3.73 2.08 8.17C2.08 8.17 2 8.25 2 8.25C2 12 4.52 15.15 8 16.62V20Z"
          fill="white"
          fillOpacity="0.9"
        />
      </svg>
    </motion.div>
  );
}
