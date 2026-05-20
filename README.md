# Pejuang Bangsa Indonesia - Game Kuis Edukasi Interaktif

Game kuis edukasi interaktif untuk anak-anak tentang pahlawan Indonesia. Dibangun dengan Next.js 14, Tailwind CSS, dan Framer Motion.

## 🎮 Fitur Utama

- **20 Pahlawan Indonesia** - Kuiz interaktif dengan gambar dan 4 pilihan jawaban
- **50 Detik per Soal** - Timer yang dinamis dengan indikator warna
- **Scoring System** - Poin otomatis berdasarkan kecepatan menjawab
- **Animasi Halus** - Transisi mulus menggunakan Framer Motion
- **Sound Effects** - Efek suara untuk interaksi (click, correct, wrong, timeout)
- **Fully Responsive** - Optimal untuk desktop, tablet, dan mobile
- **Offline Capable** - Tidak perlu koneksi internet, semua data lokal
- **Colorful UI** - Desain ceria, glossy modern dengan nuansa edukasi anak

## 📋 Halaman Game

1. **Home Screen** - Halaman utama dengan tombol PLAY
2. **Instructions** - Panduan cara bermain dengan detail lengkap
3. **Game Screen** - Halaman kuis interaktif dengan timer dan scoring
4. **Results Screen** - Hasil akhir dengan statistik lengkap

## 🚀 Setup dan Instalasi

### Prerequisites
- Node.js 18+ (direkomendasikan 20+)
- npm, pnpm, atau yarn sebagai package manager
- Browser modern (Chrome, Firefox, Safari, Edge)

### Quick Start (Recommended)

```bash
# 1. Install dependencies
pnpm install

# 2. Run development server
pnpm dev

# 3. Open in browser
# http://localhost:3000
```

### Build for Production

```bash
# Build production bundle
pnpm build

# Test production build locally
pnpm start
```

### Deploy to Vercel (1-Click Deploy)

1. **Option A: Direct Deploy (Fastest)**
   - Go to https://vercel.com/new
   - Import this project
   - Click "Deploy"
   - Done! Your game is live

2. **Option B: Git-based Deploy (Recommended)**
   - Push to GitHub
   - Connect repo to Vercel
   - Auto-deploys on every push

3. **Option C: CLI Deploy**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

## 📁 Struktur Folder

```
/app
  /game          - Halaman game utama
  /instructions  - Halaman petunjuk
  /results       - Halaman hasil akhir
  layout.tsx     - Root layout dengan GameProvider
  page.tsx       - Home screen
  globals.css    - Global styling dan Tailwind config
  
/components
  GameButton.tsx        - Tombol glossy untuk game
  AnswerButton.tsx      - Tombol pilihan jawaban
  TimerCircle.tsx       - Timer circular progress
  ScoreBadge.tsx        - Badge untuk skor dan info
  AnimatedCloud.tsx     - Animasi awan bergerak
  BackgroundScene.tsx   - Background dengan awan dan dekorasi
  Character.tsx         - Karakter anak Indonesia cartoon
  Confetti.tsx          - Efek confetti saat jawaban benar

/context
  GameContext.tsx       - Global state management

/data
  heroes.ts            - Data 20 pahlawan Indonesia

/public
  /sounds              - File audio (belum ada, bisa ditambahkan)
  /heroes              - Gambar pahlawan (bisa dikustomisasi)
```

## 🎨 Customization

### Mengganti Data Pahlawan

Edit `/data/heroes.ts`:

```typescript
export const heroes: Hero[] = [
  {
    id: 1,
    name: "Nama Pahlawan",
    image: "url_gambar",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
    description: "Deskripsi pahlawan"
  },
  // ...
];
```

### Menambah Sound Effects

Tambahkan file audio ke `/public/sounds/`:
- `click.mp3` - Sound saat klik tombol
- `correct.mp3` - Sound saat jawaban benar
- `wrong.mp3` - Sound saat jawaban salah
- `timeout.mp3` - Sound saat waktu habis
- `bgm.mp3` - Background music (optional)

### Mengubah Warna dan Tema

Edit `/app/globals.css` untuk mengubah color tokens:

```css
:root {
  --primary: #f97316;      /* Orange */
  --secondary: #22c55e;    /* Green */
  --accent: #fbbf24;       /* Yellow */
  /* ... */
}
```

### Mengubah Font

Edit `/app/layout.tsx`:

```typescript
import { Fredoka, Baloo_2 } from 'next/font/google'
// Ganti dengan font lain dari Google Fonts
```

## ⏱️ Game Settings

Edit `/app/game/page.tsx` untuk mengubah:

```typescript
const TOTAL_TIME = 50;  // Waktu per soal (detik)
const ANSWER_OPTIONS = ['A', 'B', 'C', 'D'];  // Label jawaban
```

## 📊 Scoring System

```
- Jawaban Benar: 5 - floor(timeUsed / 10) poin
  - Dijawab 0-10 detik: 5 poin
  - Dijawab 10-20 detik: 4 poin
  - Dijawab 20-30 detik: 3 poin
  - dst...
  
- Jawaban Salah: 0 poin
- Timeout: 0 poin
```

## 🎯 Performance Tips

- Semua gambar pahlawan diambil dari URL eksternal (Wikimedia)
- Bisa di-cache untuk performa lebih baik
- Animasi Framer Motion sudah dioptimasi
- Next.js Image component bisa digunakan untuk gambar lokal

## 🌐 Deployment ke Vercel

```bash
# 1. Push ke GitHub
git push origin main

# 2. Connect repo ke Vercel
# https://vercel.com/new

# 3. Auto-deploy setiap push
```

Atau deploy langsung:

```bash
vercel
```

## 📱 Responsive Breakpoints

- **Mobile**: Semua screen < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (landscape optimal)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3+
- **Animation**: Framer Motion 12+
- **Icons**: Lucide React
- **Language**: TypeScript
- **Font**: Fredoka & Baloo 2 (Google Fonts)
- **State**: React Context API

## 📝 Lisensi

Dibuat sebagai game edukasi gratis untuk sekolah Indonesia.

## 🤝 Kontribusi

Untuk menambah pahlawan, fitur, atau improvement:
1. Fork repository
2. Buat branch baru
3. Commit changes
4. Push dan buat Pull Request

## ⚠️ Notes

- Gambar pahlawan dari Wikimedia Commons (Public Domain)
- Beberapa gambar mungkin tidak tersedia, akan menampilkan placeholder
- Sound effects belum tersedia di template default
- Bisa ditambahkan kemudian sesuai kebutuhan

## 📞 Support

Untuk pertanyaan atau issue:
- Buka GitHub Issues
- Hubungi tim development

---

Dibuat dengan ❤️ untuk pendidikan anak Indonesia!
