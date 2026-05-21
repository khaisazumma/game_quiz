"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GameButton } from "@/components/GameButton";
import { Character } from "@/components/Character";
import { ChevronLeft } from "lucide-react";
import { useGame } from "@/context/GameContext";

export default function Instructions() {
  const { initializeGame } = useGame();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playSound = () => {
    if (soundEnabled && typeof window !== "undefined") {
      try {
        const audio = new Audio("/sounds/click.mp3");
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  const handleStart = () => {
    playSound();
    initializeGame();
  };

  const instructions = [
    "Kamu akan diberikan 25 gambar pahlawan Indonesia",
    "Pilih jawaban yang paling tepat dari 4 pilihan",
    "Waktu menjawab adalah 60 detik untuk semua soal",
    "Jika waktu habis maka akan selesai otomatis",
    "Skor akhir akan ditampilkan di akhir game",
  ];

  return (
    <main className="min-h-screen w-full bg-game relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

      {/* MAIN CONTENT */}
      <div className="h-screen w-full flex items-center justify-center relative px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
        glossy-card

        w-[70%]
        md:w-[55%]
        lg:w-[45%]
        xl:w-[40%]

        px-4
        py-4

        md:px-6
        md:py-7

        lg:px-8
        lg:py-8

        mx-auto
        z-20
        rounded-[30px]
      "
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 240, 200, 0.96) 0%, rgba(255, 248, 220, 0.92) 100%)",
            border: "4px solid #8b6f47",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.4)",
          }}
        >
          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
          font-baloo2
          text-xl
          md:text-2xl
          lg:text-3xl
          font-black
          text-center
          mb-5
        "
            style={{
              color: "#d97706",
              WebkitTextStroke: "1px white",
              textShadow: `
            0 3px 0 #92400e,
            0 5px 10px rgba(0,0,0,0.15)
          `,
            }}
          >
            PETUNJUK PERMAINAN
          </motion.h1>

          {/* LIST INSTRUCTIONS */}
          <div className="space-y-3 mb-6">
            {instructions.map((instruction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                className="
              flex
              items-start
              gap-3
              bg-white/55
              p-2 md:p-3
              rounded-xl
              shadow-md
            "
              >
                {/* NUMBER */}
                <div
                  className="
                flex-shrink-0
                w-7 h-7
                rounded-full
                bg-gradient-to-b
                from-orange-400
                to-orange-600
                text-white
                flex
                items-center
                justify-center
                font-bold
                text-sm
                shadow-lg
              "
                >
                  {index + 1}
                </div>

                {/* TEXT */}
                <p
                  className="
                font-fredoka
                text-xs
                md:text-sm
                text-gray-800
                leading-relaxed
                pt-1
              "
                >
                  {instruction}
                </p>
              </motion.div>
            ))}
          </div>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
            }}
            className="text-center"
          >
            <Link href="/game">
              <GameButton
                onClick={handleStart}
                variant="success"
                size="lg"
                className="
              w-full
              justify-center
              text-base
              py-2
              rounded-2xl
              font-black
            "
              >
                MULAI GAME
              </GameButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* CHARACTER */}
        {/* ================= CHARACTER ================= */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
    absolute
    bottom-6
    right-4
    lg:right-8
    hidden
    lg:block
    z-20
  "
        >
          <motion.img
            src="/khd_kartini.png"
            alt="KHD Kartini"
            className="w-[260px] lg:w-[340px] object-contain"
            animate={{
              y: [0, -12, 0],
              scale: 1.05,
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>
      </div>
    </main>
  );
}
