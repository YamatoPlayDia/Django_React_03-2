import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: 'src/index.html',
    },
  },
  server: {
    port: 3000,
    open: '/',
  }
})
