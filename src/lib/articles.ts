import { marked } from 'marked'

/*
  Articles are plain markdown files in /articles. Vite inlines them at build
  time (raw text), so there is no fetch, no database and no admin page: add a
  file, and it appears.

  Frontmatter is a small `---` block at the top:
    title: ...      (required)
    date: 2026-11-24
    excerpt: ...
    tags: desain, animasi
*/

export type Article = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  html: string
  minutes: number
}

const sources = import.meta.glob('/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source)
  const fields: Record<string, string> = {}
  let body = source
  if (match) {
    body = source.slice(match[0].length)
    for (const line of match[1].split(/\r?\n/)) {
      const at = line.indexOf(':')
      if (at < 1) continue
      const key = line.slice(0, at).trim().toLowerCase()
      const value = line
        .slice(at + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '')
      fields[key] = value
    }
  }
  const tags = (fields.tags ?? '')
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
  return { fields, tags, body }
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')

/** marked does not emit heading ids; the article page's mini table of contents needs them. */
function withHeadingIds(html: string) {
  return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, level: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim()
    return `<h${level} id="${slugify(text)}">${inner}</h${level}>`
  })
}

function readingMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export const articles: Article[] = Object.entries(sources)
  .map(([path, source]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { fields, tags, body } = parseFrontmatter(source)
    return {
      slug,
      title: fields.title ?? slug.replace(/-/g, ' '),
      date: fields.date ?? '1970-01-01',
      excerpt: fields.excerpt ?? '',
      tags,
      html: withHeadingIds(marked.parse(body, { async: false }) as string),
      minutes: readingMinutes(body),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  )
