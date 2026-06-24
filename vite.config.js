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
        cloud: resolve(__dirname, 'cloud/index.html'),
        frontend: resolve(__dirname, 'frontend/index.html'),
        backend: resolve(__dirname, 'backend/index.html'),
        fullstack: resolve(__dirname, 'fullstack/index.html'),
        mobile: resolve(__dirname, 'mobile/index.html'),
        "data-scientist": resolve(__dirname, 'data-scientist/index.html'),
        "data-analyst": resolve(__dirname, 'data-analyst/index.html'),
        sysadmin: resolve(__dirname, 'sysadmin/index.html'),
        "data-engineer": resolve(__dirname, 'data-engineer/index.html'),
        "product-manager": resolve(__dirname, 'product-manager/index.html'),
        resume: resolve(__dirname, 'resume/index.html'),
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
