import type { Component, VNode } from 'vue'
import { defineComponent, isVNode } from 'vue'

export function isValidComponent(input: any): boolean {
  return isVNode(input) || isComponentOptions(input)
}

export function formatComponent(input: any): Component | undefined {
  if (input == null || input === '') {
    return undefined
  }

  if (isVNode(input)) {
    return createVNodeComponent(input)
  }

  const type = typeof input

  if (type === 'string' || type === 'number' || type === 'boolean') {
    return createTextComponent(String(input))
  }

  if (type === 'function') {
    return createFunctionComponent(input)
  }

  if (type === 'object') {
    return createObjectComponent(input)
  }

  return undefined
}

function createObjectComponent(component: any): Component | undefined {
  if (isComponentOptions(component)) {
    return defineComponent(component)
  }

  if (component.component) {
    return formatComponent(component.component)
  }

  return undefined
}

function createFunctionComponent(component: any): Component {
  if (component.props) {
    return defineComponent({
      props: component.props,
      setup(props, ctx) {
        return () => component(props, ctx)
      },
    })
  }

  const paramCount = component.length

  return defineComponent({
    setup(props, ctx) {
      if (paramCount >= 2) {
        return () => component(props, ctx)
      }
      if (paramCount === 1) {
        return () => component(props)
      }
      return () => component()
    },
  })
}

function createTextComponent(text: string): Component {
  return defineComponent({
    render() {
      return text
    },
  })
}

function createVNodeComponent(vnode: VNode): Component {
  return defineComponent({
    render() {
      return vnode
    },
  })
}

function isComponentOptions(obj: any): boolean {
  if (!obj || typeof obj !== 'object') {
    return false
  }

  if (typeof obj === 'function') {
    const staticProps = ['props', 'emits', 'setup', 'render', 'components', 'mixins', 'extends', 'name', '__vccOpts']
    return staticProps.some(prop => obj[prop])
  }

  const componentProps = [
    'render',
    'setup',
    'template',
    'components',
    'mixins',
    'extends',
    'props',
    'emits',
    'data',
    'computed',
    'watch',
    'methods',
    '__vccOpts',
  ]

  return componentProps.some(prop =>
    prop === 'render' || prop === 'setup'
      ? typeof obj[prop] === 'function'
      : prop === 'template'
        ? typeof obj[prop] === 'string'
        : obj[prop],
  )
}
