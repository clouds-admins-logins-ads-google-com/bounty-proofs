import { app } from '../src/api/app'

// Vercel Edge Function for /api/*. The static site itself is built by
// `bun run build:vercel` into dist/client (see vercel.json).
export const config = { runtime: 'edge' }

export default function handler(request: Request): Response | Promise<Response> {
  return app.fetch(request)
}
