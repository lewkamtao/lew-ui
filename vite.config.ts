import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import dts from 'vite-plugin-dts'
import checker from 'vite-plugin-checker'
import zipPack from 'vite-plugin-zip-pack'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const isLibMode = mode === 'lib'
  
  const commonPlugins = [
    zipPack({ outFileName: `lew-ui_${mode}.zip` }),
    vue(),
    vueJsx(),
    AutoImport({ imports: ['vue', 'vue-router'] }),
    checker({ typescript: true })
  ]

  const libPlugins = isLibMode ? [dts({ include: ['lib/**/*.vue', 'lib/**/*.ts', 'lib/**/*.tsx'] })] : []

  const buildOptions = isLibMode
    ? {
        lib: {
          entry: fileURLToPath(new URL('./lib/index.ts', import.meta.url)),
          name: 'lew-ui',
          fileName: 'index'
        },
        rollupOptions: {
          external: ['vue'],
          output: { globals: { vue: 'Vue' } }
        }
      }
    : {
        rollupOptions: {
          output: {
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
            assetFileNames: 'assets/static/[name]-[hash].[ext]',
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString()
              }
            }
          }
        }
      }

  return {
    base: '',
    server: {
      open: true,
      port: 10034,
      hmr: true,
      proxy: {
        '/api_admin': {
          target: 'https://app.tngeek.com/api_admin',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api_admin/, '')
        },
        '/api_sso': {
          target: 'https://app.tngeek.com/api_sso',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api_sso/, '')
        }
      }
    },
    resolve: {
      alias: {
        'lew-ui': fileURLToPath(new URL('./lib', import.meta.url)),
        '@': fileURLToPath(new URL('./lib/docs', import.meta.url))
      }
    },
    plugins: [
      ...commonPlugins,
      ...libPlugins,
      visualizer({
        open: true,
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true
      })
    ],
    build: {
      ...buildOptions,
      minify: 'terser',
      emptyOutDir: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
})
