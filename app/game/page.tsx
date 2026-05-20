'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { ScoreBadge } from '@/components/ScoreBadge';
import { Confetti } from '@/components/Confetti';
import { useGame } from '@/context/GameContext';

const TOTAL_TIME = 50;
const ANSWER_OPTIONS = ['A', 'B', 'C', 'D'];

export default function GamePage() {
  const router = useRouter();

  const {
    heroes,
    currentIndex,
    score,
    submitAnswer,
    nextQuestion,
    soundEnabled,
  } = useGame();

  const currentHero = heroes[currentIndex];
  const isLastQuestion = currentIndex === heroes.length - 1;

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  // 🔒 IMPORTANT LOCK
  const [lockInput, setLockInput] = useState(false);

  // EFFECTS
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);

  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // RESET SOAL
  useEffect(() => {
    if (currentHero) {
      const options = [...currentHero.options].sort(
        () => Math.random() - 0.5
      );

      setShuffledOptions(options);

      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setShowConfetti(false);
      setIsTimeout(false);
      setShake(false);
      setFlash(false);
      setLockInput(false);
      setTimeLeft(TOTAL_TIME);
    }
  }, [currentHero]);

  // AUDIO
  const playSound = (
    soundName: 'click' | 'correct' | 'wrong' | 'timeout'
  ) => {
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audio = new Audio(`/sounds/${soundName}.mp3`);
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  // TIMEOUT (FIXED TOTAL LOCK)
  const handleTimeout = useCallback(() => {
    setLockInput(true);

    setIsTimeout(true);
    setShake(true);
    setFlash(true);

    playSound('timeout');

    // ❌ TIDAK ADA submitAnswer

    setTimeout(() => {
      setIsTimeout(false);
      setShake(false);
      setFlash(false);
      setLockInput(false);

      if (isLastQuestion) {
        router.push('/results');
      } else {
        nextQuestion();
      }
    }, 900);
  }, [isLastQuestion, router, nextQuestion]);

  // TIMER (ANTI DOUBLE TRIGGER)
  useEffect(() => {
    if (showResult || lockInput) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => Math.max(prev - 0.1, 0));
      }, 100);

      return () => clearTimeout(timer);
    }

    if (timeLeft <= 0 && !lockInput) {
      handleTimeout();
    }
  }, [timeLeft, showResult, lockInput, handleTimeout]);

  // ANSWER
  const handleAnswerSelect = (answer: string) => {
    if (!currentHero || showResult || lockInput) return;

    const correct = answer === currentHero.answer;

    setSelectedAnswer(answer);
    setShowResult(true);
    setIsCorrect(correct);

    if (correct) {
      setShowConfetti(true);
      playSound('correct');
    } else {
      playSound('wrong');
    }

    submitAnswer(answer, TOTAL_TIME - timeLeft);
  };

  // NEXT
  const handleNextQuestion = () => {
    playSound('click');

    if (isLastQuestion) {
      router.push('/results');
    } else {
      nextQuestion();
    }
  };

  if (!currentHero || heroes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen bg-game relative overflow-hidden transition-all duration-200
        ${shake ? 'animate-[shake_0.3s_ease-in-out_3]' : ''}
      `}
    >
      {/* 🔴 RED FLASH */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500 z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      <Confetti active={showConfetti && isCorrect} />

      <div className="relative z-10 max-w-[900px] mx-auto px-2 py-2">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-3 px-1 md:px-0">
          <div className="-ml-16 md:-ml-24 lg:-ml-32">
            <Link href="/">
              <button className="p-3 rounded-full bg-orange-500 text-white">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </Link>
          </div>

          <div className="glossy-card px-4 py-2">
            <p className="font-bold text-orange-600">
              SOAL {currentIndex + 1} / {heroes.length}
            </p>
          </div>

          <div className="flex gap-2">
            <ScoreBadge label="Poin" value={score} />
            <ScoreBadge label="Waktu" value={`${Math.ceil(timeLeft)}s`} />
          </div>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="w-[300px] h-[300px] bg-yellow-200 rounded-xl overflow-hidden">
              {currentHero.image ? (
                <img
                  src={currentHero.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full max-w-[420px] mx-auto">

            <h2 className="text-center font-bold text-orange-700 mb-4">
              SIAPAKAH AKU?
            </h2>

            <div className="space-y-2">
              {shuffledOptions.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult || lockInput}
                  className="w-full py-2 rounded-full bg-orange-500 text-white font-bold hover:scale-105 transition"
                >
                  {ANSWER_OPTIONS[idx]} - {option}
                </button>
              ))}
            </div>

            {/* RESULT */}
            <div className="mt-4 min-h-[80px]">

              {isTimeout ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  className="p-4 bg-yellow-300 text-center font-bold rounded-xl"
                >
                  ⏰ TIME UP!
                </motion.div>
              ) : showResult ? (
                <div className="text-center mt-3">
                  <div
                    className={`p-3 rounded-xl font-bold ${
                      isCorrect ? 'bg-green-200' : 'bg-red-200'
                    }`}
                  >
                    {isCorrect
                      ? 'BENAR!'
                      : `SALAH! Jawaban: ${currentHero.answer}`}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-full"
                  >
                    {isLastQuestion ? 'LIHAT HASIL' : 'SOAL BERIKUTNYA'}
                  </button>
                </div>
              ) : null}
            </div>

          </div>
        </div>
      </div>

      {/* SHAKE ANIMATION */}
      <style jsx global>{`
        @keyframes shake {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </main>
  );
}