import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/new-york-times-website-clone/',
  plugins: [react()],
})
