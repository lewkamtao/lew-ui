import tippy from 'tippy.js'
import type { App, DirectiveBinding } from 'vue'
import { getUniqueId } from 'lew-ui/utils'
import { isFunction } from 'lodash-es'
import _LewContextMenu from './LewContextMenu.vue'

export const initLewContextMenu = () => {
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
      delay: [250, 250],
      arrow: false,
      appendTo: () => document.body,
      allowHTML: true
    }),
    menuInstance: {}
  }
  window.LewContextMenu.instance.popper.children[0].setAttribute(
    'data-lew',
    'popover'
  )
}

const findContextMenuId = (el: HTMLElement): string => {
  try {
    const id = el.getAttribute('lew-context-menu-id')
    if (id) return id
    return el.parentNode ? findContextMenuId(el.parentNode as HTMLElement) : ''
  } catch {
    return ''
  }
}

export const LewVContextMenu = {
  install(app: App) {
    app.directive('context-menu', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        if (!window.LewContextMenu) {
          initLewContextMenu()
        }

        if (!el.id) {
          const id = getUniqueId()
          el.setAttribute('lew-context-menu-id', id)
          const { options } = binding.value
          window.LewContextMenu.menu[id] = options || []
        }

        if (!window.LewContextMenu.contextMenu) {
          window.LewContextMenu.contextMenu = (e: MouseEvent) => {
            const id = findContextMenuId(e.target as HTMLElement)
            if (!id) return
            e.preventDefault()
            const options = window.LewContextMenu.menu[id]
            const { instance } = window.LewContextMenu
            instance.hide()
            const menuDom = document.createElement('div')

            Object.keys(window.LewContextMenu.menuInstance).forEach(
              (key: string) => {
                window.LewContextMenu.menuInstance[key].destroy()
                delete window.LewContextMenu.menuInstance[key]
              }
            )

            createApp({
              render() {
                return h(_LewContextMenu, {
                  options,
                  onSelect: (item: ContextMenus) => {
                    const { selectHandler } = binding.value
                    if (isFunction(selectHandler)) {
                      selectHandler(item)
                    }
                    if (!(item.children || []).length) {
                      instance.hide()
                    }
                  }
                })
              }
            }).mount(menuDom)
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
          window.addEventListener(
            'contextmenu',
            window.LewContextMenu.contextMenu
          )
        }
      },
      updated(el: HTMLElement, binding: DirectiveBinding) {
        const id = findContextMenuId(el)
        if (id) {
          const { options } = binding.value
          window.LewContextMenu.menu[id] = options || []
        } else {
          console.error('发生未知错误！找不到 lew-context-menu-id。')
        }
      }
    })
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
    default: () => [],
    description: '右键菜单配置'
  }
}
