import type { LewContextMenusOption, LewMenuTrigger } from 'lew-ui/types'
import type { Instance as TippyInstance } from 'tippy.js'
import type { DirectiveBinding, App as VueApp } from 'vue'
import { getUniqueId } from 'lew-ui/utils'
import tippy from 'tippy.js'
import { createApp, defineAsyncComponent, h } from 'vue'

export { contextMenuProps } from './src/props'

const MENU_SHOW_DELAY = 120
const ATTR_MENU_ID = 'lew-context-menu-id'
const ATTR_DATA_LEW = 'data-lew'

interface MenuAppInstance {
  app: VueApp
  element: HTMLElement
}

interface LewContextMenuConfig {
  menu: Record<string, {
    options: LewContextMenusOption[]
    disabled: boolean
    trigger: LewMenuTrigger
  }>
  disabledIds: string[]
  contextMenu: ((e: MouseEvent) => void) | null
  prevId: string
  instance: TippyInstance | null
  menuInstance: Record<string, TippyInstance>
  appInstances: Map<string, MenuAppInstance>
  isInitialized: boolean
}

declare global {
  interface Window {
    LewContextMenu: LewContextMenuConfig
  }
}

export function initLewContextMenu(): void {
  if (window.LewContextMenu?.isInitialized)
    return

  const instance = tippy(document.body, {
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
  })

  window.LewContextMenu = {
    menu: {},
    disabledIds: [],
    contextMenu: null,
    prevId: '',
    instance,
    menuInstance: {},
    appInstances: new Map(),
    isInitialized: true,
  }

  try {
    const popperElement = instance.popper?.children?.[0] as HTMLElement
    if (popperElement) {
      popperElement.setAttribute(ATTR_DATA_LEW, 'popover')
    }
  }
  catch (error) {
    console.warn('[LewContextMenu] Failed to set popover attribute:', error)
  }
}

function createContextMenu(options: LewContextMenusOption[]): HTMLElement {
  const _LewContextMenu = defineAsyncComponent(() => import('./src/LewContextMenu.vue'))
  const menuDom = document.createElement('div')
  const app = createApp({
    render() {
      return h(_LewContextMenu, { options })
    },
  })

  app.mount(menuDom)

  const instanceId = getUniqueId()
  window.LewContextMenu.appInstances.set(instanceId, {
    app,
    element: menuDom,
  })

  menuDom.dataset.instanceId = instanceId
  return menuDom
}

function destroyContextMenu(menuDom: HTMLElement): void {
  const instanceId = menuDom.dataset.instanceId
  if (instanceId) {
    const instance = window.LewContextMenu.appInstances.get(instanceId)
    if (instance) {
      try {
        instance.app.unmount()
        window.LewContextMenu.appInstances.delete(instanceId)
      }
      catch (error) {
        console.warn('[LewContextMenu] Failed to destroy menu instance:', error)
      }
    }
  }
}

function findMenuId(el: HTMLElement | null): string {
  if (!el)
    return ''

  try {
    const id = el.getAttribute(ATTR_MENU_ID)
    if (id)
      return id
    return findMenuId(el.parentElement)
  }
  catch {
    return ''
  }
}

function showMenu(e: MouseEvent, options: LewContextMenusOption[], trigger: LewMenuTrigger): void {
  const { instance } = window.LewContextMenu
  if (!instance)
    return
  instance.hide()
  const currentContent = instance.props.content as HTMLElement
  if (currentContent) {
    setTimeout(() => {
      destroyContextMenu(currentContent)
    }, MENU_SHOW_DELAY)
  }
  const menuDom = createContextMenu(options)

  const getReferenceClientRect = () => {
    if (trigger === 'hover') {
      const target = e.target as HTMLElement
      const rect = target.getBoundingClientRect()
      return {
        width: 0,
        height: 0,
        top: rect.top,
        bottom: rect.top,
        left: rect.right,
        right: rect.right,
        x: rect.right,
        y: rect.top,
        toJSON: () => ({}),
      }
    }
    return {
      width: 0,
      height: 0,
      top: e.clientY,
      bottom: e.clientY,
      left: e.clientX,
      right: e.clientX,
      x: e.clientX,
      y: e.clientY,
      toJSON: () => ({}),
    }
  }

  setTimeout(() => {
    instance.setProps({ content: menuDom, getReferenceClientRect })
    instance.show()
  }, MENU_SHOW_DELAY)
}

export const LewVContextMenu = {
  install(app: VueApp) {
    app.directive('context-menu', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        initLewContextMenu()

        const { options = [], disabled = false, trigger = 'right-click' } = binding.value
        const elId = el.id || getUniqueId()

        if (!el.id) {
          el.id = elId
        }
        el.setAttribute(ATTR_MENU_ID, elId)

        window.LewContextMenu.menu[elId] = { options, disabled, trigger }

        if (disabled) {
          window.LewContextMenu.disabledIds.push(elId)
        }

        if (!window.LewContextMenu.contextMenu) {
          const handleMenu = (e: MouseEvent, eventTrigger: LewMenuTrigger) => {
            const id = findMenuId(e.target as HTMLElement)
            const menuConfig = window.LewContextMenu.menu[id]

            if (!id || menuConfig?.disabled || menuConfig?.trigger !== eventTrigger)
              return

            if (eventTrigger === 'hover') {
              if (window.LewContextMenu.prevId === id)
                return
              window.LewContextMenu.prevId = id
            }
            else {
              e.preventDefault()
            }

            showMenu(e, menuConfig.options, eventTrigger)
          }

          const rightClickHandler = (e: MouseEvent) => handleMenu(e, 'right-click')
          const leftClickHandler = (e: MouseEvent) => handleMenu(e, 'left-click')
          const hoverHandler = (e: MouseEvent) => handleMenu(e, 'hover')

          window.LewContextMenu.contextMenu = rightClickHandler
          window.addEventListener('contextmenu', rightClickHandler)
          window.addEventListener('click', leftClickHandler)
          window.addEventListener('mouseover', hoverHandler)
        }
      },

      updated(el: HTMLElement, binding: DirectiveBinding) {
        const id = findMenuId(el)
        if (!id) {
          console.error('[LewContextMenu] Invalid lew-context-menu-id: "". Expected: valid element id.')
          return
        }

        const { options = [], disabled = false, trigger = 'right-click' } = binding.value
        window.LewContextMenu.menu[id] = { options, disabled, trigger }

        const disabledIds = window.LewContextMenu.disabledIds
        const isCurrentlyDisabled = disabledIds.includes(id)

        if (disabled && !isCurrentlyDisabled) {
          disabledIds.push(id)
        }
        else if (!disabled && isCurrentlyDisabled) {
          window.LewContextMenu.disabledIds = disabledIds.filter(item => item !== id)
        }
      },

      unmounted(el: HTMLElement) {
        const id = findMenuId(el)
        if (id) {
          delete window.LewContextMenu.menu[id]
          window.LewContextMenu.disabledIds = window.LewContextMenu.disabledIds.filter(item => item !== id)

          const menuInstance = window.LewContextMenu.menuInstance[id]
          if (menuInstance) {
            try {
              menuInstance.destroy()
              delete window.LewContextMenu.menuInstance[id]
            }
            catch (error) {
              console.warn('[LewContextMenu] Failed to destroy menu instance:', error)
            }
          }
        }
      },
    })
  },
}

export function destroyLewContextMenu(): void {
  if (!window.LewContextMenu)
    return

  try {
    window.LewContextMenu.appInstances.forEach((instance) => {
      try {
        instance.app.unmount()
      }
      catch (error) {
        console.warn('[LewContextMenu] Failed to unmount app instance:', error)
      }
    })
    window.LewContextMenu.appInstances.clear()

    Object.values(window.LewContextMenu.menuInstance).forEach((instance) => {
      try {
        instance.destroy()
      }
      catch (error) {
        console.warn('[LewContextMenu] Failed to destroy tippy instance:', error)
      }
    })

    if (window.LewContextMenu.instance) {
      try {
        window.LewContextMenu.instance.destroy()
      }
      catch (error) {
        console.warn('[LewContextMenu] Failed to destroy main instance:', error)
      }
    }

    if (window.LewContextMenu.contextMenu) {
      window.removeEventListener('contextmenu', window.LewContextMenu.contextMenu)
      window.removeEventListener('click', window.LewContextMenu.contextMenu)
      window.removeEventListener('mouseover', window.LewContextMenu.contextMenu)
    }

    window.LewContextMenu = undefined as any
  }
  catch (error) {
    console.error('[LewContextMenu] Error during cleanup:', error)
  }
}
