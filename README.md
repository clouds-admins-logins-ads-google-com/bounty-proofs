# BountyProofs

Situs PoC bug bounty dan ringkasan CVE: hampir hitam, sudut siku, garis rambut
satu piksel. Beranda berisi daftar CVE terbaru dan daftar PoC; setiap tulisan
dibaca di `/artikel/<slug>`.

Tidak ada panel admin dan tidak ada database. PoC adalah file `.md` di
`articles/`, daftar CVE ada di `src/data.ts`.

## Menjalankan

```sh
bun install
bun run dev        # http://localhost:5189 (Vite + Worker di workerd)
bun run build      # dist/client (aset) + dist/bug_tracker/index.js (Worker)
bun run typecheck
bun test           # tes untuk route /api/*
```

## Menambah PoC

Buat satu file di `articles/`, misalnya `articles/poc-idor-invoice.md`:

```markdown
---
title: Judul tulisan
date: 2026-11-24
excerpt: Satu kalimat yang muncul di daftar beranda.
tags: poc, web, idor
---

Isi tulisan dalam markdown biasa.
```

Nama file menjadi slug (`/artikel/poc-idor-invoice`). Urutan di beranda mengikuti
`date` terbaru lebih dulu. `title` wajib; sisanya opsional.

Markdown diubah ke HTML saat build oleh `marked` (`src/lib/articles.ts`), dan
heading `h2`/`h3` otomatis mendapat `id` untuk daftar isi di samping artikel.
Isi dibaca lewat `import.meta.glob('/articles/*.md', { query: '?raw' })`, jadi
tidak ada permintaan jaringan untuk isi tulisan.

## Mengubah daftar CVE

Semua ada di `CVES` pada `src/data.ts`:

```ts
{
  id: 'CVE-2024-3094',
  title: 'Backdoor di xz/liblzma 5.6.0–5.6.1',
  vendor: 'xz-utils',
  date: '2024-03-29',
  cvss: 10.0,
  severity: 'Kritis', // 'Kritis' | 'Tinggi' | 'Sedang'
  slug: 'cve-2024-3094-xz-backdoor', // nama file di articles/
}
```

`slug` menunjuk ke artikel PoC milik sendiri, jadi klik di beranda membuka
artikel di situs ini dulu, bukan langsung ke NVD. Tambah, hapus, atau urutkan
ulang entri di array itu; beranda menampilkannya sesuai urutan array. Tidak ada
pengambilan otomatis dari NVD.

## Deploy ke Vercel

Repo ini sudah punya `vercel.json`, jadi tidak perlu konfigurasi manual di
dashboard:

- **Framework**: Vite
- **Install Command**: `bun install`
- **Build Command**: `bun run build:vercel`
- **Output Directory**: `dist/client`

Cara pakai:

1. Push folder ini ke GitHub/GitLab, lalu **Add New → Project** di Vercel dan
   import repo-nya. Semua setelan di atas terbaca dari `vercel.json`.
2. Atau lewat CLI: `bunx vercel` (preview) dan `bunx vercel --prod`.

Tidak ada environment variable yang dibutuhkan. API `/api/*` dilayani Edge
Function `api/[...route].ts` yang memakai Hono app yang sama dengan Worker
Cloudflare (`src/api/app.ts`), dan semua rute lain jatuh ke `index.html` supaya
`/artikel/<slug>` bisa dibuka langsung.

Build Cloudflare tetap utuh: `bun run build` masih menghasilkan `dist/client` +
`dist/bug_tracker/index.js` untuk `deploy.json`.

## Struktur

- `src/data.ts` — semua teks situs, daftar `CVES`, dan data ASCII.
- `src/lib/articles.ts` — pembaca frontmatter, render markdown, tanggal, estimasi
  waktu baca.
- `src/sections/Home.tsx` — navigasi, footer, hero, daftar CVE, daftar PoC, tentang.
- `src/sections/Article.tsx` — halaman artikel, daftar isi, artikel sebelum/berikutnya.
- `src/sections/NotFound.tsx` — halaman 404.
- `src/components/AsciiArt.tsx` — ASCII statis di hero; gambarnya di
  `src/components/asciiFigure.ts`, tempel ulang isi `ASCII_ART` untuk mengganti.
- `src/api/app.ts` — route JSON: `/api/health`, `/api/subscribe` (contoh form),
  JSON 404 untuk `/api/*` lain. Dipakai Worker maupun Vercel.
- `src/worker/index.ts` — pembungkus Cloudflare: API + fallback aset SPA.
- `api/[...route].ts` — Edge Function Vercel untuk `/api/*`.

## Desain

Token warna ada di `src/styles.css` sebagai CSS variable per tema (`:root` dan
`[data-theme='light']`), dibaca Tailwind lewat `@theme inline`, jadi `bg-surface`,
`border-line`, `text-muted` ikut tema tanpa varian `dark:`. Semua sudut siku
kecuali bingkai tangkapan layar. Gaya isi artikel ada di `.article-body`.

Font: Geist dan Geist Mono dari Google Fonts (`index.html`).
