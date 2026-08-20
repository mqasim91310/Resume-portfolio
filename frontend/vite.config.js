import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Vite 8's rolldown bundler requires manualChunks as a function
        // (the older { name: [...] } object form is Rollup-only).
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('react-router-dom') || id.includes('/react/') || id.includes('/react-dom/')) return 'vendor-react';
          }
        },
      },
    },
  },
})
