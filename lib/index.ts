/**
 * Lew UI 主入口
 * - 纯具名导出，无顶层样式副作用，便于 Tree-shaking
 * - 样式请单独：import 'lew-ui/style'
 * - 全量注册：app.use(LewUI) 或 app.use(install)
 */

export * from './components'
export * from './directives'
export { default, install } from './install'
export { default as LewUI } from './install'
export * from './locals'

export * from './methods'
export * from './types'

declare const __LEW_VERSION__: string
export const version = typeof __LEW_VERSION__ !== 'undefined' ? __LEW_VERSION__ : '2.8.2'
