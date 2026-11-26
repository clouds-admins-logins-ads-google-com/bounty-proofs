import { Hono } from 'hono'

import { app as api } from '../api/app'

// The Cloudflare Worker in front of the app. The JSON routes live in
// src/api/app.ts so the same code runs on Vercel too; this file only adds the
// static-asset fallback.
type Env = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

app.route('/', api)

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
