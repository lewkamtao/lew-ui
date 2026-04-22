import type { SassPreprocessorOptions } from 'vite'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

const isAnalyze = process.env.ANALYZE === 'true'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: 'lib/auto-imports.d.ts',
      vueTemplate: true,
    }),
    dts({
      include: ['lib/**/*.vue', 'lib/**/*.ts', 'lib/**/*.tsx'],
      exclude: ['lib/**/*.test.ts', 'lib/**/*.spec.ts'],
      insertTypesEntry: true,
      copyDtsFiles: true,
    }),
    ...(isAnalyze
      ? [
          visualizer({
            filename: 'dist/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
            template: 'treemap',
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': resolve('./lib'),
      'lew-ui': resolve('./lib'),
    },
  },
  build: {
    lib: {
      entry: resolve('./lib/index.ts'),
      name: 'lew-ui',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named',
      },
    },
    copyPublicDir: false,
    outDir: 'dist',
    minify: 'esbuild',
    emptyOutDir: true,
    sourcemap: false,
    reportCompressedSize: false,
    cssCodeSplit: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      } as SassPreprocessorOptions,
    },
  },
  define: {
    __DEV__: false,
  },
})
