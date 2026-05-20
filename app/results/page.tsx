'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';
import { GameButton } from '@/components/GameButton';
import { Character } from '@/components/Character';
import { Confetti } from '@/components/Confetti';

export default function ResultsPage() {
  const { score, answers, heroes, resetGame, soundEnabled } = useGame();
  const [showDetails, setShowDetails] = useState(false);

  const correctAnswers = answers.filter(a => a.correct).length;
  const totalQuestions = answers.length || heroes.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const averageTime =
    totalQuestions > 0
      ? (answers.reduce((acc, a) => acc + a.timeUsed, 0) / totalQuestions).toFixed(1)
      : 0;

  const playSound = () => {
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/correct.mp3');
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  const handlePlayAgain = () => {
    playSound();
    resetGame();
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  return (
    <main className="min-h-screen w-full bg-results relative overflow-hidden">

      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      <Confetti active={score >= 80} />

      <div className="flex items-center justify-center min-h-screen p-4">

        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            glossy-card
            w-full
            max-w-5xl
            p-6
            md:p-8
            z-10
          "
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.9) 100%)',
            border: '4px solid #fbbf24',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}
        >

          {/* TITLE */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 text-white px-5 py-2 rounded-lg font-fredoka font-bold text-base">
              🏆 GAME SELESAI 🏆
            </div>
          </div>

          {/* CONTENT ROW */}
          <div className="flex flex-row gap-6">

            {/* LEFT SCORE (UPDATED) */}
            <div className="flex flex-col items-center justify-center w-[30%]">

              {/* SCORE GLASS EFFECT */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
                className="relative text-center"
              >

                {/* AURA */}
                <div className="absolute inset-0 blur-2xl bg-yellow-400 opacity-30 rounded-full"></div>

                {/* SCORE */}
                <h1 className="
                  relative
                  font-baloo2
                  text-6xl
                  font-black
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-yellow-400
                  via-orange-500
                  to-red-500
                  drop-shadow-lg
                ">
                  {score}
                </h1>

              </motion.div>

              <p className="font-fredoka text-sm text-gray-600 mt-2">
                TOTAL POIN
              </p>

              <p className="mt-3 text-sm font-fredoka text-center">
                {percentage >= 80 ? (
                  <span className="text-green-600">🌟 Luar Biasa!</span>
                ) : percentage >= 60 ? (
                  <span className="text-blue-600">👍 Bagus!</span>
                ) : (
                  <span className="text-orange-600">💪 Coba lagi</span>
                )}
              </p>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex flex-col gap-3">

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3">

                <div className="bg-white/70 p-3 rounded-xl text-center">
                  <p className="text-xs font-fredoka">Benar</p>
                  <p className="text-xl font-bold text-green-600">
                    {correctAnswers}/{totalQuestions}
                  </p>
                </div>

                <div className="bg-white/70 p-3 rounded-xl text-center">
                  <p className="text-xs font-fredoka">Akurasi</p>
                  <p className="text-xl font-bold text-blue-600">
                    {percentage}%
                  </p>
                </div>

      <div className="bg-white/70 p-3 rounded-xl text-center">
  <p className="text-xs font-fredoka">Waktu</p>

  <p className="text-lg font-bold text-orange-600">
    {averageTime}s
  </p>

  <p className="text-[10px] text-gray-600 mt-1 font-fredoka">
    sekitar {averageTime} detik per soal
  </p>
</div>

                <div className="bg-white/70 p-3 rounded-xl text-center">
                  <p className="text-xs font-fredoka">Soal</p>
                  <p className="text-xl font-bold text-purple-600">
                    {totalQuestions}
                  </p>
                </div>

              </div>

              {/* MESSAGE */}
              <div className="text-center mt-2">
                <p className="font-fredoka font-bold text-sm">
                  {percentage >= 80 ? (
                    <span className="text-green-600">🌟 Hebat banget!</span>
                  ) : percentage >= 60 ? (
                    <span className="text-blue-600">👏 Bagus!</span>
                  ) : (
                    <span className="text-orange-600">💪 Tetap semangat!</span>
                  )}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3 mt-2">

<button
  onClick={() => setShowDetails(!showDetails)}
  className="
    w-full
    py-2.5
    rounded-xl
    bg-blue-500
    hover:bg-blue-600
    text-white
    font-fredoka
    font-bold
    text-sm

    transition-all
    duration-200
    ease-out

    hover:scale-105
    hover:shadow-lg
    active:scale-95
  "
>
  {showDetails ? 'SEMBUNYIKAN JAWABAN' : 'LIHAT JAWABAN'}
</button>

                <GameButton
                  onClick={handlePlayAgain}
                  variant="primary"
                  size="lg"
                  className="
                    w-full
                    justify-center
                    py-2.5
                    text-sm
                  "
                >
                  MAIN LAGI
                </GameButton>

              </div>

              {/* DETAIL */}
              {showDetails && (
                <div className="bg-white/60 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2 mt-2">

                  {answers.map((answer, idx) => {
                    const hero = heroes.find(h => h.id === answer.heroId);

                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-sm ${
                          answer.correct ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        <p className="font-fredoka font-bold text-xs">
                          {idx + 1}. {hero?.name} {answer.correct ? '✓' : '✗'}
                        </p>
                      </div>
                    );
                  })}

                </div>
              )}

            </div>
          </div>

        </motion.div>

      </div>
    </main>
  );
}