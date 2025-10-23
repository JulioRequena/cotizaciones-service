import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configura proxy al backend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://cotizaciones-backend:5000'
    }
  }
})
