import type { SassPreprocessorOptions } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import zipPack from 'vite-plugin-zip-pack'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

/**
 * 文档站点打包配置
 */
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'lib/auto-imports.d.ts',
      vueTemplate: true,
    }),
    zipPack({
      inDir: 'dist-docs',
      outDir: './',
      outFileName: 'docs.zip',
    }),
  ],
  resolve: {
    alias: {
      'lew-ui': resolve('./lib'),
      'docs': resolve('./docs'),
      '@': resolve('./lib'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/static/[name]-[hash].[ext]',
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1]?.split('/')[0]
            if (!packageName)
              return 'vendor'

            const largePackages = ['vue', 'vue-router', 'vue-i18n', 'lodash-es', '@vueuse', 'lucide-vue-next', 'shiki']
            for (const pkg of largePackages) {
              if (packageName.includes(pkg))
                return `vendor-${pkg.replace('@', '').replace('/', '-')}`
            }

            return 'vendor'
          }

          if (id.includes('/lib/'))
            return 'lew-ui'
        },
      },
    },
    outDir: 'dist-docs',
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
