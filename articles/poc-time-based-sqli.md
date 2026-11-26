---
title: PoC blind SQL injection berbasis waktu yang tidak bikin server down
date: 2026-11-18
excerpt: Cara membuktikan SQL injection tanpa mengekstrak data dan tanpa sleep 30 detik: satu perbandingan waktu, satu kontrol, satu screenshot.
tags: poc, web, sqli
---

Bug bounty sering menolak laporan SQL injection karena buktinya cuma "ada error 500". Padahal cukup satu perbandingan waktu yang terkontrol untuk membuktikan injeksi benar-benar tereksekusi.

## Sinyal yang dicari

Parameter yang dicurigai: `sort` pada endpoint daftar produk.

```
GET /api/products?sort=price HTTP/1.1
Host: target.example
```

Uji pertama bukan payload, tapi baseline. Kirim permintaan yang sama lima kali, catat waktu responsnya. Variasi normal biasanya di bawah 100 ms.

## Payload pembeda

```
sort=price,(SELECT 1 FROM (SELECT SLEEP(3))a)
```

Kalau respons konsisten melompat ke ~3 detik sementara baseline tetap cepat, itu bukti eksekusi. Yang penting: **selalu kirim kontrol** dengan nilai yang tidak memicu `SLEEP`, misalnya `sort=price`. Tanpa kontrol, lambat bisa saja karena jaringan.

## Batasi risikonya

- Gunakan `SLEEP(2)` atau `SLEEP(3)`, jangan lebih.
- Maksimal tiga permintaan per pengujian.
- Jangan pakai `BENCHMARK` berulang atau query berat.
- Jangan mengekstrak data pengguna; bukti eksekusi sudah cukup untuk triage.

## Yang dimasukkan ke laporan

1. Request lengkap (baseline dan payload).
2. Waktu respons keduanya, minimal tiga kali pengujian.
3. Dampak: parameter masuk ke `ORDER BY` tanpa whitelist.
4. Saran perbaikan: whitelist kolom yang boleh dipakai untuk sorting.

Laporan seperti ini biasanya lolos triage tanpa perlu eskalasi ke ekstraksi data, dan itu lebih aman untuk semua pihak.
