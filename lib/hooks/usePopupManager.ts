import { useMagicKeys } from '@vueuse/core'
import type { Ref } from 'vue'
import { onUnmounted, ref, watch } from 'vue'

/**
 * 弹出层实例信息
 */
export interface PopupInstance {
  /** 唯一标识 */
  id: string
  /** 类型：modal 或 drawer */
  type: 'modal' | 'drawer'
  /** 分配的 z-index */
  zIndex: number
  /** 关闭回调 */
  close: () => void
}

/**
 * 全局弹出层管理器
 * 统一管理 Modal 和 Drawer 的 z-index，确保后打开的组件层级更高
 * 支持 ESC 键按最顶层依次关闭
 */
class PopupManager {
  /** 基础 z-index，从 2001 开始 */
  private static readonly BASE_Z_INDEX = 2001

  /** 当前 z-index 计数器 */
  private currentZIndex = PopupManager.BASE_Z_INDEX

  /** 弹出层栈，按打开顺序排列，最后一个是最顶层 */
  private stack: PopupInstance[] = []

  /** 是否已初始化 ESC 监听 */
  private escInitialized = false

  /**
   * 注册弹出层，返回分配的 z-index
   * @param id 唯一标识
   * @param type 类型
   * @param close 关闭回调
   * @returns 分配的 z-index
   */
  register(id: string, type: 'modal' | 'drawer', close: () => void): number {
    // 检查是否已存在，避免重复注册
    const existingIndex = this.stack.findIndex(p => p.id === id)
    if (existingIndex !== -1) {
      // 如果已存在，返回已分配的 z-index
      return this.stack[existingIndex].zIndex
    }

    const zIndex = this.currentZIndex++
    this.stack.push({ id, type, zIndex, close })
    return zIndex
  }

  /**
   * 注销弹出层
   * @param id 唯一标识
   */
  unregister(id: string): void {
    const index = this.stack.findIndex(p => p.id === id)
    if (index !== -1) {
      this.stack.splice(index, 1)
    }
  }

  /**
   * 关闭最顶层弹出层
   * @returns 是否成功关闭
   */
  closeTop(): boolean {
    if (this.stack.length === 0) {
      return false
    }
    const topPopup = this.stack[this.stack.length - 1]
    topPopup.close()
    return true
  }

  /**
   * 检查是否是最顶层弹出层
   * @param id 唯一标识
   * @returns 是否是最顶层
   */
  isTop(id: string): boolean {
    if (this.stack.length === 0) {
      return false
    }
    return this.stack[this.stack.length - 1].id === id
  }

  /**
   * 获取当前栈的长度
   * @returns 栈长度
   */
  getStackLength(): number {
    return this.stack.length
  }

  /**
   * 获取指定弹出层的信息
   * @param id 唯一标识
   * @returns 弹出层信息或 undefined
   */
  getPopup(id: string): PopupInstance | undefined {
    return this.stack.find(p => p.id === id)
  }

  /**
   * 初始化全局 ESC 监听（内部使用）
   */
  initEscListener(escape: Ref<boolean>): void {
    if (this.escInitialized) {
      return
    }
    this.escInitialized = true

    // 使用 watch 监听 ESC 键
    watch(escape, (pressed) => {
      if (pressed && this.stack.length > 0) {
        // 找到最顶层且支持 ESC 关闭的弹出层
        this.closeTop()
      }
    })
  }
}

// 全局单例
const popupManager = new PopupManager()

/**
 * 弹出层管理器 Hook
 * 用于 Modal 和 Drawer 组件管理 z-index 和 ESC 关闭
 *
 * @param options 配置选项
 * @returns 管理器方法和响应式 z-index
 */
export function usePopupManager(options: {
  /** 唯一标识 */
  id: string
  /** 类型：modal 或 drawer */
  type: 'modal' | 'drawer'
  /** 可见性 v-model */
  visible: Ref<boolean>
  /** 是否支持 ESC 关闭 */
  closeByEsc?: boolean
  /** 关闭时的自定义回调 */
  onClose?: () => void
}) {
  const { id, type, visible, closeByEsc = false, onClose } = options

  // 响应式 z-index
  const zIndex = ref(0)

  // 关闭方法
  const close = () => {
    visible.value = false
    onClose?.()
  }

  // 监听可见性变化
  watch(
    visible,
    (newVal) => {
      if (newVal) {
        // 打开时注册
        zIndex.value = popupManager.register(id, type, close)
      }
      else {
        // 关闭时注销
        popupManager.unregister(id)
      }
    },
    { immediate: true },
  )

  // 如果支持 ESC 关闭，设置监听
  if (closeByEsc) {
    const { Escape } = useMagicKeys()

    watch(Escape, (pressed) => {
      if (pressed && visible.value && popupManager.isTop(id)) {
        close()
      }
    })
  }

  // 组件卸载时清理
  onUnmounted(() => {
    popupManager.unregister(id)
  })

  return {
    /** 响应式 z-index */
    zIndex,
    /** 检查是否是最顶层 */
    isTop: () => popupManager.isTop(id),
    /** 关闭方法 */
    close,
    /** 获取当前栈长度 */
    getStackLength: () => popupManager.getStackLength(),
  }
}

// 导出管理器实例，供高级用法
export { popupManager }
