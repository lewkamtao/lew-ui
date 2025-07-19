import type { ConfigEnv, UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'
import zipPack from 'vite-plugin-zip-pack'

// 路径工具函数
const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  const { mode } = configEnv
  const isLibMode = mode === 'lib'

  // 插件配置
  const commonPlugins = [
    vue(),
    AutoImport({ imports: ['vue', 'vue-router'] }),
    checker({ typescript: true }),
  ]

  // 只在lib和docs模式下打包zip
  const zipPlugins = (mode === 'lib' || mode === 'docs')
    ? [zipPack({ outFileName: `lew-ui_${mode}.zip` })]
    : []

  const libPlugins = isLibMode
    ? [
        dts({
          include: ['lib/**/*.vue', 'lib/**/*.ts', 'lib/**/*.tsx'],
          exclude: ['lib/docs/**/*'],
        }),
      ]
    : []

  // 构建配置
  const libBuildOptions = {
    lib: {
      entry: resolve('./lib/index.ts'),
      name: 'lew-ui',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' } },
    },
    copyPublicDir: false, // lib模式下不复制public文件夹
  }

  const docsBuildOptions = {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/static/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  }

  // 开发服务器配置
  const serverConfig = {
    open: true,
    port: 3000,
    hmr: true,
    proxy: {
      '/api_admin': {
        target: 'https://app.tngeek.com/api_admin',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api_admin/, ''),
      },
      '/api_sso': {
        target: 'https://app.tngeek.com/api_sso',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api_sso/, ''),
      },
    },
  }

  // 路径别名配置
  const aliasConfig = {
    'lew-ui': resolve('./lib'),
    '@': resolve('./lib/docs'),
  }

  // 构建优化配置
  const buildConfig = {
    ...(isLibMode ? libBuildOptions : docsBuildOptions),
    minify: 'terser' as const,
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  }

  return {
    base: '',
    server: serverConfig,
    resolve: { alias: aliasConfig },
    plugins: [
      ...zipPlugins,
      ...commonPlugins,
      ...libPlugins,
    ],
    build: buildConfig,
  }
})
