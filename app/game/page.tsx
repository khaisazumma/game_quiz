"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ScoreBadge } from "@/components/ScoreBadge";
import { Confetti } from "@/components/Confetti";
import { useGame } from "@/context/GameContext";

const TOTAL_TIME = 60;
const ANSWER_OPTIONS = ["A", "B", "C", "D"];

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
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [lockInput, setLockInput] = useState(false);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);

  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // RESET SOAL (TANPA RESET TIMER)
  useEffect(() => {
    if (!currentHero) return;

    const options = [...currentHero.options].sort(() => Math.random() - 0.5);

    setShuffledOptions(options);

    setShowResult(false);
    setIsCorrect(false);
    setShowConfetti(false);
    setLockInput(false);
    setShake(false);
    setFlash(false);
  }, [currentHero]);

  // SOUND
  const playSound = (type: "click" | "correct" | "wrong") => {
    if (!soundEnabled) return;

    try {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.play().catch(() => {});
    } catch {}
  };

  // GLOBAL TIMER (60 detik untuk seluruh game)
  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/results");
      return;
    }

    if (showResult || lockInput) return;

    const timer = setTimeout(() => {
      setTimeLeft((t) => Math.max(t - 0.1, 0));
    }, 100);

    return () => clearTimeout(timer);
  }, [timeLeft, showResult, lockInput, router]);

  // ANSWER
  const handleAnswerSelect = (answer: string) => {
    if (!currentHero || showResult || lockInput) return;

    const correct = answer === currentHero.answer;

    setShowResult(true);
    setIsCorrect(correct);

    if (correct) {
      setShowConfetti(true);
      playSound("correct");
    } else {
      setFlash(true);
      setShake(true);
      playSound("wrong");

      setTimeout(() => {
        setFlash(false);
        setShake(false);
      }, 600);
    }

    submitAnswer(answer, TOTAL_TIME - timeLeft);
  };

  // NEXT QUESTION
  const handleNext = () => {
    playSound("click");

    if (isLastQuestion) {
      router.push("/results");
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
      className={`min-h-screen relative overflow-hidden bg-game ${shake ? "shake" : ""}`}
    >
      {/* FLASH EFFECT */}
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

      <Confetti active={showConfetti && isCorrect} />

      <div className="relative z-10 max-w-[900px] mx-auto px-2 py-2">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 px-0 md:px-2 pt-3 w-full">
          <Link href="/">
            <ScoreBadge label="Back" value="←" />
          </Link>

          <ScoreBadge
            label="Soal"
            value={`${currentIndex + 1} / ${heroes.length}`}
          />

          <div className="flex gap-2">
            <ScoreBadge label="Poin" value={score} />
            <ScoreBadge label="Waktu" value={`${Math.ceil(timeLeft)}s`} />
          </div>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="w-[300px] h-[300px] rounded-2xl overflow-hidden border-4 border-[#8b6f47] shadow-xl bg-white flex items-center justify-center">
              <img
                src={currentHero.image}
                alt={currentHero.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="w-full max-w-[420px] mx-auto">
            <h2 className="text-center text-orange-700 mb-4 text-2xl font-black">
              SIAPAKAH AKU?
            </h2>

            <div className="flex flex-col gap-3">
              {shuffledOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult || lockInput}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500 text-white font-bold shadow-md transition active:scale-95 disabled:opacity-50"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white text-orange-500 rounded-full font-bold">
                    {ANSWER_OPTIONS[idx]}
                  </div>
                  <span>{option}</span>
                </button>
              ))}
            </div>

            {/* RESULT */}
            <div className="mt-4 min-h-[80px] flex items-center justify-center">
              {showResult && (
                <div className="w-full text-center space-y-3">
                  <div
                    className={`p-4 rounded-xl font-bold ${
                      isCorrect
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {isCorrect
                      ? "BENAR!"
                      : `SALAH! Jawaban: ${currentHero.answer}`}
                  </div>

                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full"
                  >
                    {isLastQuestion ? "LIHAT HASIL" : "SOAL BERIKUTNYA"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SHAKE */}
      <style jsx global>{`
        .shake {
          animation: shake 0.3s ease-in-out 3;
        }

        @keyframes shake {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-5px, 5px);
          }
          50% {
            transform: translate(5px, -5px);
          }
          75% {
            transform: translate(-5px, -5px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </main>
  );
}
