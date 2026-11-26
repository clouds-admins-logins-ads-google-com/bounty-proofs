import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

import { Badge } from '@/components/LabelChip'
import { articles, formatDate, getArticle, slugify } from '@/lib/articles'
import { DUR, EASE } from '@/lib/motion'
import { Link } from '@/lib/router'
import { SiteFooter, SiteNav } from './Home'
import { NotFound } from './NotFound'

const GUTTER = 'px-4 sm:px-9'

export function ArticlePage({ slug }: { slug: string }) {
  const article = getArticle(slug)
  if (!article) return <NotFound />

  const index = articles.findIndex((a) => a.slug === slug)
  const newer = index > 0 ? articles[index - 1] : null
  const older = index < articles.length - 1 ? articles[index + 1] : null

  return (
    <div className="min-h-dvh bg-bg">
      <SiteNav />
      <main>
        <article className={GUTTER + ' pt-14 pb-20'}>
          <Link
            to="/"
            className="inline-flex min-h-10 items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> Semua tulisan
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE.out }}
            className="mt-8 max-w-[760px] border-t border-line pt-8"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden>·</span>
              <span>{article.minutes} menit baca</span>
              {article.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="mt-5 text-[36px] leading-[1.06] font-semibold tracking-[-0.04em] text-balance sm:text-[48px]">
              {article.title}
            </h1>
            {article.excerpt && <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-muted">{article.excerpt}</p>}
          </motion.header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,68ch)_1fr]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.slow, delay: 0.1, ease: EASE.out }}
              className="article-body min-w-0"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
            <aside className="hidden lg:block">
              <div className="sticky top-24 border border-line bg-surface p-5">
                <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Di halaman ini</p>
                <nav className="mt-4 flex flex-col gap-1" aria-label="Daftar isi">
                  {headings(article.html).map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="border-l border-line py-1.5 pl-3 text-[13px] leading-snug text-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </article>

        <nav className={GUTTER + ' border-t border-line py-10'} aria-label="Artikel lain">
          <div className="grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link to={`/artikel/${older.slug}`} className="group border border-line bg-surface p-6 transition-colors hover:bg-surface-2">
                <span className="font-mono text-[11px] text-muted">← Sebelumnya</span>
                <p className="mt-3 text-[18px] leading-snug font-medium tracking-[-0.02em]">{older.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link to={`/artikel/${newer.slug}`} className="group border border-line bg-surface p-6 text-right transition-colors hover:bg-surface-2">
                <span className="font-mono text-[11px] text-muted">Berikutnya →</span>
                <p className="mt-3 text-[18px] leading-snug font-medium tracking-[-0.02em]">{newer.title}</p>
              </Link>
            )}
          </div>
          <Link to="/" className="mt-8 inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowRight className="size-4" aria-hidden /> Kembali ke arsip
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  )
}

/** Headings in the rendered markdown, for the small table of contents. */
function headings(html: string) {
  const out: { id: string; text: string }[] = []
  const pattern = /<h2[^>]*>([\s\S]*?)<\/h2>/g
  let match: RegExpExecArray | null
  while ((match = pattern.exec(html))) {
    const text = match[1].replace(/<[^>]+>/g, '').trim()
    const id = slugify(text)
    out.push({ id, text })
  }
  return out
}

