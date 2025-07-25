import { cloneDeep } from 'lodash-es'
import { h } from 'vue'
import Icon from './LewCommonIcon.vue'

export * from './render'

export const iconColorType: Record<string, string> = {
  normal: 'gray',
  warning: 'orange',
  success: 'green',
  error: 'red',
  danger: 'red',
  info: 'blue',
  primary: 'blue',
  tips: 'blue',
}

export function getColorType(type: string): string {
  const typeMap: Record<string, string> = iconColorType
  return typeMap[type as string] || type
}

export function object2class(prefix: string, props: object) {
  let className = ''
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'boolean' && value) {
      className += ` ${prefix}-${key}`
    }
    else if (typeof value === 'string' || typeof value === 'number') {
      className += ` ${prefix}-${key}-${value}`
    }
  }
  return className
}

export function numFormat(num: number) {
  const str = num.toString().split('.')
  let integerPart = str[0]
  const decimalPart = str[1] ? `.${str[1]}` : ''
  const reg = /(\d+)(\d{3})/
  while (reg.test(integerPart)) {
    integerPart = integerPart.replace(reg, '$1' + ',' + '$2')
  }
  return integerPart + decimalPart
}

export function any2px(value: number | string | undefined): string {
  if (!value) {
    return ''
  }

  const autoRegex = /^auto$/i
  const calcRegex = /^calc\((.+)\)$/
  const percentRegex = /^-?\d+(\.\d+)?%$/
  const pixelRegex = /^-?\d+(\.\d+)?(px)?$/
  const numericRegex = /^-?\d+(\.\d+)?$/

  const _value = String(value)

  if (_value.startsWith('calc')) {
    return _value
  }

  if (numericRegex.test(_value)) {
    return `${value}px`
  }
  if (autoRegex.test(_value)) {
    return _value
  }
  if (percentRegex.test(_value)) {
    return _value
  }
  if (calcRegex.test(_value)) {
    return _value
  }
  if (pixelRegex.test(_value)) {
    return `${_value}`
  }
  const numValue = Number.parseFloat(_value)
  if (!Number.isNaN(numValue)) {
    return `${numValue}px`
  }

  return ''
}

export function isValidCssValue({
  name,
  field,
  value,
}: {
  name: string
  field: string
  value: number | string | undefined
}): boolean {
  if (!value) {
    return false
  }
  const autoRegex = /^auto$/i
  const calcRegex = /^calc\((.+)\)$/
  const percentRegex = /^-?\d+(\.\d+)?%$/
  const pixelRegex = /^-?\d+(\.\d+)?(px)?$/
  const numericRegex = /^-?\d+(\.\d+)?$/

  const _value = String(value)
  if (
    autoRegex.test(_value)
    || calcRegex.test(_value)
    || percentRegex.test(_value)
    || pixelRegex.test(_value)
    || numericRegex.test(_value)
  ) {
    return true
  }
  console.warn(`[${name}] ${field} 属性的值 ${_value} 不是有效的 CSS 值。`)
  return false
}

export function getUniqueId() {
  // 生成 UUID v4
  const uuid = crypto.randomUUID()
  // 取前6位
  return uuid.substring(0, 8)
}

export function formatFormByMap(formMap: any) {
  const form = {}
  Object.keys(formMap).forEach((key) => {
    const value = formMap[key]
    const keys = key.split('.')
    let obj: any = form
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]
      if (!obj[k]) {
        obj[k] = {}
      }
      obj = obj[k]
    }
    obj[keys[keys.length - 1]] = value
  })
  return form
}

export function flattenNestedObject(form: any) {
  const formMap: Record<string, any> = {}

  const buildMap = (obj: any, prefix: string = '') => {
    for (const key in obj) {
      const value = obj[key]
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof value === 'object' && value !== null) {
        buildMap(value, newKey)
      }
      else {
        formMap[newKey] = value
      }
    }
  }

  buildMap(form)
  return formMap
}

export function retrieveNestedFieldValue(obj: any, field: string) {
  if (!field) {
    return undefined
  }
  const keys = field.split('.') // 将字符串的嵌套字段按照 '.' 分割成数组
  let value = obj
  for (const key of keys) {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) {
      value = value[key]
    }
    else {
      return undefined // 如果找不到字段，返回 undefined
    }
  }
  return value // 返回目标字段的值
}

export function formatBytes(bytes: number, decimals: number = 2) {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export function getAssetsFile({
  name,
  type,
}: {
  name: string
  type: string
}) {
  return new URL(`../assets/${type}/${name}`, import.meta.url).href
}

export function getFileIcon(fileName: string = '') {
  // 根据文件名获取后缀名
  const suffix = fileName.split('.').pop()

  switch (suffix) {
    case 'doc':
    case 'docx':
    case 'wps':
      return getAssetsFile({ name: 'file_word.svg', type: 'icon' })
    case 'pdf':
    case 'PDF':
      return getAssetsFile({ name: 'file_pdf.svg', type: 'icon' })
    case 'ppt':
    case 'pptx':
      return getAssetsFile({ name: 'file_ppt.svg', type: 'icon' })
    case 'txt':
      return getAssetsFile({ name: 'file_txt.svg', type: 'icon' })
    case 'xls':
    case 'xlsx':
    case 'et':
    case 'etx':
    case 'ett':
      return getAssetsFile({ name: 'file_excel.svg', type: 'icon' })
    case 'csv':
      return getAssetsFile({ name: 'file_csv.svg', type: 'icon' })
    case 'zip':
    case 'rar':
    case '7z':
    case 'gz':
      return getAssetsFile({ name: 'file_rar.svg', type: 'icon' })
    case 'mp3':
    case 'wma':
    case 'm4a':
    case 'mp3x':
      return getAssetsFile({ name: 'file_audio.svg', type: 'icon' })
    case 'mp4':
    case 'avi':
    case 'mkv':
    case 'flv':
      return getAssetsFile({ name: 'file_mp4.svg', type: 'icon' })
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
    case 'svg':
    case 'bmp':
    case 'ico':
      return getAssetsFile({ name: 'file_img.svg', type: 'icon' })
    case 'psd':
      return getAssetsFile({ name: 'file_psd.svg', type: 'icon' })
    case 'ai':
    case 'cdr':
      return getAssetsFile({ name: 'file_ai.svg', type: 'icon' })
    case 'cad':
      return getAssetsFile({ name: 'file_cad.svg', type: 'icon' })
    case 'html':
    case 'htm':
    case 'xhtml':
      return getAssetsFile({ name: 'file_html.svg', type: 'icon' })
    case 'project':
      return getAssetsFile({ name: 'file_project.svg', type: 'icon' })
    case 'vsdx':
      return getAssetsFile({ name: 'file_visio.svg', type: 'icon' })
    default:
      return getAssetsFile({ name: 'file_default.svg', type: 'icon' })
  }
}

export function getIconInnerHTML(e: any = {}) {
  const el: Element = document.createElement('div')
  const icon = createApp({
    render() {
      return h(Icon, { ...e })
    },
  })
  icon.mount(el)
  return el.innerHTML
}

export function checkUrlIsImage(url: string = ''): boolean {
  // 移除正则中的捕获分组，避免未使用的分组警告
  const imageRegex = /\.(?:jpg|jpeg|png|webp|bmp|gif|svg|tiff|ico|heif|jfif|pjpeg|pjp|avif)$/i
  return imageRegex.test(url)
}

export function dragmove({
  el,
  parentEl,
  direction = 'both',
  callback,
  max,
  min,
  step = () => 1,
  trackMax,
  trackMin,
}: {
  el: HTMLElement
  parentEl: HTMLElement
  direction?: 'horizontal' | 'vertical' | 'both'
  callback?: (position: {
    x: number
    y: number
    percentX: number
    percentY: number
  }) => void
  max: () => number
  min: () => number
  step?: () => number
  trackMax: () => number
  trackMin: () => number
}) {
  let isDragging = false
  let startX: number, startY: number
  let parentRect: DOMRect

  const getClampedValues = () => {
    const clampedMinValue = Math.max(min(), trackMin())
    const clampedMaxValue = Math.min(max(), trackMax())
    return { clampedMinValue, clampedMaxValue }
  }

  const snapToGrid = (value: number, gridSize: number) => {
    return Math.round(value / gridSize) * gridSize
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging)
      return

    let newX = e.clientX - startX
    let newY = e.clientY - startY
    const { clampedMinValue, clampedMaxValue } = getClampedValues()

    if (direction === 'horizontal' || direction === 'both') {
      const trackWidth = parentRect.width
      const minX
        = ((clampedMinValue - trackMin()) / (trackMax() - trackMin()))
          * trackWidth
      const maxX
        = ((clampedMaxValue - trackMin()) / (trackMax() - trackMin()))
          * trackWidth
      newX = Math.max(minX, Math.min(newX, maxX))
      const stepSize = trackWidth / ((trackMax() - trackMin()) / step())
      newX = snapToGrid(newX, stepSize)
      el.style.left = `${newX}px`
    }

    if (direction === 'vertical' || direction === 'both') {
      const trackHeight = parentRect.height
      const minY
        = ((clampedMinValue - trackMin()) / (trackMax() - trackMin()))
          * trackHeight
      const maxY
        = ((clampedMaxValue - trackMin()) / (trackMax() - trackMin()))
          * trackHeight
      newY = Math.max(minY, Math.min(newY, maxY))
      const stepSize = trackHeight / ((trackMax() - trackMin()) / step())
      newY = snapToGrid(newY, stepSize)
      el.style.top = `${newY}px`
    }

    if (callback) {
      callback({
        x: Number(newX.toFixed(2)),
        y: Number(newY.toFixed(2)),
        percentX: Number((newX / parentRect.width).toFixed(2)),
        percentY: Number((newY / parentRect.height).toFixed(2)),
      })
    }
  }

  const onMouseUp = () => {
    isDragging = false
    document.body.style.userSelect = 'auto'
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  const onMouseDown = (e: MouseEvent) => {
    isDragging = true
    startX = e.clientX - el.offsetLeft
    startY = e.clientY - el.offsetTop

    parentRect = parentEl.getBoundingClientRect()
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
  el.addEventListener('mousedown', onMouseDown)

  return () => {
    el.removeEventListener('mousedown', onMouseDown)
  }
}

export function parseToStandardJSON(str: string) {
  const modifiedStr = str
    .replace(/'/g, '"') // 替换单引号为双引号
    .replace(/(\{|,)\s*(\w+)\s*:/g, '$1"$2":') // 给没有引号的字段名加上双引号
  return JSON.parse(modifiedStr)
}

export function poll({
  interval = 10,
  timeout = 1000 * 3,
  callback,
  vail,
}: {
  interval?: number
  timeout?: number
  callback: () => void
  vail: () => boolean
}) {
  const startTime = Date.now()
  let timer: NodeJS.Timeout | null = null

  const execute = () => {
    if (Date.now() - startTime > timeout) {
      if (timer)
        clearTimeout(timer)
      return
    }

    if (vail()) {
      if (timer)
        clearTimeout(timer)
      callback()
      return
    }

    timer = setTimeout(execute, interval)
  }

  execute()
}

export function insertChildByKey(tree: any, key: string | number, newChild: any): boolean {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].key === key) {
      tree[i].children = newChild
      return true
    }
    if (tree[i].children?.length) {
      if (insertChildByKey(tree[i].children, key, newChild)) {
        return true
      }
    }
  }
  return false
}

export function findAllChildrenKeys(node: any) {
  const keys: (string | number)[] = []

  const traverse = (item: any) => {
    if (item.key !== undefined)
      keys.push(item.key)
    item.children?.forEach(traverse)
  }

  node.children?.forEach(traverse)

  return keys
}

export function findNodeByKey(key: string | number, tree: any) {
  const queue: any = cloneDeep(tree)

  while (queue.length > 0) {
    const node = queue.shift()!
    if (node.key === key)
      return node
    if (node.children?.length) {
      queue.push(...node.children)
    }
  }

  return null
}
