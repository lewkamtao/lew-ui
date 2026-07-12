import type { SassPreprocessorOptions } from 'vite'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

const isAnalyze = process.env.ANALYZE === 'true'

/** 打包时外部化的运行时依赖（CSS 始终打进 style 产物） */
const externalDeps = [
  'vue',
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

function isExternal(id: string): boolean {
  // tippy / 本地样式必须打进 CSS，不能 external
  if (/\.(css|scss|sass|less)(\?|$)/.test(id))
    return false
  return externalDeps.some(
    dep => id === dep || id.startsWith(`${dep}/`),
  )
}

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
      exclude: ['lib/**/*.test.ts', 'lib/**/*.spec.ts', 'lib/style.ts'],
      insertTypesEntry: true,
      copyDtsFiles: true,
      entryRoot: 'lib',
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
      entry: {
        index: resolve('./lib/index.ts'),
        style: resolve('./lib/style.ts'),
      },
      name: 'lew-ui',
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: isExternal,
      output: {
        exports: 'named',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] || assetInfo.name || ''
          // 统一主题 + 组件样式出口
          if (name.endsWith('.css'))
            return 'style.css'
          return 'assets/[name][extname]'
        },
      },
      treeshake: {
        moduleSideEffects: (id, external) => {
          if (external)
            return false
          if (id.includes('style') && (id.endsWith('style.ts') || id.endsWith('style.js')))
            return true
          return /\.(css|scss)(\?|$)/.test(id)
        },
      },
    },
    copyPublicDir: false,
    outDir: 'dist',
    minify: 'esbuild',
    emptyOutDir: true,
    sourcemap: false,
    reportCompressedSize: false,
    // 全部 CSS 合并为 style.css，用户一次 import 'lew-ui/style'
    cssCodeSplit: false,
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
    __LEW_VERSION__: JSON.stringify(pkg.version),
  },
})
