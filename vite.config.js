import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(), 
  ],
  resolve: {
    alias: {
      // This routes the old package to the new Tailwind v4 compatible one!
      'html2canvas': 'html2canvas-pro',
    },
  },
})