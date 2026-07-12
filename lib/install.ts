import type { App, Component, Plugin } from 'vue'
import * as components from './components'
import * as directives from './directives'
import * as methods from './methods'

interface NamedMethod {
  name: string
  [key: string]: unknown
}

function isNamedMethod(value: unknown): value is NamedMethod {
  return Boolean(
    value
    && typeof value === 'object'
    && 'name' in value
    && typeof (value as NamedMethod).name === 'string',
  )
}

/**
 * 全局安装：注册全部组件、指令，并挂载命令式 API
 */
export function install(app: App): void {
  Object.keys(components).forEach((key) => {
    const component = components[key as keyof typeof components] as Component
    const name = component.name || (component as { __name?: string }).__name
    if (name) {
      app.component(name, component)
    }
  })

  Object.keys(directives).forEach((key) => {
    const directive = directives[key as keyof typeof directives]
    if (typeof directive === 'object' && directive && 'install' in directive) {
      app.use(directive as Plugin)
    }
  })

  Object.keys(methods).forEach((key) => {
    const methodInstance = methods[key as keyof typeof methods]
    if (!isNamedMethod(methodInstance))
      return

    const { name } = methodInstance
    // 推荐：通过 this.LewMessage / 模板无导入访问
    app.config.globalProperties[name] = methodInstance

    // 兼容旧用法：浏览器环境下仍挂到 window（SSR 安全）
    if (typeof window !== 'undefined') {
      ;(window as unknown as Record<string, unknown>)[name] = methodInstance
    }
  })
}

const LewUI: Plugin = { install }

export default LewUI
