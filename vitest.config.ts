import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: false,
      vueTemplate: true,
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./lib/test-setup.ts'],
    include: ['lib/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['lib/**'],
      exclude: ['lib/**/*.test.ts', 'lib/auto-imports.d.ts', 'lib/test-setup.ts'],
    },
  },
  resolve: {
    alias: {
      '@': resolve('./lib'),
      'lew-ui': resolve('./lib'),
      'lew-ui/utils': resolve('./lib/utils'),
      'lew-ui/types': resolve('./lib/types'),
      'lew-ui/validators': resolve('./lib/validators'),
      'lew-ui/_components': resolve('./lib/_components'),
    },
  },
})
