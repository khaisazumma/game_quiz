'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
        duration: 2 + Math.random() * 1,
        color: ['#f97316', '#22c55e', '#3b82f6', '#fbbf24', '#ec4899'][Math.floor(Math.random() * 5)]
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => setPieces([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color
          }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: 360,
            x: (Math.random() - 0.5) * 200
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn'
          }}
        />
      ))}
    </div>
  );
}
