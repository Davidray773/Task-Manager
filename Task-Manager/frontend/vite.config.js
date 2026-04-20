import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  csp: {
    reportOnly: false,
    policy: {
      'default-src': ["'self'", 'https:'],
      'script-src': ["'self'", "'unsafe-inline'"],
      'connect-src': [
        "'self'",
        'https:'
      ],
      'img-src': [
        "'self'",
        'https:',
        'data:'
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https:'
      ],
      'font-src': ["'self'", 'data:', 'https:']
    }
  },
  rewrites: [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
})
