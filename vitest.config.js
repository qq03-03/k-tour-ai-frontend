import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/k-tour-ai-frontend/',
  plugins: [react()],
  test: {
    environment: 'node',
    setupFiles: './src/setupTests.js',
    globals: true,
    environmentMatchGlobs: [
      ['src/components/**', 'jsdom'],
      ['src/pages/**', 'jsdom'],
    ],
  },
})
