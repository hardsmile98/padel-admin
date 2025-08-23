/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pages': resolve(__dirname, './src/pages'),
      'components': resolve(__dirname, './src/components'),
      'services': resolve(__dirname, './src/services'),
      'utils': resolve(__dirname, './src/utils'),
      'store': resolve(__dirname, './src/store'),
      'constants': resolve(__dirname, './src/constants'),
      'assets': resolve(__dirname, './src/assets'),
      'hooks': resolve(__dirname, './src/hooks'),
      'theme': resolve(__dirname, './src/theme'),
    },
  },
  build: {
    sourcemap: false,
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true
    }
  },
})
