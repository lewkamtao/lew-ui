import tippy from 'tippy.js'
import type { App, DirectiveBinding } from 'vue'
import { getUniqueId } from 'lew-ui/utils'
import _LewContextMenu from './LewContextMenu.vue'

export const LewContextMenu = {
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
            })
          }
          window.LewContextMenu.instance.popper.children[0].setAttribute('data-lew', 'popover')
        }

        if (!el.id) {
          const _id = getUniqueId()
          el.setAttribute('lew-context-menu-id', _id)
          const { menus } = binding.value
          window.LewContextMenu.menu[_id] = menus || []
        }

        if (!window.LewContextMenu.contextMenu) {
          window.LewContextMenu.contextMenu = (e: any) => {
            const _id = findContextMenuId(e.target)
            if (!_id) return
            e.preventDefault()
            const menus = window.LewContextMenu.menu[_id]
            const { instance } = window.LewContextMenu
            const menuDom = document.createElement('div')
            createApp({
              render() {
                return h(_LewContextMenu, {
                  menus,
                  onClickitem: (e: any) => {
                    console.log(e)
                  }
                })
              }
            }).mount(menuDom)

            instance.hide()

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
            }, 100)
          }
          window.addEventListener('contextmenu', window.LewContextMenu.contextMenu)
        }
      },
      beforeUnmount(el: any) {
        const { instance } = window.LewContextMenu
        instance.hide()
      },
      updated(el: any, binding: DirectiveBinding) {
        const _id = findContextMenuId(el)
        if (_id) {
          // 更新右键索引
          const { menus } = binding.value
          window.LewContextMenu.menu[_id] = menus
        } else {
          console.error('发生未知错误！找不到 lew-context-menu-id。')
        }
      },
      unmounted(el: any) {}
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
