import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vercel build: static SPA only. The Cloudflare plugin is left out because
// Vercel has no Worker/assets binding; API routes are served by api/[...route].ts.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: [{ find: /^@\//, replacement: '/src/' }] },
  build: { outDir: 'dist/client', emptyOutDir: true },
})
