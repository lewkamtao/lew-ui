import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import dts from 'vite-plugin-dts'
import checker from 'vite-plugin-checker'
import zipPack from 'vite-plugin-zip-pack'
import dayjs from 'dayjs'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
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
          rewrite: (path: string) => path.replace(/^\/api_admin/, '')
        }
      }
    },
    resolve: {
      // 设置别名
      alias: {
        'lew-ui': fileURLToPath(new URL('./lib', import.meta.url)),
        '@': fileURLToPath(new URL('./lib/docs', import.meta.url))
      }
    },
    plugins: [
      zipPack({
        outFileName: `lew-ui_${mode}_${dayjs().format('YYYY_MM_DD_HH_mm')}.zip`
      }),
      vue(),
      vueJsx(),
      mode === 'lib'
        ? dts({
            include: ['lib/**/*.vue', 'lib/**/*.ts', 'lib/**/*.tsx']
          })
        : undefined,
      AutoImport({
        imports: ['vue']
      }),
      checker({
        typescript: true
      })
    ],
    build:
      mode === 'lib'
        ? {
            lib: {
              entry: fileURLToPath(new URL('./lib/index.ts', import.meta.url)),
              name: 'lew-ui',
              fileName: 'index'
            },
            minify: 'terser',
            terserOptions: {
              compress: {
                // 移除console
                drop_console: true,
                drop_debugger: true
              }
            },
            emptyOutDir: true,
            rollupOptions: {
              // 确保外部化处理那些你不想打包进库的依赖
              plugins: [
                visualizer({
                  open: true, // 直接在浏览器中打开分析报告
                  filename: 'stats.html', // 输出文件的名称
                  gzipSize: true, // 显示gzip后的大小
                  brotliSize: true // 显示brotli压缩后的大小
                })
              ],
              external: ['vue'],
              output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                  vue: 'Vue'
                }
              }
            }
          }
        : {
            rollupOptions: {
              output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/static/[name]-[hash].[ext]',
                // eslint-disable-next-line consistent-return
                manualChunks(id) {
                  if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString()
                  }
                },
                plugins: [
                  visualizer({
                    open: true, // 直接在浏览器中打开分析报告
                    filename: 'stats.html', // 输出文件的名称
                    gzipSize: true, // 显示gzip后的大小
                    brotliSize: true // 显示brotli压缩后的大小
                  })
                ]
              }
            },
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
