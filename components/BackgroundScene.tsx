'use client';

import { AnimatedCloud } from './AnimatedCloud';

export function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sky background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-sky-300 to-blue-200" />

      {/* Animated clouds */}
      <AnimatedCloud left="5%" top="10%" scale={1.2} duration={10} delay={0} />
      <AnimatedCloud left="15%" top="20%" scale={0.8} duration={12} delay={1} />
      <AnimatedCloud left="70%" top="15%" scale={1} duration={14} delay={0.5} />
      <AnimatedCloud left="80%" top="25%" scale={0.9} duration={11} delay={1.5} />

      {/* Grass area */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600 via-green-500 to-green-400">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-6 bg-green-700"
              style={{
                left: `${(i * 5) % 100}%`,
                bottom: `${10 + (i % 3) * 8}px`,
                transform: `rotate(${45 - (i % 3) * 30}deg) scale(${0.6 + (i % 3) * 0.3})`
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative house */}
      <div className="absolute bottom-28 right-10 w-32 h-32 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* House base */}
          <rect x="20" y="50" width="60" height="35" fill="#8b5a3c" />
          {/* Roof */}
          <polygon points="20,50 50,20 80,50" fill="#9d6d3b" />
          {/* Door */}
          <rect x="40" y="65" width="20" height="20" fill="#6b4423" />
          {/* Window */}
          <rect x="30" y="55" width="15" height="12" fill="#87ceeb" />
          <line x1="37.5" y1="55" x2="37.5" y2="67" stroke="#333" strokeWidth="0.5" />
          <line x1="30" y1="61" x2="45" y2="61" stroke="#333" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Decorative flag */}
      <div className="absolute bottom-32 left-10 w-24 h-20 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Pole */}
          <rect x="45" y="40" width="4" height="60" fill="#8b5a3c" />
          {/* Flag */}
          <rect x="49" y="40" width="40" height="25" fill="#ff0000" />
          <rect x="49" y="65" width="40" height="25" fill="white" />
        </svg>
      </div>
    </div>
  );
}
