import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'

// The JSON API, shared by the Cloudflare Worker (src/worker/index.ts) and the
// Vercel Edge Function (api/[...route].ts). It has no platform bindings, so it
// runs unchanged on both.
export const app = new Hono()

app.use('/api/*', bodyLimit({ maxSize: 16 * 1024, onError: (c) => c.json({ error: 'Request is too large.' }, 413) }))

app.get('/api/health', (c) => c.json({ ok: true }))

// Changelog subscription from the landing page. Wire this to your email
// provider or a database; it currently validates and acknowledges.
app.post('/api/subscribe', async (c) => {
  const body = await c.req.json<{ email?: unknown }>().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return c.json({ error: 'Enter a valid email address.' }, 400)
  }
  return c.json({ ok: true, demo: true })
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))
