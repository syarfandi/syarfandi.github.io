import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        devops: resolve(__dirname, 'devops/index.html'),
      },
    },
  },
  server: {
    port: 3005,
    host: true,
    watch: {
      usePolling: true,
    },
  },
})
