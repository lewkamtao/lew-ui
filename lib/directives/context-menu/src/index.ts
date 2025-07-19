import type { App, DirectiveBinding, PropType } from 'vue'
import { getUniqueId } from 'lew-ui/utils'
// 导入所需的依赖
import tippy from 'tippy.js'
import { createApp, h, defineAsyncComponent } from 'vue'

/**
 * 右键菜单项目接口定义
 */
export interface ContextMenus {
  label?: string
  value?: string
  icon?: string
  children?: ContextMenus[]
  disabled?: boolean
  level?: number
  isDividerLine?: boolean
  checkable?: boolean
  checked?: boolean
  onClick?: (item: ContextMenus) => void
  [key: string]: any
}

/**
 * 右键菜单组件属性定义
 */
export const contextMenuProps = {
  options: {
    type: Array as PropType<ContextMenus[]>,
    default: () => [],
    description: '右键菜单配置',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用右键菜单',
  },
}



/**
 * 全局右键菜单配置接口
 */
interface LewContextMenuConfig {
  menu: Record<
    string,
    {
      options: ContextMenus[]
      disabled: boolean
    }
  >
  contextMenu: ((e: MouseEvent) => void) | null
  instance: any
  menuInstance: Record<string, any>
}

declare global {
  interface Window {
    LewContextMenu: LewContextMenuConfig
  }
}

/**
 * 初始化右键菜单配置
 */
export function initLewContextMenu(): void {
  window.LewContextMenu = {
    menu: {},
    contextMenu: null,
    instance: tippy(document.body, {
      theme: 'light',
      animation: 'shift-away-subtle',
      trigger: 'manual',
      interactive: true,
      placement: 'right-start',
      duration: [250, 250],
      delay: [250, 0],
      arrow: false,
      appendTo: () => document.body,
      allowHTML: true,
      zIndex: 2000,
    }),
    menuInstance: {},
  }

  window.LewContextMenu.instance.popper.children[0].setAttribute(
    'data-lew',
    'popover',
  )
}

/**
 * 递归查找元素的右键菜单ID
 */
function findContextMenuId(el: HTMLElement): string {
  try {
    const id = el.getAttribute('lew-context-menu-id')
    if (id)
      return id
    return el.parentNode ? findContextMenuId(el.parentNode as HTMLElement) : ''
  }
  catch {
    return ''
  }
}

/**
 * 创建右键菜单组件实例
 */
function createContextMenu(options: ContextMenus[]) {
  // 使用异步组件避免循环依赖
  const _LewContextMenu = defineAsyncComponent(() => import('./LewContextMenu.vue'))
  const menuDom = document.createElement('div')
  createApp({
    render() {
      return h(_LewContextMenu, { options })
    },
  }).mount(menuDom)
  return menuDom
}

/**
 * 右键菜单指令
 */
export const LewVContextMenu = {
  install(app: App) {
    app.directive('context-menu', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        if (!window.LewContextMenu) {
          initLewContextMenu()
        }

        const { options = [], disabled = false } = binding.value
        const elId = el.id || getUniqueId()

        el.setAttribute('lew-context-menu-id', elId)
        window.LewContextMenu.menu[elId] = { options, disabled }

        if (!window.LewContextMenu.contextMenu) {
          window.LewContextMenu.contextMenu = (e: MouseEvent) => {
            const id = findContextMenuId(e.target as HTMLElement)
            const menuConfig = window.LewContextMenu.menu[id]

            if (!id || menuConfig?.disabled)
              return

            e.preventDefault()

            const { instance } = window.LewContextMenu
            instance.hide()

            const menuDom = createContextMenu(menuConfig.options)

            setTimeout(() => {
              instance.setProps({
                content: menuDom,
                getReferenceClientRect: () => ({
                  width: 0,
                  height: 0,
                  top: e.clientY,
                  bottom: e.clientY,
                  left: e.clientX,
                  right: e.clientX,
                }),
              })
              instance.show()
            }, 120)
          }
          window.addEventListener(
            'contextmenu',
            window.LewContextMenu.contextMenu,
          )
        }
      },

      updated(el: HTMLElement, binding: DirectiveBinding) {
        const id = findContextMenuId(el)
        if (id) {
          const { options = [], disabled = false } = binding.value
          window.LewContextMenu.menu[id] = { options, disabled }
        }
        else {
          console.error('发生未知错误！找不到 lew-context-menu-id。')
        }
      },

      unmounted(el: HTMLElement) {
        const id = findContextMenuId(el)
        if (id) {
          delete window.LewContextMenu.menu[id]
        }
      },
    })
  },
}
