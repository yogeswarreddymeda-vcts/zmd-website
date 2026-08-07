import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep the static build portable when it is opened from a GoDaddy folder
  // as well as when it is served from the domain root.
  base: './',
})
