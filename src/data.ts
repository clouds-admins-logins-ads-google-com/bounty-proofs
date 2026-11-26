// Every string the site shows. Edit this file first.

export const BRAND = {
  name: 'BountyProofs',
  tagline: 'PoC bug bounty dan CVE terbaru, satu tempat.',
}

export const NAV = [
  { label: 'PoC', to: '/#arsip' },
  { label: 'CVE', to: '/#cve' },
  { label: 'Tentang', to: '/#tentang' },
] as const

export const HOME = {
  eyebrow: 'BountyProofs / 2026',
  title: ['Proof of concept bug bounty,', 'dan CVE', 'yang perlu kamu tahu.'],
  body: 'Kumpulan PoC yang bisa dijalankan ulang, catatan triage, dan ringkasan CVE terbaru. Semua ditulis sebagai file markdown di satu folder, tanpa panel admin.',
  scroll: 'Lihat PoC',
  cveEyebrow: 'CVE terbaru',
  cveTitle: 'Yang sedang ramai',
  cveBody: 'Ringkasan singkat, CVSS, dan tautan ke NVD. Daftar ini diedit manual di src/data.ts.',
  cveNote: 'Klik salah satu untuk membaca ringkasannya dulu; tautan NVD ada di akhir artikel.',
  listEyebrow: 'PoC',
  listTitle: 'Proof of concept terbaru',
}

export const ART = {
  caption: 'poc.txt · bukti, bukan klaim',
}

export type Cve = {
  id: string
  title: string
  vendor: string
  date: string
  cvss: number
  severity: 'Kritis' | 'Tinggi' | 'Sedang'
  slug: string
}

export const CVES: Cve[] = [
  {
    id: 'CVE-2024-6387',
    title: 'regreSSHion: race condition di sshd yang berujung eksekusi kode root',
    vendor: 'OpenSSH',
    date: '2024-07-01',
    cvss: 8.1,
    severity: 'Tinggi',
    slug: 'cve-2024-6387-regresshion',
  },
  {
    id: 'CVE-2024-3094',
    title: 'Backdoor di xz/liblzma 5.6.0–5.6.1, disisipkan lewat tarball rilis',
    vendor: 'xz-utils',
    date: '2024-03-29',
    cvss: 10.0,
    severity: 'Kritis',
    slug: 'cve-2024-3094-xz-backdoor',
  },
  {
    id: 'CVE-2023-4863',
    title: 'Heap buffer overflow di libwebp saat mendekode gambar WebP lossless',
    vendor: 'libwebp',
    date: '2023-09-12',
    cvss: 8.8,
    severity: 'Tinggi',
    slug: 'cve-2023-4863-libwebp',
  },
  {
    id: 'CVE-2022-22965',
    title: 'Spring4Shell: data binding di Spring MVC membuka jalan ke remote code execution',
    vendor: 'Spring Framework',
    date: '2022-04-01',
    cvss: 9.8,
    severity: 'Kritis',
    slug: 'cve-2022-22965-spring4shell',
  },
  {
    id: 'CVE-2021-44228',
    title: 'Log4Shell: JNDI lookup di pesan log yang bisa dipicu dari input pengguna',
    vendor: 'Apache Log4j',
    date: '2021-12-10',
    cvss: 10.0,
    severity: 'Kritis',
    slug: 'cve-2021-44228-log4shell',
  },
]

export const ABOUT = {
  eyebrow: 'Tentang',
  title: 'Bukti dulu, klaim belakangan.',
  body: [
    'BountyProofs adalah catatan kerja saya saat menguji program bug bounty: langkah reproduksi, request yang dipakai, dan alasan sebuah temuan dianggap valid. Tujuannya supaya orang lain bisa mengulang hasilnya, bukan cuma percaya pada screenshot.',
    'Setiap tulisan adalah satu file .md di folder articles/. Daftar CVE ada di src/data.ts. Tidak ada database, tidak ada panel admin, dan tidak ada data peneliti lain yang disimpan di sini.',
  ],
  facts: [
    { label: 'Fokus', value: 'Web & infra' },
    { label: 'Format PoC', value: 'Markdown' },
    { label: 'Panel admin', value: 'Tidak ada' },
  ],
}

export const FOOTER = {
  blurb: 'PoC bug bounty dan ringkasan CVE, ditulis ulang supaya bisa diverifikasi sendiri.',
  columns: [
    { title: 'Situs', links: [['PoC', '/#arsip'], ['CVE', '/#cve'], ['Tentang', '/#tentang']] },
    { title: 'Lainnya', links: [['Status', '/api/health']] },
  ],
  legal: '© 2026 bountyproofs.com',
}
