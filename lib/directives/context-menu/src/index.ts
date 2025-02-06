// 导入所需的依赖
import tippy from 'tippy.js'
import type { App, DirectiveBinding } from 'vue'
import { getUniqueId } from 'lew-ui/utils'
import { isFunction } from 'lodash-es'
import _LewContextMenu from './LewContextMenu.vue'

/**
 * 初始化右键菜单
 * 创建全局右键菜单实例和相关配置
 */
export const initLewContextMenu = () => {
  window.LewContextMenu = {
    menu: {}, // 存储菜单配置
    disabledIds: [], // 禁用右键菜单的元素ID
    contextMenu: null, // 右键菜单事件处理函数
    instance: tippy(document.body, {
      theme: 'light',
      animation: 'shift-away-subtle',
      trigger: 'manual', // 手动触发
      interactive: true, // 允许与菜单交互
      placement: 'right-start', // 菜单出现位置
      duration: [250, 250], // 动画持续时间
      delay: [250, 0], // 显示和隐藏的延迟
      arrow: false, // 不显示箭头
      appendTo: () => document.body, // 添加到body
      allowHTML: true // 允许HTML内容
    }),
    menuInstance: {} // 存储子菜单实例
  }

  // 为菜单添加自定义属性
  window.LewContextMenu.instance.popper.children[0].setAttribute(
    'data-lew',
    'popover'
  )
}

/**
 * 递归查找元素的右键菜单ID
 * @param el - 目标HTML元素
 * @returns 元素的右键菜单ID
 */
const findContextMenuId = (el: HTMLElement): string => {
  try {
    const id = el.getAttribute('lew-context-menu-id')
    if (id) return id
    return el.parentNode ? findContextMenuId(el.parentNode as HTMLElement) : ''
  } catch {
    return ''
  }
}

/**
 * 右键菜单指令
 * 提供右键菜单功能的Vue指令
 */
export const LewVContextMenu = {
  install(app: App) {
    app.directive('context-menu', {
      // 指令挂载时的处理
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        // 确保全局右键菜单对象存在
        if (!window.LewContextMenu) {
          initLewContextMenu()
        }

        let elId = el.id
        // 为元素设置唯一ID并保存菜单配置
        if (!elId) {
          elId = getUniqueId()
          el.setAttribute('lew-context-menu-id', elId)
          const { options } = binding.value
          window.LewContextMenu.menu[elId] = options || []
        }
        const { disabled } = binding.value
        if (disabled) {
          window.LewContextMenu.disabledIds.push(elId)
        }
        // 注册全局右键菜单事件处理
        if (!window.LewContextMenu.contextMenu) {
          // 右键菜单事件处理函数
          window.LewContextMenu.contextMenu = (e: MouseEvent) => {
            const id = findContextMenuId(e.target as HTMLElement)
            // 处理禁用和无效情况
            if (window.LewContextMenu.disabledIds.includes(id) || !id) {
              return
            }
            e.preventDefault() // 阻止默认右键菜单

            const options = window.LewContextMenu.menu[id]
            const { instance } = window.LewContextMenu
            instance.hide() // 隐藏已存在的菜单

            // 创建菜单容器
            const menuDom = document.createElement('div')

            // 创建右键菜单组件实例
            createApp({
              render() {
                return h(_LewContextMenu, {
                  options,
                  onSelect: (item: ContextMenus) => {
                    // 处理选择事件
                    const { selectHandler } = binding.value
                    if (isFunction(selectHandler)) {
                      selectHandler(item)
                    }
                    // 无子菜单时隐藏
                    if (!(item.children || []).length) {
                      instance.hide()
                    }
                  }
                })
              }
            }).mount(menuDom)

            // 显示菜单
            setTimeout(() => {
              instance.setProps({
                content: menuDom,
                getReferenceClientRect: () => ({
                  width: 0,
                  height: 0,
                  top: e.clientY,
                  bottom: e.clientY,
                  left: e.clientX,
                  right: e.clientX
                })
              })
              instance.show()
            }, 120)
          }

          // 绑定全局右键事件
          window.addEventListener('contextmenu', (e) => {
            window.LewContextMenu.contextMenu(e, 'contextmenu')
          })
        }
      },

      // 指令更新时的处理
      updated(el: HTMLElement, binding: DirectiveBinding) {
        const id = findContextMenuId(el)
        if (id) {
          // 更新菜单配置
          const { options, disabled } = binding.value
          window.LewContextMenu.menu[id] = options || []

          // 更新禁用状态
          if (disabled) {
            window.LewContextMenu.disabledIds.push(id)
          } else {
            window.LewContextMenu.disabledIds =
              window.LewContextMenu.disabledIds.filter(
                (item: string) => item !== id
              )
          }
        } else {
          console.error('发生未知错误！找不到 lew-context-menu-id。')
        }
      }
    })
  }
}

/**
 * 右键菜单项目接口定义
 */
export interface ContextMenus {
  label?: string // 显示文本
  value?: string // 值
  icon?: string // 图标
  children?: ContextMenus[] // 子菜单
  disabled?: boolean // 是否禁用
  level?: number // 层级
  isDividerLine?: false // 是否为分割线
  [key: string]: any // 其他属性
}

/**
 * 右键菜单组件属性定义
 */
export const contextMenuProps = {
  options: {
    type: Array as PropType<ContextMenus[]>,
    default: () => [],
    description: '右键菜单配置'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用右键菜单'
  },
  selectHandler: {
    type: Function,
    default: () => {},
    description: '选中菜单项时的回调函数'
  }
}
