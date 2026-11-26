---
title: Anatomi laporan bug bounty yang cepat diterima
date: 2026-11-10
excerpt: Temuan bagus bisa tenggelam karena laporan yang bertele-tele. Struktur enam bagian ini yang membuat triager tidak perlu bertanya balik.
tags: triage, laporan, proses
---

Setelah beberapa puluh laporan, polanya cukup jelas: yang menentukan bukan kepintaran payload, tapi seberapa cepat triager bisa mereproduksi temuanmu.

## Enam bagian

1. **Ringkasan satu paragraf.** Apa yang bisa dilakukan penyerang, terhadap siapa, dan dalam kondisi apa.
2. **Langkah reproduksi.** Bernomor, tanpa lompatan logika. Kalau perlu akun, sebutkan perannya.
3. **Request mentah.** Salin apa adanya, termasuk header dan cookie yang relevan (redaksi token).
4. **Bukti.** Satu screenshot atau output yang menunjukkan dampak, bukan satu folder penuh.
5. **Dampak.** Jelaskan dalam bahasa produk, bukan bahasa CWE. "Pengguna lain bisa membaca invoice" lebih berguna daripada "IDOR".
6. **Perbaikan yang disarankan.** Satu-dua kalimat. Ini yang membuat laporan terasa membantu, bukan menuntut.

## Yang sering bikin laporan ditolak

- Bukti hanya berupa video 4 menit tanpa timestamp.
- Payload ditulis setengah, "sisanya rahasia".
- Dampak digelembungkan jadi RCE padahal cuma reflected XSS.
- Duplikat: tidak memeriksa laporan publik sebelumnya.

## Kebiasaan kecil yang membantu

Simpan template laporan di editor. Isi bagian request dan bukti lebih dulu, ringkasan terakhir. Dengan begitu, kalimat pembuka selalu akurat dan tidak ada klaim yang tidak didukung bagian lain.

Terakhir: tulis seolah pembacanya tidak punya akses ke sistemmu. Kalau laporan masih bisa dipahami tanpa kamu jelaskan lewat chat, itu tanda strukturnya sudah benar.
