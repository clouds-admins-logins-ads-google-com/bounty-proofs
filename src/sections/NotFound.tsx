import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/Button'
import { navigate } from '@/lib/router'
import { SiteFooter, SiteNav } from './Home'
import { IsoStack } from './IsoStack'

/** 404 for unknown routes. */
export function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <SiteNav />
      <main className="relative flex flex-1 items-center overflow-hidden px-6 py-24 sm:px-12">
        <IsoStack className="absolute top-1/2 right-[-140px] h-[520px] w-[620px] -translate-y-1/2 opacity-50 max-md:opacity-20" />
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative max-w-lg">
          <p className="font-mono text-sm text-muted">ERR-404 · Halaman tidak ditemukan</p>
          <h1 className="mt-5 text-[44px] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-[60px]">
            Tulisan ini tidak ada di folder.
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            <span className="font-mono text-fg/90">{window.location.pathname}</span> tidak cocok dengan file markdown mana pun. Mungkin sudah diganti nama, atau tautannya salah.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" iconRight={<ArrowRight className="size-[18px]" />} onClick={() => navigate('/')}>
              Ke arsip
            </Button>
            <Button variant="outline" size="lg" icon={<ArrowLeft className="size-[18px]" />} onClick={() => window.history.back()}>
              Kembali
            </Button>
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
