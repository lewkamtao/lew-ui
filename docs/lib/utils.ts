import { LewTag } from 'lew-ui'
import { h } from 'vue'

export function convertProps(json: any) {
  const props = []
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      let type = ''
      if (Array.isArray(json[key].type)) {
        type = json[key].type
          .map((item: any) =>
            item ? item.toString().match(/function\s+(\w+)/)[1] : '',
          )
          .filter((item: any) => item !== '')
          .join(' | ')
      }
      else {
        type
          = json[key].type !== null
            ? json[key].type.toString().match(/function\s+(\w+)/)[1]
            : ''
      }
      if (!json[key].hidden) {
        const prop = {
          ...json[key],
          name: key,
          description: json[key].description,
          type,
          default: JSON.stringify(json[key].default),
        }
        props.push(prop)
      }
    }
  }
  return props
}

export function convertEmits(emits: Record<string, (...args: any[]) => any>) {
  const emitsList = []
  for (const key in emits) {
    if (Object.prototype.hasOwnProperty.call(emits, key)) {
      const emitFn = emits[key]
      const fnString = emitFn.toString()

      // 提取函数参数，包括类型信息
      // 匹配整个函数签名，例如: (item: LewMenuOption) => item
      const arrowIndex = fnString.indexOf('=>')
      let argument = '-'

      if (arrowIndex > 0) {
        const beforeArrow = fnString.substring(0, arrowIndex)
        const parenMatch = beforeArrow.match(/\(([^)]*)\)/)

        if (parenMatch && parenMatch[1].trim()) {
          const paramsString = parenMatch[1].trim()
          // 分割参数，但保持类型信息
          const params = paramsString.split(',').map(p => p.trim()).filter(p => p)

          if (params.length > 0) {
            argument = params.map((param) => {
              // 处理参数类型，例如: item: LewMenuOption
              const colonIndex = param.indexOf(':')
              if (colonIndex > 0) {
                const paramName = param.substring(0, colonIndex).trim()
                const paramType = param.substring(colonIndex + 1).trim()
                return `${paramName}: ${paramType}`
              }
              return param
            }).join(', ')
          }
        }
      }

      const emitItem = {
        name: key,
        argument,
        description: '', // 描述会通过国际化文件获取
      }
      emitsList.push(emitItem)
    }
  }
  return emitsList
}

/**
 * 将对象转成文件并下载
 * @param {object} data - 要转成文件的对象数据
 * @param {string} filename - 下载的文件名
 */
export function downloadObjectAsFile(data: any, filename: string) {
  // 创建一个Blob对象，Blob表示一个不可变的原始数据的类文件对象，将对象转成JSON字符串
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })

  // 创建一个临时URL对象，用于生成下载链接
  const url = URL.createObjectURL(blob)

  // 创建一个<a>标签并设置下载链接和文件名，模拟点击实现文件下载
  const a = document.createElement('a')
  a.href = url
  a.download = filename

  // 将<a>标签添加到文档中并触发点击事件，开始下载文件
  document.body.appendChild(a)
  a.click()

  // 下载完成后移除临时URL和<a>标签
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

// 获取assets静态资源
export function getAssetsFile({
  name,
  type,
}: {
  name: string
  type: string
}) {
  return new URL(`../assets/images/${type}/${name}`, import.meta.url).href
}

export function getComponentIcon(name: string) {
  return getAssetsFile({ name: `${name}.svg`, type: 'icon' })
}

export function renderDescription(text: string) {
  // 使用正则表达式匹配 ``` 包裹的文本
  const regex = /```([^`]+)```/g
  const parts = []
  let lastIndex = 0
  let match

  while (true) {
    match = regex.exec(text)
    if (match === null)
      break
    // 添加匹配前的文本
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // 添加匹配的文本作为 LewTag 组件
    parts.push(h(LewTag, { color: 'info' }, match[1]))

    lastIndex = match.index + match[0].length
  }

  // 添加剩余的文本
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  // 如果没有匹配到任何内容，直接返回文本
  if (parts.length === 0) {
    return text
  }

  // 将数组转换为 VNode，使用 span 作为容器
  return h('span', {}, parts)
}

/**
 * 组件分类映射表
 * 根据组件名映射到对应的分类目录
 */
const componentCategoryMap: Record<string, string> = {
  // general
  avatar: 'general',
  badge: 'general',
  button: 'general',
  flex: 'general',
  image: 'general',
  mark: 'general',
  tag: 'general',
  title: 'general',
  'text-trim': 'general',
  icon: 'general',
  // form
  cascader: 'form',
  checkbox: 'form',
  'color-picker': 'form',
  'date-picker': 'form',
  'date-range-picker': 'form',
  input: 'form',
  'input-number': 'form',
  'input-table': 'form',
  'input-tag': 'form',
  radio: 'form',
  rate: 'form',
  select: 'form',
  slider: 'form',
  'slider-range': 'form',
  switch: 'form',
  textarea: 'form',
  'tree-select': 'form',
  upload: 'form',
  // data
  collapse: 'data',
  desc: 'data',
  table: 'data',
  tree: 'data',
  // feedback
  alert: 'feedback',
  drawer: 'feedback',
  empty: 'feedback',
  loading: 'feedback',
  message: 'feedback',
  modal: 'feedback',
  notification: 'feedback',
  popok: 'feedback',
  popover: 'feedback',
  // navigation
  'back-top': 'navigation',
  breadcrumb: 'navigation',
  menu: 'navigation',
  'menu-tree': 'navigation',
  pagination: 'navigation',
  steps: 'navigation',
  tabs: 'navigation',
}

/**
 * 根据组件名获取 mdc 文件路径
 * @param componentName - 组件名（如 'collapse', 'input-number'）
 * @returns mdc 文件路径，如果找不到返回 null
 */
export function getMdcPath(componentName: string): string | null {
  if (!componentName) return null

  // 将组件名转换为小写
  const normalizedName = componentName.toLowerCase()

  // 查找组件分类
  const category = componentCategoryMap[normalizedName]

  if (!category) {
    // 如果找不到，尝试所有分类
    const categories = ['general', 'form', 'data', 'feedback', 'navigation']
    // 返回第一个可能的路径（让组件尝试加载）
    return `../../lib/components/${categories[0]}/${normalizedName}/${normalizedName}.mdc`
  }

  // 返回完整的相对路径
  return `../../lib/components/${category}/${normalizedName}/${normalizedName}.mdc`
}
