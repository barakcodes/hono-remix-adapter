import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/vite-plugin.ts',
    'src/dev.ts',
    'src/handlers/cloudflare-workers.ts',
    'src/react.ts',
  ],
  external: ['../server', 'virtual:react-router/server-build', 'hono', '@react-router/cloudflare', 'vite'],
  format: 'esm',
  splitting: false,
  dts: true,
})
