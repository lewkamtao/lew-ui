import tippy from 'tippy.js'
import type { App as Application, DirectiveBinding } from 'vue'
import { getUniqueId } from 'lew-ui/utils'

export const LewContextmenu = {
  install(app: Application) {
    app.directive('contextmenu', {
      mounted(el: any, binding: DirectiveBinding) {
        // 创建右键索引
        if (!window.LewContextmenu) {
          window.LewContextmenu = {
            menu: {},
            contextmenu: null,
            instance: tippy(document.body, {
              theme: 'light',
              animation: 'shift-away-subtle',
              trigger: 'manual',
              interactive: true,
              placement: 'right-start',
              duration: [250, 250],
              arrow: false,
              appendTo: () => document.body,
              allowHTML: true,
              content: '<div style="height: 100px;width: 100px">123131</div>',
            })
          }
          window.LewContextmenu.instance.popper.children[0].setAttribute('data-lew', 'popover')
        }

        if (!el.id) {
          const _id = getUniqueId()
          el.setAttribute('lew-contextmenu-id', _id)
          window.LewContextmenu.menu[_id] = binding.value
        }

        if (!window.LewContextmenu.contextmenu) {
          window.LewContextmenu.contextmenu = (e: any) => {
            e.preventDefault()
            const _id = findContextmenuId(e.target)
            if (!_id) return
            const menu = window.LewContextmenu.menu[_id]

            const { instance } = window.LewContextmenu

            instance.setProps({
              content: JSON.stringify(menu),
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
          window.addEventListener('contextmenu', window.LewContextmenu.contextmenu)
        }
      },
      updated(el: any, binding: DirectiveBinding) {
        const _id = findContextmenuId(el)
        if (_id) {
          // 更新右键索引
          window.LewContextmenu.menu[_id] = binding.value
        } else {
          console.error('发生未知错误！找不到 lew-contextmenu-id。')
        }
      },
      unmounted(el: any) {}
    })
  }
}

const findContextmenuId = (el: any) => {
  try {
    const _id = el.getAttribute('lew-contextmenu-id')
    if (_id) {
      return _id
    }
    if (el.parentNode) {
      return findContextmenuId(el.parentNode)
    }
  } catch {
    return null
  }
}
