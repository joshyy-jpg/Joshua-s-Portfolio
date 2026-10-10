import { rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // The Situ editor extension writes its runtime into public/plugins; it is for local editing only.
    {
      name: 'drop-editor-plugins',
      apply: 'build',
      closeBundle() {
        rmSync('dist/plugins', { recursive: true, force: true })
      },
    },
  ],
  server: { port: 5180, strictPort: true },
  preview: { port: 5181, strictPort: true },
})
