import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // 🔴 CRITICAL: Forces absolute asset paths across all production routes
  server: {
    historyApiFallback: true, // Ensures SPA routing works in development
  },
})