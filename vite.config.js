import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/openrouter': {
        target: 'https://openrouter.ai',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/openrouter/, ''),
        headers: {
          'origin': 'https://openrouter.ai',
        },
      }
    }
  },
  build: { outDir: 'dist', sourcemap: true }
})