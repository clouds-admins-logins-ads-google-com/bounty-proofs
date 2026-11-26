import { useEffect } from 'react'

import { BRAND } from './data'
import { articles, getArticle } from './lib/articles'
import { useLocation } from './lib/router'
import { ArticlePage } from './sections/Article'
import { Home } from './sections/Home'
import { NotFound } from './sections/NotFound'

export function App() {
  const { pathname } = useLocation()
  const slug = pathname.startsWith('/artikel/') ? decodeURIComponent(pathname.slice('/artikel/'.length)) : null
  const article = slug ? getArticle(slug) : null

  useEffect(() => {
    const name = BRAND.name
    if (pathname === '/') document.title = `${name} — PoC bug bounty dan CVE terbaru`
    else if (article) document.title = `${article.title} · ${name}`
    else document.title = `Tidak ditemukan · ${name}`
  }, [pathname, article])

  return (
    <>
      {pathname === '/' ? <Home /> : article ? <ArticlePage slug={article.slug} /> : <NotFound />}
      <noscript>{`${articles.length} PoC tersedia.`}</noscript>
    </>
  )
}
