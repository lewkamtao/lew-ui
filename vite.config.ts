import type { SassPreprocessorOptions } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import pkg from './package.json'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

/**
 * 开发环境配置
 */
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'lib/auto-imports.d.ts',
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      // 须写在 lew-ui 之前，避免被 package exports 指到 dist/style.css
      'lew-ui/style': resolve('./lib/style.ts'),
      'lew-ui': resolve('./lib'),
      'docs': resolve('./docs'),
      '@': resolve('./lib'),
    },
  },
  server: {
    open: true,
    port: 3000,
    host: true,
    proxy: {
      '/api_admin': {
        target: 'https://app.tngeek.com/api_admin',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api_admin/, ''),
      },
      '/api_sso': {
        target: 'https://app.tngeek.com/api_sso',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api_sso/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      } as SassPreprocessorOptions,
    },
  },
  define: {
    __DEV__: true,
    __LEW_VERSION__: JSON.stringify(pkg.version),
  },
})
