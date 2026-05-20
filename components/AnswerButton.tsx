'use client';

import { motion } from 'framer-motion';

interface AnswerButtonProps {
  option: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

export function AnswerButton({
  option,
  isSelected,
  isCorrect,
  isWrong,
  onClick,
  disabled,
  label
}: AnswerButtonProps) {
  let bgColor = 'bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg';
  let textColor = 'text-white';

  if (isCorrect) {
    bgColor = 'bg-gradient-to-r from-green-400 to-green-600';
  } else if (isWrong) {
    bgColor = 'bg-gradient-to-r from-red-400 to-red-600';
  }

  const animationVariant = isWrong ? 'shake' : isSelected ? 'scale' : 'normal';

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-full font-fredoka font-bold text-lg uppercase tracking-wide border-2 border-white/50 ${bgColor} ${textColor} shadow-lg transition-all`}
      whileHover={!disabled && !isSelected ? { scale: 1.05, boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)' } : {}}
      whileTap={!disabled && !isSelected ? { scale: 0.95 } : {}}
      animate={animationVariant === 'shake' ? {
        x: [0, -10, 10, -10, 10, 0],
        boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)'
      } : animationVariant === 'scale' ? {
        scale: [1, 1.05, 1],
        boxShadow: isCorrect ? '0 0 30px rgba(34, 197, 94, 0.6)' : '0 0 30px rgba(249, 115, 22, 0.6)'
      } : {}}
      transition={{
        duration: animationVariant === 'shake' ? 0.5 : 0.3
      }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <span className="font-baloo2 text-2xl font-bold mr-3">{label}</span>
      <span>{option}</span>
    </motion.button>
  );
}
