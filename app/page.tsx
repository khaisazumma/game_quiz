'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Character } from '@/components/Character';
import { Volume2, VolumeX } from 'lucide-react';
import { Luckiest_Guy } from 'next/font/google';

/* FONT */
const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playSound = () => {
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/click.mp3');
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  return (
    <main className="min-h-screen w-full bg-home relative overflow-hidden">

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* SOUND BUTTON */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="
          absolute
          top-4
          right-4
          z-30
          p-3
          rounded-full
          bg-white/90
          shadow-2xl
          hover:scale-110
          transition-all
        "
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-orange-500" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* ================= LOGO AREA ================= */}
      <div className="absolute top-4 left-4 z-30">
        <div className="flex items-center gap-3">

          {/* LOGO SEKOLAH */}
          <img
            src="/logos/logo-sekolah.png"
            alt="SNEMA"
            className="
              h-[55px]
              md:h-[70px]
              object-contain
              drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)]
            "
          />

          {/* LOGO HJL */}
          <img
            src="/logos/logo-hjl.png"
            alt="HJL"
            className="
              h-[50px]
              md:h-[65px]
              object-contain
              drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)]
            "
          />

        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="h-screen w-full flex items-center justify-center relative px-4">

        <div className="text-center z-20">

          {/* ================= TITLE ================= */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >

            {/* PEJUANG */}
            <h1
              className={`
                ${luckiestGuy.className}
                text-[48px]
                md:text-[72px]
                lg:text-[85px]
                leading-[0.9]
                tracking-wide
                select-none
              `}
              style={{
                color: '#FFB300',
                WebkitTextStroke: '5px white',
                textShadow: `
                  0 4px 0 #d97706,
                  0 8px 12px rgba(0,0,0,0.20)
                `,
                transform: 'rotate(-2deg)',
              }}
            >
              PEJUANG
            </h1>

            {/* BANGSA */}
            <h1
              className={`
                ${luckiestGuy.className}
                text-[48px]
                md:text-[72px]
                lg:text-[85px]
                leading-[0.9]
                tracking-wide
                select-none
              `}
              style={{
                color: '#1565FF',
                WebkitTextStroke: '5px white',
                textShadow: `
                  0 4px 0 #003fbd,
                  0 8px 12px rgba(0,0,0,0.20)
                `,
                transform: 'rotate(1deg)',
              }}
            >
              BANGSA
            </h1>

            {/* INDONESIA */}
            <h1
              className={`
                ${luckiestGuy.className}
                text-[48px]
                md:text-[72px]
                lg:text-[85px]
                leading-[0.9]
                tracking-wide
                select-none
              `}
              style={{
                color: '#FF3131',
                WebkitTextStroke: '5px white',
                textShadow: `
                  0 4px 0 #c11212,
                  0 8px 12px rgba(0,0,0,0.20)
                `,
                transform: 'rotate(-1deg)',
              }}
            >
              INDONESIA
            </h1>

          </motion.div>

          {/* ================= PLAY BUTTON ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Link href="/instructions">

              <button
                onClick={playSound}
                className="
                  group
                  relative
                  px-8
                  md:px-10
                  py-3
                  md:py-4
                  rounded-[28px]
                  border-[4px]
                  border-yellow-100
                  bg-gradient-to-b
                  from-yellow-300
                  via-orange-400
                  to-orange-500
                  shadow-[0_6px_0_#c2410c]
                  hover:translate-y-[2px]
                  hover:shadow-[0_4px_0_#c2410c]
                  transition-all
                  duration-150
                "
              >

                {/* GLOSS */}
                <div
                  className="
                    absolute
                    top-1.5
                    left-2
                    right-2
                    h-[35%]
                    rounded-full
                    bg-white/20
                  "
                />

                <div className="relative flex items-center gap-3">

                  {/* PLAY ICON */}
                  <div
                    className="
                      w-11
                      h-11
                      md:w-12
                      md:h-12
                      rounded-full
                      bg-white
                      flex
                      items-center
                      justify-center
                      shadow-inner
                    "
                  >
                    <span className="text-2xl ml-1 text-orange-500">
                      ▶
                    </span>
                  </div>

                  {/* PLAY TEXT */}
                  <span
                    className={`
                      ${luckiestGuy.className}
                      text-3xl
                      md:text-4xl
                      text-white
                    `}
                    style={{
                      textShadow: '0 3px 0 rgba(0,0,0,0.2)',
                    }}
                  >
                    PLAY
                  </span>

                </div>

              </button>

            </Link>
          </motion.div>

          {/* ================= INFO BAR ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="
              mx-auto
              flex
              items-center
              justify-between
              gap-6
              px-6
              py-4
              rounded-[24px]
              bg-gradient-to-b
              from-[#0c4d9d]
              to-[#072d63]
              border-[3px]
              border-[#3d7fd4]
              shadow-2xl
              w-fit
            "
          >

            {/* ITEM 1 */}
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">
                ⏰
              </div>

              <div className="text-left leading-tight">
                <p className="text-white text-xs font-bold">
                  WAKTU PER ORANG
                </p>

                <p className={`${luckiestGuy.className} text-white text-xl`}>
                  50 DETIK
                </p>
              </div>

            </div>

            {/* GARIS */}
            <div className="w-[2px] h-12 bg-white/30 rounded-full"></div>

            {/* ITEM 2 */}
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">
                👥
              </div>

              <div className="text-left leading-tight">
                <p className="text-white text-xs font-bold">
                  PAHLAWAN
                </p>

                <p className={`${luckiestGuy.className} text-white text-xl`}>
                  20
                </p>
              </div>

            </div>

            {/* GARIS */}
            <div className="w-[2px] h-12 bg-white/30 rounded-full"></div>

            {/* ITEM 3 */}
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">
                🔀
              </div>

              <div className="text-left leading-tight">
                <p className="text-white text-xs font-bold">
                  URUTAN SOAL
                </p>

                <p className={`${luckiestGuy.className} text-white text-lg`}>
                  ACAK
                </p>
              </div>

            </div>

          </motion.div>

        </div>

        {/* ================= CHARACTER ================= */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
            absolute
            bottom-6
            left-4
            lg:left-8
            hidden
            lg:block
            z-20
          "
        >
          <Character
            pose="happy"
            scale={1.15}
            side="left"
          />
        </motion.div>

      </div>

    </main>
  );
}