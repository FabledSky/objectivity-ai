import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdown from 'vite-plugin-md'
import anchor from 'markdown-it-anchor'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    markdown({
      markdownItOptions: { html: true },
      markdownItUses: [
        [anchor, { permalink: anchor.permalink.linkInsideHeader({ symbol: '' }) }]
      ]
    }),
    react(),
  ],
})
