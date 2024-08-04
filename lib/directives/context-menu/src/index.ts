import tippy from 'tippy.js'
import type { App, DirectiveBinding } from 'vue'
import { getUniqueId } from 'lew-ui/utils'
import _LewContextMenu from './LewContextMenu.vue'
import { isFunction } from 'lodash-es'

export const LewVContextMenu = {
  install(app: App) {
    app.directive('context-menu', {
      mounted(el: any, binding: DirectiveBinding) {
        // 创建右键索引
        if (!window.LewContextMenu) {
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
              arrow: false,
              appendTo: () => document.body,
              allowHTML: true
            }),
            menuInstance: {}
          }
          window.LewContextMenu.instance.popper.children[0].setAttribute('data-lew', 'popover')
        }

        if (!el.id) {
          const _id = getUniqueId()
          el.setAttribute('lew-context-menu-id', _id)
          const { options } = binding.value
          window.LewContextMenu.menu[_id] = options || []
        }

        if (!window.LewContextMenu.contextMenu) {
          window.LewContextMenu.contextMenu = (e: any) => {
            const _id = findContextMenuId(e.target)
            if (!_id) return
            e.preventDefault()
            const options = window.LewContextMenu.menu[_id]
            const { instance } = window.LewContextMenu
            instance.hide() // 隐藏上一个菜单
            const menuDom = document.createElement('div')
            // 清除上一个菜单
            Object.keys(window.LewContextMenu.menuInstance).forEach((key: string) => {
              window.LewContextMenu.menuInstance[key].destroy()
              delete window.LewContextMenu.menuInstance[key]
            })

            createApp({
              render() {
                return h(_LewContextMenu, {
                  options,
                  onSelect: (item: ContextMenus) => {
                    const { selectHandler } = binding.value
                    // 执行回调
                    if (isFunction(selectHandler)) {
                      selectHandler(item)
                    }
                    if ((item.children || []).length === 0) {
                      // 隐藏
                      instance.hide()
                    }
                  }
                })
              }
            }).mount(menuDom)

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
          }
          window.addEventListener('contextmenu', window.LewContextMenu.contextMenu)
        }
      },
      updated(el: any, binding: DirectiveBinding) {
        const _id = findContextMenuId(el)
        if (_id) {
          // 更新右键索引
          const { options } = binding.value
          window.LewContextMenu.menu[_id] = options || []
        } else {
          console.error('发生未知错误！找不到 lew-context-menu-id。')
        }
      }
    })
  }
}

const findContextMenuId = (el: HTMLElement): string => {
  try {
    const _id = el.getAttribute('lew-context-menu-id')
    if (_id) {
      return _id
    }
    if (el.parentNode) {
      return findContextMenuId(el.parentNode as HTMLElement)
    }
    return ''
  } catch {
    return ''
  }
}

export interface ContextMenus {
  label?: string
  value?: string
  type?: string
  icon?: string
  children?: ContextMenus[]
  disabled?: boolean
  level?: number
  isDividerLine?: false
  [key: string]: any
}

export const contextMenuProps = {
  options: {
    type: Array as PropType<ContextMenus[]>,
    default: [],
    description: '右键菜单配置'
  }
}
