# Getting Started - Pejuang Bangsa Indonesia

Game kuis edukasi Indonesia siap pakai! Ikuti panduan ini untuk menjalankan atau deploy game.

## ⚡ 5 Menit Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Local Server
```bash
pnpm dev
```

### 3. Open Browser
Buka `http://localhost:3000` dan mulai bermain!

---

## 🚀 Deploy ke Vercel (Recommended)

### Cara 1: Auto-Deploy dari GitHub (Easiest)
```bash
# 1. Push ke GitHub
git push origin main

# 2. Go to vercel.com/new
# 3. Select your repo
# 4. Click "Deploy"
# Done! ✓
```

### Cara 2: Direct Deploy dengan CLI
```bash
npm install -g vercel
vercel --prod
```

### Cara 3: Manual Upload
1. Build project: `pnpm build`
2. Go to https://vercel.com/new
3. Upload folder
4. Deploy

---

## 📱 Test dalam Browser

### Desktop (Best Experience)
- Chrome, Firefox, Safari, Edge
- Landscape orientation recommended
- Full quality graphics

### Mobile/Tablet
- Responsive design bekerja di semua ukuran
- Portrait mode tersedia
- Touch-friendly buttons

---

## 🎮 Cara Main

1. **Home Screen** → Klik tombol "PLAY"
2. **Instructions** → Baca petunjuk → Klik "MULAI"
3. **Game** → 
   - Lihat gambar pahlawan
   - Pilih jawaban dalam 50 detik
   - Jawab benar = dapat poin
4. **Results** → Lihat skor final
   - Klik "MAIN LAGI" untuk ulang
   - Atau "BERANDA" untuk home

---

## 📊 Game Settings

Edit `/app/game/page.tsx`:
```typescript
const TOTAL_TIME = 50;  // Waktu per soal (detik)
```

Edit `/data/heroes.ts` untuk menambah/mengubah pahlawan.

---

## 🎨 Customization

### Ubah Warna
Edit `/app/globals.css` → `:root` section:
```css
--primary: #f97316;      /* Orange */
--secondary: #22c55e;    /* Green */
--accent: #fbbf24;       /* Yellow */
```

### Ubah Background
Replace images di:
- `/public/backgrounds/home-bg.jpg` → Home page
- `/public/backgrounds/game-bg.jpg` → Game page
- `/public/backgrounds/results-bg.jpg` → Results page

### Tambah Sound
Simpan audio files di `/public/sounds/`:
- `click.mp3`
- `correct.mp3`
- `wrong.mp3`
- `timeout.mp3`

---

## 📦 Build & Deploy

### Production Build
```bash
# Build
pnpm build

# Test locally
pnpm start
```

### Deploy Commands
```bash
# Vercel CLI
vercel

# GitHub Actions (auto-deploy)
git push origin main

# Netlify (alternative)
netlify deploy --prod
```

---

## ✅ Project Ready Checklist

- ✓ 20 pahlawan Indonesia dengan gambar & deskripsi
- ✓ 50 detik timer per soal dengan countdown visual
- ✓ Scoring system otomatis (5 - waktu/10 poin)
- ✓ Beautiful animations (Framer Motion)
- ✓ Glossy modern UI design
- ✓ Fully responsive (desktop, tablet, mobile)
- ✓ Offline capable (no internet needed)
- ✓ Dark mode ready
- ✓ SEO optimized metadata
- ✓ Production-ready code

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Icons**: Lucide React
- **Fonts**: Fredoka, Baloo 2 (Google Fonts)
- **State**: Context API
- **Deployment**: Vercel (recommended) or any Node.js host

---

## 📞 Troubleshooting

### Dev server tidak jalan?
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9

# Start ulang
pnpm dev
```

### Gambar pahlawan tidak muncul?
- Check `/public/heroes/` folder exists
- Pastikan image URLs valid di `data/heroes.ts`

### Build error?
```bash
# Clean cache
rm -rf .next node_modules pnpm-lock.yaml

# Reinstall
pnpm install
pnpm build
```

---

## 🎯 Next Steps

1. **Customize** colors, fonts, background di `globals.css`
2. **Add Sound** files ke `/public/sounds/`
3. **Deploy** ke Vercel dalam 1 klik
4. **Share** dengan teman dan keluarga!
5. **Iterate** - tambah fitur, pahlawan baru, level sulit

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Vercel Deployment](https://vercel.com/docs)

---

Selamat bermain dan belajar! 🇮🇩
