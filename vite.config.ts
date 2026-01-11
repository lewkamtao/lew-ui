import type { ConfigEnv, UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'
import zipPack from 'vite-plugin-zip-pack'

// ============================================================================
// 常量定义
// ============================================================================

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

/** 构建模式 */
const BUILD_MODE = {
  LIB: 'lib',
  DOCS: 'docs',
  ANALYZE: 'analyze',
} as const

/** 外部化依赖 - 库模式下不打包这些依赖 */
const EXTERNAL_DEPS = ['vue'] as const

/** 需要预构建的依赖 - 加速开发模式启动 */
const OPTIMIZE_DEPS = [
  'vue',
  'vue-router',
  'vue-i18n',
  '@vueuse/core',
  'dayjs',
  'lodash-es',
  'tippy.js',
  'lucide-vue-next',
]

// ============================================================================
// 插件配置
// ============================================================================

/** 基础插件 - 所有模式通用 */
function getBasePlugins() {
  return [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true,
    }),
    checker({
      typescript: true,
      enableBuild: false, // 构建时禁用，提升构建速度
    }),
  ]
}

/** 库模式专用插件 */
function getLibPlugins() {
  return [
    dts({
      include: ['lib/**/*.vue', 'lib/**/*.ts', 'lib/**/*.tsx'],
      exclude: ['lib/**/*.test.ts', 'lib/**/*.spec.ts'],
      insertTypesEntry: true,
      copyDtsFiles: true,
    }),
  ]
}

/** ZIP 打包插件 */
function getZipPlugins(mode: string) {
  const needsZip = mode === BUILD_MODE.LIB || mode === BUILD_MODE.DOCS
  if (!needsZip)
    return []

  return [
    zipPack({
      outFileName: `lew-ui_${mode}.zip`,
    }),
  ]
}

/** 构建分析插件 */
function getAnalyzePlugins(mode: string) {
  if (mode !== BUILD_MODE.ANALYZE)
    return []

  return [
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // 使用 treemap 视图更直观
    }),
  ]
}

// ============================================================================
// 构建配置
// ============================================================================

/** 库构建配置 */
function getLibBuildConfig() {
  return {
    lib: {
      entry: resolve('./lib/index.ts'),
      name: 'lew-ui',
      fileName: 'index',
      formats: ['es', 'umd'] as const,
    },
    rollupOptions: {
      external: [...EXTERNAL_DEPS],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named' as const,
        // 保留模块结构，便于 tree-shaking
        preserveModules: false,
        // 为 CSS 变量等添加 banner
        banner: '/* lew-ui - Vue 3 Component Library */',
      },
    },
    copyPublicDir: false,
    outDir: 'dist',
  }
}

/** 文档构建配置 */
function getDocsBuildConfig() {
  return {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/static/[name]-[hash].[ext]',
        manualChunks(id: string) {
          // 将 node_modules 按包名分割
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1]?.split('/')[0]
            if (!packageName)
              return 'vendor'

            // 大型依赖单独分包
            const largePackages = ['vue', 'vue-router', 'vue-i18n', 'lodash-es', '@vueuse', 'lucide-vue-next', 'shiki']
            for (const pkg of largePackages) {
              if (packageName.includes(pkg))
                return `vendor-${pkg.replace('@', '').replace('/', '-')}`
            }

            return 'vendor'
          }

          // 组件库代码单独分包
          if (id.includes('/lib/'))
            return 'lew-ui'
        },
      },
    },
    outDir: 'dist',
  }
}

/** 通用构建优化配置 */
function getCommonBuildConfig() {
  return {
    minify: 'terser' as const,
    emptyOutDir: true,
    sourcemap: false,
    // 提升构建性能
    reportCompressedSize: false,
    // Terser 压缩配置
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // 多次压缩，进一步减小体积
      },
      mangle: {
        safari10: true, // 兼容 Safari 10
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    // CSS 代码分割
    cssCodeSplit: true,
  }
}

// ============================================================================
// 服务器配置
// ============================================================================

function getServerConfig() {
  return {
    open: true,
    port: 3000,
    host: true, // 允许局域网访问
    hmr: {
      overlay: true, // 显示错误覆盖层
    },
    // 预热常用文件，加速首次访问
    warmup: {
      clientFiles: [
        './lib/index.ts',
        './docs/main.ts',
        './docs/App.vue',
      ],
    },
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
  }
}

// ============================================================================
// 依赖优化配置
// ============================================================================

function getOptimizeDepsConfig() {
  return {
    include: OPTIMIZE_DEPS,
    // 排除不需要预构建的依赖
    exclude: ['vue-demi'],
  }
}

// ============================================================================
// CSS 配置
// ============================================================================

function getCssConfig() {
  return {
    preprocessorOptions: {
      scss: {
        // 注入全局 SCSS 变量（如需要可取消注释）
        // additionalData: `@use "@/styles/variables" as *;`,
        api: 'modern-compiler', // 使用新版 SCSS API
      },
    },
    // 开发模式下禁用 CSS 代码分割以加速 HMR
    devSourcemap: true,
  }
}

// ============================================================================
// 主配置
// ============================================================================

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  const { mode } = configEnv
  const isLibMode = mode === BUILD_MODE.LIB

  // 组合插件
  const plugins = [
    ...getZipPlugins(mode),
    ...getBasePlugins(),
    ...(isLibMode ? getLibPlugins() : []),
    ...getAnalyzePlugins(mode),
  ]

  // 组合构建配置
  const buildConfig = {
    ...(isLibMode ? getLibBuildConfig() : getDocsBuildConfig()),
    ...getCommonBuildConfig(),
  }

  return {
    base: '',
    plugins,
    resolve: {
      alias: {
        'lew-ui': resolve('./lib'),
        'docs': resolve('./docs'),
        '@': resolve('./lib'), // 便捷别名
      },
    },
    server: getServerConfig(),
    build: buildConfig,
    optimizeDeps: getOptimizeDepsConfig(),
    css: getCssConfig(),
    // 环境变量前缀
    envPrefix: 'LEW_',
    // 定义全局常量
    define: {
      __DEV__: mode !== 'production',
    },
  }
})
