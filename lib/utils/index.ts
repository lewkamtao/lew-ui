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
  callback
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
}) => {
  let isDragging = false
  let startX: number, startY: number
  let elRect: DOMRect, parentRect: DOMRect
  let elWidth = el.offsetWidth
  let elHeight = el.offsetHeight

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true
    startX = e.clientX - el.offsetLeft
    startY = e.clientY - el.offsetTop
    elRect = el.getBoundingClientRect()
    parentRect = parentEl.getBoundingClientRect()
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    let newX = e.clientX - startX
    let newY = e.clientY - startY

    if (direction === 'horizontal' || direction === 'both') {
      newX = Math.max(
        0,
        Math.min(newX, parentRect.width + elWidth - elRect.width)
      )
      el.style.left =
        newX > parentRect.width - elWidth
          ? `${parentRect.width - elWidth}px`
          : `${newX}px`
    }

    if (direction === 'vertical' || direction === 'both') {
      newY = Math.max(
        0,
        Math.min(newY, parentRect.height + elHeight - elRect.height)
      )
      el.style.top =
        newY > parentRect.height - elHeight
          ? `${parentRect.height - elHeight}px`
          : `${newY}px`
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
  }

  el.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
  // 解决有些时候,在鼠标松开的时候,元素仍然可以拖动;
  document.ondragstart = function (ev) {
    ev.preventDefault()
  }
  document.ondragend = function (ev) {
    ev.preventDefault()
  }

  return () => {
    el.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
}
