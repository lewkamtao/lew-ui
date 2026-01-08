import type { Component, VNode } from 'vue'
import type { LewComponentSource } from '../types'
import { getUniqueId } from 'lew-ui/utils'
import { defineComponent, isVNode } from 'vue'

/**
 * 组件类型枚举
 */
enum ComponentType {
  VNode = 'vnode',
  FunctionalComponent = 'functional',
  ComponentOptions = 'options',
  ComponentInstance = 'instance',
  Text = 'text',
  Unknown = 'unknown',
}

/**
 * 检测组件类型
 * @param componentSource 组件源输入
 * @returns 组件类型
 */
function detectComponentType(componentSource: LewComponentSource): ComponentType {
  if (componentSource === null || componentSource === undefined || componentSource === '') {
    return ComponentType.Unknown
  }

  // VNode 检查 - 最优先，因为isVNode是Vue内置的高效检查
  if (isVNode(componentSource)) {
    return ComponentType.VNode
  }

  // 基础类型检查 - 快速路径
  const inputType = typeof componentSource
  if (inputType === 'string' || inputType === 'number' || inputType === 'boolean') {
    return ComponentType.Text
  }

  // 函数类型检查
  if (inputType === 'function') {
    return detectFunctionComponentType(componentSource)
  }

  // 对象类型检查
  if (inputType === 'object') {
    return detectObjectComponentType(componentSource)
  }

  return ComponentType.Unknown
}

/**
 * 检测函数类型的组件
 * @param func 函数对象
 * @returns 组件类型
 */
function detectFunctionComponentType(func: any): ComponentType {
  // 检查是否有组件相关的静态属性
  if (func.props || func.emits || func.setup || func.render
    || func.components || func.mixins || func.extends
    || func.__vccOpts) {
    return ComponentType.ComponentOptions
  }

  // 无参数的函数视为函数式组件
  if (func.length === 0 && !func.prototype?.constructor) {
    return ComponentType.FunctionalComponent
  }

  // 其他函数视为函数式组件
  return ComponentType.FunctionalComponent
}

/**
 * 检测对象类型的组件
 * @param obj 对象
 * @returns 组件类型
 */
function detectObjectComponentType(obj: any): ComponentType {
  // 组件实例检查
  if (obj.$el || obj.$parent || obj.$root || obj._isVue) {
    return ComponentType.ComponentInstance
  }

  // 组件选项对象检查
  if (obj.render || obj.setup || obj.template
    || obj.components || obj.mixins || obj.extends
    || obj.props || obj.emits || obj.data
    || obj.computed || obj.watch || obj.methods
    || obj.__vccOpts) {
    return ComponentType.ComponentOptions
  }

  // Promise检查 - 不支持的异步组件
  if (obj.then && typeof obj.then === 'function') {
    return ComponentType.Unknown
  }

  // 带有component属性的包装对象
  if ('component' in obj && obj.component !== undefined) {
    return detectComponentType(obj.component)
  }

  return ComponentType.Unknown
}

/**
 * 创建函数式组件的包装器
 * @param component 函数式组件
 * @returns Vue组件
 */
function createFunctionalComponent(component: any): Component {
  return defineComponent({
    name: getUniqueId(),
    setup(props, ctx) {
      return () => {
        // 根据函数签名调用不同的参数
        if (component.length >= 2) {
          return component(props, ctx)
        }
        else if (component.length === 1) {
          return component(props)
        }
        else {
          return component()
        }
      }
    },
  })
}

/**
 * 创建组件选项包装器
 * @param component 组件选项或实例
 * @returns Vue组件
 */
function createOptionsComponent(component: any): Component {
  if (typeof component === 'function') {
    return component
  }

  // 如果是组件实例，返回其构造函数或选项
  if (component.$options) {
    return defineComponent(component.$options)
  }

  // 直接使用组件选项
  return defineComponent(component)
}

/**
 * 创建文本组件
 * @param text 文本内容
 * @returns Vue组件
 */
function createTextComponent(text: string): Component {
  return defineComponent({
    name: 'TextComponent',
    inheritAttrs: false,
    render() {
      return text
    },
  })
}

/**
 * 创建VNode组件包装器
 * @param vnode VNode对象
 * @returns Vue组件
 */
function createVNodeComponent(vnode: VNode): Component {
  return defineComponent({
    name: 'VNodeComponent',
    render() {
      return vnode
    },
  })
}

/**
 * 检查组件是否有效（可以被渲染）
 * @param componentSource 组件源
 * @returns 是否有效
 */
export function isValidComponent(componentSource: LewComponentSource): boolean {
  const componentType = detectComponentType(componentSource)
  return componentType !== ComponentType.Unknown
}

/**
 * 格式化输入为有效的 Vue 组件
 * @param componentSource 可能是组件、组件名称、配置对象等
 * @returns 有效的 Vue 组件
 */
export function formatComponent(componentSource: LewComponentSource): Component | undefined {
  const componentType = detectComponentType(componentSource)
  switch (componentType) {
    case ComponentType.VNode:
      return createVNodeComponent(componentSource as VNode)

    case ComponentType.Text:
      return createTextComponent(String(componentSource))

    case ComponentType.FunctionalComponent:
      return createFunctionalComponent(componentSource as (...args: any[]) => any)

    case ComponentType.ComponentOptions:
    case ComponentType.ComponentInstance:
      return createOptionsComponent(componentSource as Record<string, any>)

    case ComponentType.Unknown:
    default:
      return undefined
  }
}
