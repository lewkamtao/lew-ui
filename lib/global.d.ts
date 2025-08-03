/**
 * ==========================================
 * Lew UI 全局类型声明
 * ==========================================
 * 企业级组件库全局类型扩展
 * @version 2.0.0
 * @since 2024
 * @description 扩展 Vue 全局类型，提供完整的类型支持
 */

import type { LewDirectiveBindings } from './types'

declare module 'vue' {
  /**
   * 组件自定义属性扩展
   * @description 为组件实例添加自定义属性类型支持
   */
  interface ComponentCustomProperties {
    // 为未来扩展预留
  }

  /**
   * 全局指令类型声明
   * @description 为所有 Lew UI 指令提供类型支持
   */
  interface GlobalDirectives {
    /**
     * Tooltip 指令
     * @description 提供工具提示功能
     */
    vTooltip: LewDirectiveBindings['tooltip']

    /**
     * Loading 指令
     * @description 提供加载状态显示
     */
    vLoading: LewDirectiveBindings['loading']

    /**
     * BackTop 指令
     * @description 提供回到顶部功能
     */
    vBacktop: LewDirectiveBindings['backtop']

    /**
     * ContextMenu 指令
     * @description 提供右键上下文菜单功能
     */
    vContextMenu: LewDirectiveBindings['context-menu']

    /**
     * HoverMenu 指令
     * @description 提供悬浮菜单功能
     */
    vHoverMenu: LewDirectiveBindings['hover-menu']
  }
}

/**
 * 模块声明导出
 * @description 确保模块正确导出
 */
export {}
