"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ScoreBadge } from "@/components/ScoreBadge";
import { Confetti } from "@/components/Confetti";
import { useGame } from "@/context/GameContext";

const TOTAL_TIME = 60;
const ANSWER_OPTIONS = ["A", "B", "C", "D"];

// 🔥 ATUR POSISI HEADER DI SINI
const HEADER_OFFSET = "pt-4"; // ubah: pt-1 / pt-2 / pt-6

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

  const playSound = (type: "click" | "correct" | "wrong") => {
    if (!soundEnabled) return;

    try {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.play().catch(() => {});
    } catch {}
  };

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

    const timeTaken = TOTAL_TIME - timeLeft;
    const points = correct ? 10 : 0;

    // kirim juga ke context lewat cara lama (tidak diubah struktur)
    submitAnswer(answer, timeTaken);
  };

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
      className={`min-h-screen relative overflow-hidden bg-game ${
        shake ? "shake" : ""
      }`}
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

      {/* ================= HEADER (MUDAH DI ATUR NAIK/TURUN) ================= */}
      <div
        className={`relative z-10 max-w-[900px] mx-auto px-2 ${HEADER_OFFSET}`}
      >
        <div className="flex items-center justify-between mb-3 w-full">
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
      </div>

      {/* ================= MAIN ================= */}
      <div className="relative z-10 max-w-[900px] mx-auto px-2 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
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
            <h2 className="text-center text-orange-700 mb-4 text-3xl font-black font-baloo2">
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

      {/* SHAKE ANIMATION */}
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
