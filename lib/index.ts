import type { App } from 'vue'
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
export * from './utils'

function install(Vue: App): void {
  Object.keys(components).forEach((key) => {
    const component: any = components[key as keyof typeof components]
    if (component.name || component.__name) {
      Vue.component(component.name || component.__name, component)
    }
  })

  Object.keys(directives).forEach((key) => {
    const directive = directives[key as keyof typeof directives]
    if (typeof directive === 'object' && 'install' in directive) {
      Vue.use(directive)
    }
  })

  Object.keys(methods).forEach((key) => {
    const methodInstance = methods[key as keyof typeof methods]
    if ('name' in methodInstance) {
      ;(window as any)[methodInstance.name] = methodInstance
    }
  })
}

export default { install }
