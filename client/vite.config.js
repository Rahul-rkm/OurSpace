import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/": "https://ourspace-bsx8.onrender.com/",
    },
  },
  plugins: [react()]
})
