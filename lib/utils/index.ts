import { uniqueId } from 'lodash-es'


/**
 * 获取图标类型用于提示框。
 * @param {string | undefined} type - 提示框中显示的消息类型。
 * @returns {string} 对应的图标类型。
 */
export const getIconType = (type: string | undefined): string => {
  const map = {
    normal: Info,
    warning: TriangleAlert,
    success: CircleCheck,
    error: CircleAlert,
    info: BellRing
  }
  // @ts-ignore
  return map[type]
}

/**
 * 获取颜色类型。
 * @param {string | undefined} type - 消息类型。
 * @returns {string} 对应的颜色类型。
 */
export const getColorType = (type: string | undefined): string => {
  const typeMap = {
    normal: 'gray',
    warning: 'orange',
    success: 'green',
    error: 'red',
    danger: 'red',
    info: 'blue',
    primary: 'blue'
  }
  // @ts-ignore
  return typeMap[type] || type
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
 * 设置表单值。
 * @param {Object} options - 配置选项。
 * @param {any} options.formRef - 表单引用。
 * @param {any} options.params - 要设置的参数。
 */
export const lewSetForm = ({
  formRef,
  params
}: {
  formRef: any // 传入formRef.value
  params: any // 需要设置的参数
}) => {
  let timeout = 0
  const _fn = () => {
    timeout += 10
    if (formRef && formRef.value) {
      formRef.value.setForm(params)
    } else {
      setTimeout(() => {
        _fn()
      }, timeout)
    }
  }
  _fn()
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
 * 获取状态图标的SVG字符串。
 * @param {string} type - 状态类型。
 * @returns {string} 对应的SVG字符串。
 */
export const getStatusIcon = (type: string) => {
  const svgArr: any = {
    success:
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z" fill="currentColor"/></svg>',
    warning:
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z" fill="currentColor"/></svg>',
    error:
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z" fill="currentColor"/></svg>',
    normal:
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm17.2 109.6l-3.1 115.1c-.2 8.2-5.9 14.8-14.1 14.8s-13.9-6.6-14.1-14.8l-3.1-115.1c-.2-9.6 7.5-17.6 17.2-17.6 9.6 0 17.4 7.9 17.2 17.6zM256 354c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4c10.7 0 19.1 8.1 19.1 18.4S266.7 354 256 354z" fill="currentColor"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M255.9 456c31.1 0 48.1-22 48.1-53h-96.3c0 31 17 53 48.2 53z" fill="currentColor"/><path d="M412 352.2c-15.4-20.3-45.7-32.2-45.7-123.1 0-93.3-41.2-130.8-79.6-139.8-3.6-.9-6.2-2.1-6.2-5.9v-2.9c0-13.4-11-24.7-24.4-24.6-13.4-.2-24.4 11.2-24.4 24.6v2.9c0 3.7-2.6 5-6.2 5.9-38.5 9.1-79.6 46.5-79.6 139.8 0 90.9-30.3 102.7-45.7 123.1-9.9 13.1-.5 31.8 15.9 31.8h280.1c16.3 0 25.7-18.8 15.8-31.8z" fill="currentColor"/></svg>',
    loading:
      '<svg xmlns="http://www.w3.org/2000/svg" class="vue-feather--spin vue-feather--fast" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader vue-feather__content"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
    close:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x vue-feather__content"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  }
  return svgArr[type]
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
