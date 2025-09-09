/**
 * ==========================================
 * Lew UI 文档环境类型声明
 * ==========================================
 * 企业级组件库文档环境类型定义
 * @version 2.0.0
 * @since 2024
 * @description 为文档系统提供完整的类型支持
 */

/// <reference types="vite/client" />

/**
 * Vue 单文件组件类型声明
 * @description 为 .vue 文件提供类型支持
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

/**
 * 第三方库类型声明
 * @description 为没有类型定义的第三方库提供基础类型支持
 */
declare module 'highlight.js'

/**
 * 全局变量声明
 * @description 为文档环境中的全局变量提供类型支持
 */
declare const hljs: any

/**
 * Lew UI 组件全局声明
 * @description 为文档中全局使用的组件提供类型支持
 */
declare const LewMessage: (typeof import('lew-ui'))['LewMessage']
declare const LewDialog: (typeof import('lew-ui'))['LewDialog']
declare const LewNotification: (typeof import('lew-ui'))['LewNotification']

/**
 * 窗口对象扩展
 * @description 为 window 对象提供扩展类型支持
 * @note Window interface 在各个指令文件中单独声明以避免冲突
 */
declare global {
  interface Window {
    // 文档环境特定的 window 扩展
    __LEW_UI_VERSION__?: string
    __LEW_UI_DEV__?: boolean
  }
}

/**
 * 环境变量类型声明
 * @description 为 Vite 环境变量提供类型支持
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
