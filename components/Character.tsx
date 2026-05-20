'use client';

import { motion } from 'framer-motion';

interface CharacterProps {
  pose?: 'happy' | 'thinking' | 'celebrating';
  scale?: number;
  side?: 'left' | 'right';
}

export function Character({ pose = 'happy', scale = 1, side = 'left' }: CharacterProps) {
  const bounceAnimation = pose === 'celebrating'
    ? { y: [0, -20, 0] }
    : { y: [0, -5, 0] };

  const bodyTransform = side === 'left' ? 'scaleX(1)' : 'scaleX(-1)';

  return (
    <motion.div
      animate={bounceAnimation}
      transition={{
        duration: pose === 'celebrating' ? 0.6 : 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{ transform: bodyTransform }}
      className="w-32 h-40"
    >
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Head */}
        <circle cx="50" cy="30" r="18" fill="#f4a76d" stroke="#d89856" strokeWidth="2" />

        {/* Eyes */}
        <circle cx="45" cy="28" r="3" fill="#000" />
        <circle cx="55" cy="28" r="3" fill="#000" />

        {/* Smile */}
        {pose !== 'thinking' && (
          <path d="M 45 35 Q 50 38 55 35" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Hat (red and white) */}
        <rect x="35" y="8" width="30" height="6" fill="#dc2626" rx="2" />
        <path d="M 38 8 L 45 2 L 62 2 L 62 8" fill="#ffffff" stroke="#dc2626" strokeWidth="1" />

        {/* Body */}
        <rect x="40" y="50" width="20" height="30" fill="#dc2626" rx="3" />

        {/* Arms */}
        <rect x="25" y="55" width="15" height="8" fill="#f4a76d" rx="4" />
        <rect x="60" y="55" width="15" height="8" fill="#f4a76d" rx="4" />

        {/* Legs */}
        <rect x="42" y="82" width="6" height="25" fill="#333" />
        <rect x="52" y="82" width="6" height="25" fill="#333" />

        {/* Shoes */}
        <ellipse cx="45" cy="110" rx="4" ry="3" fill="#8b5a3c" />
        <ellipse cx="55" cy="110" rx="4" ry="3" fill="#8b5a3c" />

        {/* Spear/Bambu runcing (for left side only) */}
        {side === 'left' && (
          <>
            <line x1="28" y1="52" x2="18" y2="35" stroke="#8b5a3c" strokeWidth="2" />
            <polygon points="18,30 22,35 14,35" fill="#dc2626" />
          </>
        )}
      </svg>
    </motion.div>
  );
}
