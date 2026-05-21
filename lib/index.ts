import type { App, Component } from 'vue'

// 全局 => 定义 install 方法
import * as components from './components'
import * as directives from './directives'
import * as methods from './methods'
// tippy 样式
import 'tippy.js/dist/tippy.css' // optional for styling
import 'tippy.js/animations/shift-away-subtle.css'

import 'tippy.js/animations/scale-subtle.css'
// 引入样式
import './styles/index.scss'

export * from './components'
export * from './directives'
export * from './locals'
export * from './methods'
export * from './types'

function install(Vue: App): void {
  Object.keys(components).forEach((key) => {
    const component = components[key as keyof typeof components] as Component
    const name = component.name || (component as { __name?: string }).__name
    if (name) {
      Vue.component(name, component)
    }
  })

  Object.keys(directives).forEach((key) => {
    const directive = directives[key as keyof typeof directives]
    if (typeof directive === 'object' && directive && 'install' in directive) {
      Vue.use(directive as { install: (app: App) => void })
    }
  })

  Object.keys(methods).forEach((key) => {
    const methodInstance = methods[key as keyof typeof methods]
    if (methodInstance && typeof methodInstance === 'object' && 'name' in methodInstance) {
      ;(window as unknown as Record<string, unknown>)[methodInstance.name as string]
        = methodInstance
    }
  })
}

export default { install }
