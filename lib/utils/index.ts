import { uniqueId } from 'lodash-es'
import Icon from './Icon.vue'
/**
 * 获取颜色类型。
 * @param {string | undefined} type - 消息类型。
 * @returns {string} 对应的颜色类型。
 */

export const iconColorType: Record<string, string> = {
  normal: 'gray',
  warning: 'orange',
  success: 'green',
  error: 'red',
  danger: 'red',
  info: 'blue',
  primary: 'blue',
  tips: 'blue'
}

export const getColorType = (type: string): string => {
  const typeMap: Record<string, string> = iconColorType
  return typeMap[type as string] || type
}

/**
 * 将对象转换为类名字符串。
 * @param {string} prefix - 类名前缀。
 * @param {Object} props - 要转换的属性对象。
 * @returns {string} 生成的类名字符串。
 */
export const object2class = (prefix: string, props: Object) => {
  let className = ''
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'boolean' && value) {
      className += ` ${prefix}-${key}`
    } else if (typeof value === 'string' || typeof value === 'number') {
      className += ` ${prefix}-${key}-${value}`
    }
  }
  return className
}

/**
 * 格式化数字，添加千位分隔符。
 * @param {number} num - 要格式化的数字。
 * @returns {string} 格式化后的字符串。
 */
export const numFormat = (num: number) => {
  const str = num.toString().split('.')
  let integerPart = str[0]
  const decimalPart = str[1] ? `.${str[1]}` : ''
  const reg = /(\d+)(\d{3})/
  while (reg.test(integerPart)) {
    integerPart = integerPart.replace(reg, '$1' + ',' + '$2')
  }
  return integerPart + decimalPart
}

/**
 * 将任意值转换为像素值。
 * @param {number | string | undefined} value - 要转换的值。
 * @returns {string} 转换后的像素值字符串。
 */
export const any2px = (value: number | string | undefined): string => {
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
  const numValue = parseFloat(_value)
  if (!isNaN(numValue)) {
    return `${numValue}px`
  }

  return ''
}

/**
 * 针对上面的 any2px 写一个类型校验方法，确保输入的值是有效的 CSS 值，可以是百分比或者 calc 计算。
 * @param {number | string | undefined} value - 要校验的值。
 * @returns {boolean} 如果输入的值是有效的 CSS 值，则返回 true，否则返回 false。
 */
export const isValidCssValue = ({
  name,
  field,
  value
}: {
  name: string
  field: string
  value: number | string | undefined
}): boolean => {
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
    autoRegex.test(_value) ||
    calcRegex.test(_value) ||
    percentRegex.test(_value) ||
    pixelRegex.test(_value) ||
    numericRegex.test(_value)
  ) {
    return true
  }
  console.warn(`[${name}] ${field} 属性的值 ${_value} 不是有效的 CSS 值。`)
  return false
}

/**
 * 生成唯一ID。
 * @returns {string} 生成的唯一ID。
 */
export const getUniqueId = () => {
  // 生成一个随机字符串作为UUID的前缀
  const randomString = Math.random().toString(16).substring(2, 8)
  // 使用Lodash的uniqueId()方法生成UUID
  return uniqueId(randomString)
}

/**
 * 根据映射格式化表单数据。
 * @param {any} formMap - 表单映射。
 * @returns {Object} 格式化后的表单数据。
 */
export const formatFormByMap = (formMap: any) => {
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
/**
 * 将嵌套对象转换为以 a.b.c.d 形式表示的扁平对象。
 * @param {Object} form - 嵌套的表单数据。
 * @returns {any} 转换后的扁平对象映射。
 */
export const flattenNestedObject = (form: any) => {
  const formMap: Record<string, any> = {}

  const buildMap = (obj: any, prefix: string = '') => {
    for (const key in obj) {
      const value = obj[key]
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof value === 'object' && value !== null) {
        buildMap(value, newKey)
      } else {
        formMap[newKey] = value
      }
    }
  }

  buildMap(form)
  return formMap
}
/**
 * 获取嵌套对象中指定字段的值。
 * @param {Object} obj - 要查询的对象。
 * @param {string} field - 嵌套字段的字符串表示，使用 '.' 分隔。
 * @returns {any} 返回目标字段的值，如果字段不存在则返回 undefined。
 */
export const retrieveNestedFieldValue = (obj: any, field: string) => {
  if (!field) {
    return undefined
  }
  const keys = field.split('.') // 将字符串的嵌套字段按照 '.' 分割成数组
  let value = obj
  for (const key of keys) {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) {
      value = value[key]
    } else {
      return undefined // 如果找不到字段，返回 undefined
    }
  }
  return value // 返回目标字段的值
}

/**
 * 格式化字节数。
 * @param {number} bytes - 字节数。
 * @param {number} [decimals=2] - 小数位数。
 * @returns {string} 格式化后的字符串。
 */
export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 获取静态资源文件。
 * @param {Object} options - 配置选项。
 * @param {string} options.name - 文件名。
 * @param {string} options.type - 资源类型。
 * @returns {string} 静态资源文件的URL。
 */
export const getAssetsFile = ({
  name,
  type
}: {
  name: string
  type: string
}) => {
  return new URL(`../assets/${type}/${name}`, import.meta.url).href
}

/**
 * 根据文件名获取对应的文件图标。
 * @param {string} [fileName=''] - 文件名。
 * @returns {string} 文件图标的URL。
 */
export const getFileIcon = (fileName: string = '') => {
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

export const getIconInnerHTML = (e: any = {}) => {
  const el: Element = document.createElement('div')
  const icon = createApp({
    render() {
      return h(Icon, { ...e })
    }
  })
  icon.mount(el)
  return el.innerHTML
}

export const checkUrlIsImage = (url: string = ''): boolean => {
  const imageRegex =
    /\.(jpg|jpeg|png|webp|bmp|gif|svg|tiff|ico|heif|jfif|pjpeg|pjp|avif)$/i
  return imageRegex.test(url)
}

export const dragmove = ({
  el,
  parentEl,
  direction = 'both',
  callback,
  max,
  min,
  step = () => 1,
  trackMax,
  trackMin
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
}) => {
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

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true
    startX = e.clientX - el.offsetLeft
    startY = e.clientY - el.offsetTop

    parentRect = parentEl.getBoundingClientRect()
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    let newX = e.clientX - startX
    let newY = e.clientY - startY
    const { clampedMinValue, clampedMaxValue } = getClampedValues()

    if (direction === 'horizontal' || direction === 'both') {
      const trackWidth = parentRect.width
      const minX =
        ((clampedMinValue - trackMin()) / (trackMax() - trackMin())) *
        trackWidth
      const maxX =
        ((clampedMaxValue - trackMin()) / (trackMax() - trackMin())) *
        trackWidth
      newX = Math.max(minX, Math.min(newX, maxX))
      const stepSize = trackWidth / ((trackMax() - trackMin()) / step())
      newX = snapToGrid(newX, stepSize)
      el.style.left = `${newX}px`
    }

    if (direction === 'vertical' || direction === 'both') {
      const trackHeight = parentRect.height
      const minY =
        ((clampedMinValue - trackMin()) / (trackMax() - trackMin())) *
        trackHeight
      const maxY =
        ((clampedMaxValue - trackMin()) / (trackMax() - trackMin())) *
        trackHeight
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
        percentY: Number((newY / parentRect.height).toFixed(2))
      })
    }
  }

  const onMouseUp = () => {
    isDragging = false
    document.body.style.userSelect = 'auto'
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  el.addEventListener('mousedown', onMouseDown)

  return () => {
    el.removeEventListener('mousedown', onMouseDown)
  }
}
/**
 * 将字符串转换为标准的 JSON 格式。
 * 兼容单引号、双引号以及无引号的字段名。
 * @param {string} str - 要转换的字符串。
 * @returns {any} 解析后的 JSON 对象。
 */
export const parseToStandardJSON = (str: string) => {
  const modifiedStr = str
    .replace(/'/g, '"') // 替换单引号为双引号
    .replace(/({|,)\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // 给没有引号的字段名加上双引号
  return JSON.parse(modifiedStr)
}
