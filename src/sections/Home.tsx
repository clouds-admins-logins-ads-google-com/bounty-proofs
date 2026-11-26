import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

import { AsciiArt } from '@/components/AsciiArt'
import { Button, ButtonLink } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { Badge } from '@/components/LabelChip'
import { SectionHead } from '@/components/Section'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ABOUT, ART, CVES, FOOTER, HOME, NAV } from '@/data'
import { articles, formatDate } from '@/lib/articles'
import { EASE } from '@/lib/motion'
import { Link, navigate } from '@/lib/router'
import { IsoStack } from './IsoStack'

const GUTTER = 'px-4 sm:px-9'

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className={GUTTER + ' flex h-16 items-center justify-between'}>
        <Link to="/" aria-label="BountyProofs home" className="-ml-1 px-1 py-2">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hidden h-10 items-center px-3 text-[15px] text-muted transition-colors hover:text-fg sm:inline-flex"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className={'border-t border-line pt-16 pb-10 ' + GUTTER}>
      <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(2,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{FOOTER.blurb}</p>
        </div>
        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{col.title}</p>
            <ul className="mt-4 flex flex-col">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith('/api') ? (
                    <a href={href} className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-fg">
                      {label}
                    </a>
                  ) : (
                    <Link to={href} className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-fg">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-muted">
        <span>{FOOTER.legal}</span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 bg-done" aria-hidden /> Semua sistem normal
        </span>
      </div>
    </footer>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute top-[-90px] right-[-160px] h-[460px] w-[520px] opacity-30 max-lg:hidden">
        <IsoStack className="h-full w-full" />
      </div>
      <div className={GUTTER + ' relative grid gap-14 pt-20 pb-16 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-10'}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.out }}
            className="font-mono text-xs tracking-[0.16em] text-muted uppercase"
          >
            {HOME.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: EASE.out }}
            className="mt-6 max-w-[15ch] text-[42px] leading-[1.05] font-semibold tracking-[-0.04em] text-balance sm:text-[54px] lg:text-[60px]"
          >
            {HOME.title.map((line, index) => (
              <span key={line} className={index === HOME.title.length - 1 ? 'text-muted' : undefined}>
                {line}{' '}
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE.out }}
            className="mt-8 max-w-[52ch] text-[17px] leading-[1.7] text-muted"
          >
            {HOME.body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE.out }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink to="/#arsip" variant="primary" iconRight={<ArrowRight className="size-[18px]" strokeWidth={1.8} />}>
              {HOME.scroll}
            </ButtonLink>
            <ButtonLink to="/#tentang" variant="outline">
              Tentang
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: EASE.out }}
          className="lg:justify-self-end"
        >
          <div className="w-full max-w-[420px] border border-line bg-surface">
            <div className="flex h-9 items-center gap-2 border-b border-line px-3">
              <span className="size-1.5 bg-line-strong" aria-hidden />
              <span className="size-1.5 bg-line-strong" aria-hidden />
              <span className="size-1.5 bg-line-strong" aria-hidden />
              <span className="ml-2 font-mono text-[11px] text-muted">poc.txt</span>
            </div>
            <div className="hatch relative px-3 py-6 sm:px-5 sm:py-7">
              <AsciiArt />
              <div className="relative mt-5 text-center font-mono text-[10px] text-muted">
                <span className="animate-blink">▍</span> {ART.caption}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CveSection() {
  return (
    <section id="cve" className={GUTTER + ' scroll-mt-16 border-b border-line py-20'}>
      <SectionHead eyebrow={HOME.cveEyebrow} title={HOME.cveTitle} body={HOME.cveBody} />
      <ul className="mt-10 border-t border-line">
        {CVES.map((cve) => (
          <li key={cve.id} className="group relative border-b border-line">
            <div
              className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              aria-hidden
            />
            <Link
              to={`/artikel/${cve.slug}`}
              className="relative grid gap-3 px-1 py-5 sm:grid-cols-[190px_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:px-4"
            >
              <span className="font-mono text-[13px] text-fg underline decoration-line-strong underline-offset-4 transition-colors group-hover:decoration-fg">
                {cve.id}
              </span>
              <div className="min-w-0">
                <p className="text-[15px] leading-snug">{cve.title}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {cve.vendor} · {formatDate(cve.date)}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <Badge>{cve.severity}</Badge>
                <span className="font-mono text-[11px] text-muted tabular-nums">CVSS {cve.cvss.toFixed(1)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[11px] text-muted">{HOME.cveNote}</p>
    </section>
  )
}

function ArticleRow({ article, index }: { article: (typeof articles)[number]; index: number }) {
  const number = String(articles.length - index).padStart(2, '0')
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2), ease: EASE.out }}
      className="group relative border-b border-line"
    >
      <div className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
      <Link to={`/artikel/${article.slug}`} className="relative flex flex-col gap-3 px-1 py-8 sm:flex-row sm:items-baseline sm:gap-8 sm:px-4">
        <span className="font-mono text-xs text-faint tabular-nums">{number}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.minutes} menit baca</span>
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h3 className="mt-3 text-[23px] leading-[1.2] font-medium tracking-[-0.025em] transition-colors group-hover:text-fg sm:text-[26px]">
            {article.title}
          </h3>
          <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-muted">{article.excerpt}</p>
        </div>
        <span className="hidden shrink-0 self-center text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block">
          <ArrowUpRight className="size-5" strokeWidth={1.6} aria-hidden />
        </span>
      </Link>
    </motion.li>
  )
}

function Archive() {
  return (
    <section id="arsip" className={GUTTER + ' scroll-mt-16 border-b border-line py-20'}>
      <SectionHead eyebrow={HOME.listEyebrow} title={HOME.listTitle} body={`${articles.length} tulisan, diurutkan dari yang terbaru.`} />
      <ul className="mt-10 border-t border-line">
        {articles.map((article, index) => (
          <ArticleRow key={article.slug} article={article} index={index} />
        ))}
      </ul>
    </section>
  )
}

function About() {
  return (
    <section id="tentang" className={GUTTER + ' scroll-mt-16 py-20'}>
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{ABOUT.eyebrow}</p>
          <h2 className="mt-4 max-w-[24ch] text-[32px] leading-[1.1] font-semibold tracking-[-0.035em] text-balance sm:text-[40px]">
            {ABOUT.title}
          </h2>
          {ABOUT.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-5 max-w-[62ch] text-[16px] leading-[1.75] text-muted">
              {paragraph}
            </p>
          ))}
          <div className="mt-9">
            <Button variant="outline" iconRight={<ArrowRight className="size-4" />}               onClick={() => articles[0] && navigate(`/artikel/${articles[0].slug}`)}>
              Mulai dari yang terbaru
            </Button>
          </div>
        </div>
        <div className="border border-line bg-surface">
          <div className="flex h-9 items-center border-b border-line px-4">
            <span className="font-mono text-[11px] text-muted">tentang.txt</span>
          </div>
          <div className="px-5 py-6">
            <pre className="font-mono text-[10px] leading-[1.7] text-muted sm:text-[11px]">{`> siapa ini?
  penulis, bukan admin

> isinya apa?
  catatan pendek

> admin panel?
  404 not found`}</pre>
            <dl className="mt-7 border-t border-line">
              {ABOUT.facts.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between border-b border-line py-3">
                  <dt className="text-[13px] text-muted">{fact.label}</dt>
                  <dd className="font-mono text-[13px]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <div className="min-h-dvh bg-bg">
      <SiteNav />
      <main>
        <Hero />
        <CveSection />
        <Archive />
        <About />
      </main>
      <SiteFooter />
    </div>
  )
}
