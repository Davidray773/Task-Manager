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
      'default-src': ["'self'"],
      'script-src': ["'self'"],
      'connect-src': [
        "'self'",
        'http://localhost:*',
        'ws://localhost:*'
      ],
      'img-src': [
        "'self'",
        'http://localhost:*',
        'data:'
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https:'
      ],
      'font-src': ["'self' data: https: data:"]
    }
  },
  rewrites: [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
})
