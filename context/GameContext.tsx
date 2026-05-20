'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Hero, getRandomHeroes } from '@/data/heroes';

interface GameContextType {
  heroes: Hero[];
  currentIndex: number;
  score: number;
  timeSpent: number;
  answers: { heroId: number; answer: string; correct: boolean; timeUsed: number }[];
  initializeGame: () => void;
  nextQuestion: () => void;
  submitAnswer: (answer: string, timeUsed: number) => void;
  resetGame: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [answers, setAnswers] = useState<
    { heroId: number; answer: string; correct: boolean; timeUsed: number }[]
  >([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // INIT GAME
  const initializeGame = useCallback(() => {
    const shuffled = getRandomHeroes(25);

    setHeroes(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTimeSpent(0);
    setAnswers([]);
  }, []);

  // NEXT QUESTION
  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < heroes.length - 1 ? prev + 1 : prev
    );
  }, [heroes.length]);

  // SUBMIT ANSWER (FIXED TOTAL SCORE LOGIC)
const submitAnswer = useCallback(
  (answer: string, timeUsed: number) => {
    const currentHero = heroes[currentIndex];
    if (!currentHero) return;

    const isCorrect = answer === currentHero.answer;

    // simpan jawaban
    setAnswers((prev) => [
      ...prev,
      {
        heroId: currentHero.id,
        answer,
        correct: isCorrect,
        timeUsed,
      },
    ]);

    // ===== FIXED SCORING: 25 soal = 100 poin =====
    if (isCorrect) {
      const pointsPerQuestion = 100 / 25; // = 4

      setScore((prev) =>
        Math.min(prev + pointsPerQuestion, 100)
      );
    }

    setTimeSpent((prev) => prev + timeUsed);
  },
  [currentIndex, heroes]
);
  // RESET GAME
  const resetGame = useCallback(() => {
    setHeroes([]);
    setCurrentIndex(0);
    setScore(0);
    setTimeSpent(0);
    setAnswers([]);
  }, []);

  return (
    <GameContext.Provider
      value={{
        heroes,
        currentIndex,
        score,
        timeSpent,
        answers,
        initializeGame,
        nextQuestion,
        submitAnswer,
        resetGame,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// HOOK
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}