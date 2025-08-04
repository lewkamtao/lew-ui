import type {
  LewColor,
  LewDirection,
  LewPlacement,
  LewSize,
  LewStatusColor,
  LewThemeColor,
  LewTrigger,
  LewXAlignment,
  LewYAlignment,
} from '../types'

// ===== 常量定义 =====

const validColors: LewColor[] = [
  'blue',
  'gray',
  'red',
  'green',
  'yellow',
  'indigo',
  'purple',
  'pink',
  'orange',
  'cyan',
  'teal',
  'mint',
  'brown',
  'black',
  'error',
  'success',
  'warning',
  'info',
  'normal',
  'primary',
  'danger',
]

const validThemeColor: LewThemeColor[] = [
  'black',
  'blue',
  'brown',
  'cyan',
  'gray',
  'green',
  'indigo',
  'mint',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
]

const validStatusColors: LewStatusColor[] = [
  'error',
  'success',
  'warning',
  'info',
  'normal',
  'primary',
  'danger',
]

const validSizes: LewSize[] = ['small', 'medium', 'large']

const validDirection: LewDirection[] = ['x', 'y']

const validPopoverTrigger: LewTrigger[] = ['hover', 'click']

const validPopoverPlacement: LewPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
]

const validXAlignments: LewXAlignment[] = ['start', 'center', 'end', 'left', 'right']
const validYAlignments: LewYAlignment[] = ['start', 'center', 'end', 'top', 'bottom']

// ===== 基础类型验证器 =====

/**
 * 创建字符串类型验证器
 */
function createStringValidator(options: {
  componentName: string
  propName: string
  allowEmpty?: boolean
}) {
  const { componentName, propName, allowEmpty = true } = options

  return (value: any): boolean => {
    if (value === undefined || value === null) {
      return true
    }

    if (value === '' && allowEmpty) {
      return true
    }

    if (typeof value !== 'string') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string.`)
      return false
    }

    return true
  }
}

/**
 * 创建数字类型验证器
 */
function createNumberValidator(options: {
  componentName: string
  propName: string
  allowNaN?: boolean
  allowInfinity?: boolean
}) {
  const { componentName, propName, allowNaN = false, allowInfinity = false } = options

  return (value: any): boolean => {
    if (value === undefined || value === null) {
      return true
    }

    if (typeof value !== 'number') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: number.`)
      return false
    }

    if (!allowNaN && Number.isNaN(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: valid number (not NaN).`)
      return false
    }

    if (!allowInfinity && !Number.isFinite(value) && !Number.isNaN(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: finite number.`)
      return false
    }

    return true
  }
}

/**
 * 创建布尔类型验证器
 */
function createBooleanValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: any): boolean => {
    if (value === undefined || value === null) {
      return true
    }

    if (typeof value !== 'boolean') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: boolean.`)
      return false
    }

    return true
  }
}

/**
 * 创建函数类型验证器
 */
function createFunctionValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: any): boolean => {
    if (value === undefined || value === null) {
      return true
    }

    if (typeof value !== 'function') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: function.`)
      return false
    }

    return true
  }
}

/**
 * 创建基础数组类型验证器
 */
function createBasicArrayValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: any): boolean => {
    if (value === undefined || value === null) {
      return true
    }

    if (!Array.isArray(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: array.`)
      return false
    }

    return true
  }
}

/**
 * 创建基础对象类型验证器
 */
function createBasicObjectValidator(options: {
  componentName: string
  propName: string
  allowArray?: boolean
}) {
  const { componentName, propName, allowArray = false } = options

  return (value: any): boolean => {
    if (value === undefined || value === null) {
      return true
    }

    if (typeof value !== 'object') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: object.`)
      return false
    }

    if (!allowArray && Array.isArray(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: object (not array).`)
      return false
    }

    return true
  }
}

// ===== 尺寸和布局相关验证器 =====

/**
 * 验证尺寸值（宽度、高度、边距等）
 * @param value - 要验证的值，可以是数字、字符串或 undefined
 * @param componentName - 组件名称，用于错误信息
 * @param propName - 属性名称，用于错误信息
 * @param allowNegative - 是否允许负值，默认为 false
 * @returns 验证是否通过
 */
function validateSize(
  value: string | number | undefined,
  componentName: string,
  propName: string,
  allowNegative = false,
): boolean {
  // 允许 undefined、null、空字符串
  if (value === undefined || value === null || value === '') {
    return true
  }

  // 数字类型校验
  if (typeof value === 'number') {
    if (!allowNegative && value < 0) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: non-negative number.`)
      return false
    }
    return true
  }

  // 字符串类型校验
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed)
      return true

    // CSS 关键字
    if (['auto', 'inherit', 'initial', 'unset'].includes(trimmed)) {
      return true
    }

    // calc() 表达式
    if (trimmed.startsWith('calc(') && trimmed.endsWith(')')) {
      return true
    }

    // 百分比
    if (trimmed.endsWith('%')) {
      const num = Number.parseFloat(trimmed.slice(0, -1))
      if (!Number.isNaN(num)) {
        if (!allowNegative && num < 0) {
          console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: non-negative percentage.`)
          return false
        }
        return true
      }
    }

    // 带单位的值：px, em, rem, vh, vw 等
    const unitPattern = /^-?(?:\d+(?:\.\d+)?|\.\d+)(px|em|rem|vh|vw|vmin|vmax|%|in|cm|mm|pt|pc|ex|ch)$/
    if (unitPattern.test(trimmed)) {
      const num = Number.parseFloat(trimmed)
      if (!Number.isNaN(num)) {
        if (!allowNegative && num < 0) {
          console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: non-negative value.`)
          return false
        }
        return true
      }
    }

    // 纯数字字符串（视为 px）
    const numberPattern = /^-?(?:\d+(?:\.\d+)?|\.\d+)$/
    if (numberPattern.test(trimmed)) {
      const num = Number.parseFloat(trimmed)
      if (!Number.isNaN(num)) {
        if (!allowNegative && num < 0) {
          console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: non-negative number.`)
          return false
        }
        return true
      }
    }

    // 无效格式
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: number, "auto", percentage (e.g., "50%"), or value with unit (e.g., "10px", "2rem", "100%").`)
    return false
  }

  // 无效类型
  console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string or number.`)
  return false
}

/**
 * 验证偏移量值，必须是包含两个数字的数组
 * @param value - 要验证的偏移量值 [x, y]
 * @param componentName - 组件名称，用于错误信息
 * @param propName - 属性名称，用于错误信息
 * @returns 验证是否通过
 */
function validateOffset(
  value: [number, number] | undefined,
  componentName: string,
  propName: string,
): boolean {
  // 允许 undefined
  if (value === undefined) {
    return true
  }

  // 检查是否为数组
  if (!Array.isArray(value)) {
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: array with exactly 2 numbers.`)
    return false
  }

  // 检查数组长度
  if (value.length !== 2) {
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: array with exactly 2 numbers.`)
    return false
  }

  // 检查每个值是否为数字
  if (!value.every(v => typeof v === 'number')) {
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: all values must be numbers.`)
    return false
  }

  // 检查每个值是否为有效数字
  if (!value.every(v => !Number.isNaN(v) && Number.isFinite(v))) {
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: all values must be valid numbers.`)
    return false
  }

  return true
}

/**
 * 创建偏移量验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 偏移量验证函数
 */
function createOffsetValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: [number, number] | undefined): boolean => {
    return validateOffset(value, componentName, propName)
  }
}

/**
 * 创建尺寸验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @param options.allowNegative - 是否允许负值，默认为 false
 * @returns 尺寸验证函数
 */
function createDimValidator(options: {
  componentName: string
  propName: string
  allowNegative?: boolean
}) {
  const { componentName, propName, allowNegative = false } = options

  return (value: string | number | undefined): boolean => {
    return validateSize(value, componentName, propName, allowNegative)
  }
}

/**
 * 创建颜色验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 颜色验证函数
 */
function createColorValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewColor | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!validColors.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validColors.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建主题颜色验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 主题颜色验证函数
 */
function createThemeColorValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewThemeColor | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!validThemeColor.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validThemeColor.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建状态颜色验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 状态颜色验证函数
 */
function createStatusColorValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewStatusColor | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!validStatusColors.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validStatusColors.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建尺寸规格验证器（small、medium、large 等）
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 尺寸规格验证函数
 */
function createSizeValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewSize | undefined): boolean => {
    if (value === undefined) {
      return true
    }
    // 特殊处理 Button, 允许用 mini
    const _validSizes = componentName === 'LewButton' ? ['mini', ...validSizes] : validSizes

    if (!_validSizes.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validSizes.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建方向验证器（x、y）
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 方向验证函数
 */
function createDirectionValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewDirection | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!validDirection.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validDirection.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建弹出框触发方式验证器（hover、click）
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 弹出框触发方式验证函数
 */
function createTriggerValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewTrigger | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!validPopoverTrigger.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validPopoverTrigger.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建弹出框位置验证器（top、bottom、left、right 及其组合）
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 弹出框位置验证函数
 */
function createPopoverPlacementValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewPlacement | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!validPopoverPlacement.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validPopoverPlacement.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建水平对齐验证器（start、center、end、left、right）
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 水平对齐验证函数
 */
function createXAlignmentValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewXAlignment | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!validXAlignments.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validXAlignments.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建垂直对齐验证器（start、center、end、top、bottom）
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 垂直对齐验证函数
 */
function createYAlignmentValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: LewYAlignment | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!validYAlignments.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${validYAlignments.join(', ')}.`)
      return false
    }

    return true
  }
}

/**
 * 创建 CSS Grid Area 验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns CSS Grid Area 验证函数
 */
function createGirdAreaValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: string | undefined): boolean => {
    if (value === undefined || value === null || value === '') {
      return true
    }

    if (typeof value !== 'string') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string.`)
      return false
    }

    const trimmed = value.trim()
    if (!trimmed) {
      return true
    }

    // CSS Grid Area 值验证
    // 1. 单个标识符 (grid-area 名称)
    const identifierPattern = /^[a-z_][\w-]*$/i
    if (identifierPattern.test(trimmed)) {
      return true
    }

    // 2. auto 关键字
    if (trimmed === 'auto') {
      return true
    }

    // 3. span 语法
    const spanPattern = /^span\s+(?:\d+|[a-z_][\w-]*)$/i
    if (spanPattern.test(trimmed)) {
      return true
    }

    // 4. 数字值
    const numberPattern = /^\d+$/
    if (numberPattern.test(trimmed)) {
      return true
    }

    // 5. 组合值：grid-row-start / grid-column-start / grid-row-end / grid-column-end
    // 支持的格式示例：1 / 2 / 3 / 4, span 2 / 3 / auto / span header
    const parts = trimmed.split('/').map(part => part.trim())
    if (parts.length >= 2 && parts.length <= 4) {
      const isValidPart = (part: string): boolean => {
        if (part === 'auto')
          return true
        if (numberPattern.test(part))
          return true
        if (identifierPattern.test(part))
          return true
        if (spanPattern.test(part))
          return true
        return false
      }

      if (parts.every(isValidPart)) {
        return true
      }
    }

    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: valid CSS grid-area value (identifier, auto, span <number/identifier>, number, or combination with "/").`)
    return false
  }
}

// 前端领域常用的校验器

/**
 * 创建URL验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @param options.allowEmpty - 是否允许空字符串，默认为 true
 * @returns URL验证函数
 */
function createUrlValidator(options: {
  componentName: string
  propName: string
  allowEmpty?: boolean
}) {
  const { componentName, propName, allowEmpty = true } = options

  return (value: string | undefined): boolean => {
    if (value === undefined || (value === '' && allowEmpty)) {
      return true
    }

    try {
      const url = new URL(value)
      // 检查URL是否有效
      if (url.href) {
        return true
      }
    }
    catch {
      // URL 构造失败
    }
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: valid URL.`)
    return false
  }
}

/**
 * 创建邮箱验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 邮箱验证函数
 */
function createEmailValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: string | undefined): boolean => {
    if (value === undefined || value === '') {
      return true
    }

    const emailRegex = /^[\w.!#$%&'*+/=?^`{|}~-]+@\w(?:[\w-]{0,61}\w)?(?:\.\w(?:[\w-]{0,61}\w)?)*$/
    if (!emailRegex.test(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: valid email address.`)
      return false
    }

    return true
  }
}

/**
 * 创建数值范围验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @param options.min - 最小值，可选
 * @param options.max - 最大值，可选
 * @returns 数值范围验证函数
 */
function createRangeValidator(options: {
  componentName: string
  propName: string
  min?: number
  max?: number
}) {
  const { componentName, propName, min, max } = options

  return (value: number | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (typeof value !== 'number' || Number.isNaN(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: valid number.`)
      return false
    }

    if (min !== undefined && value < min) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: number ≥ ${min}.`)
      return false
    }

    if (max !== undefined && value > max) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: number ≤ ${max}.`)
      return false
    }

    return true
  }
}

/**
 * 创建字符串长度验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @param options.minLength - 最小长度，可选
 * @param options.maxLength - 最大长度，可选
 * @returns 字符串长度验证函数
 */
function createStringLengthValidator(options: {
  componentName: string
  propName: string
  minLength?: number
  maxLength?: number
}) {
  const { componentName, propName, minLength, maxLength } = options

  return (value: string | undefined): boolean => {
    if (value === undefined || value === '') {
      return true
    }

    if (typeof value !== 'string') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string.`)
      return false
    }

    if (minLength !== undefined && value.length < minLength) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string length ≥ ${minLength}.`)
      return false
    }

    if (maxLength !== undefined && value.length > maxLength) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string length ≤ ${maxLength}.`)
      return false
    }

    return true
  }
}

/**
 * 创建数组验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @param options.minLength - 数组最小长度，可选
 * @param options.maxLength - 数组最大长度，可选
 * @param options.itemValidator - 数组项验证函数，可选
 * @returns 数组验证函数
 */
function createArrayValidator(options: {
  componentName: string
  propName: string
  minLength?: number
  maxLength?: number
  itemValidator?: (item: any, index: number) => boolean
}) {
  const { componentName, propName, minLength, maxLength, itemValidator } = options

  return (value: any[] | undefined): boolean => {
    if (value === undefined) {
      return true
    }

    if (!Array.isArray(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: array.`)
      return false
    }

    if (minLength !== undefined && value.length < minLength) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: array length ≥ ${minLength}.`)
      return false
    }

    if (maxLength !== undefined && value.length > maxLength) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: array length ≤ ${maxLength}.`)
      return false
    }

    if (itemValidator) {
      for (let i = 0; i < value.length; i++) {
        if (!itemValidator(value[i], i)) {
          console.warn(`[${componentName}] Invalid ${propName}[${i}]: "${value[i]}". Expected: valid item.`)
          return false
        }
      }
    }

    return true
  }
}

/**
 * 创建正则表达式验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @param options.pattern - 正则表达式模式
 * @param options.description - 错误信息描述
 * @returns 正则表达式验证函数
 */
function createRegexValidator(options: {
  componentName: string
  propName: string
  pattern: RegExp
  description: string
}) {
  const { componentName, propName, pattern, description } = options

  return (value: string | undefined): boolean => {
    if (value === undefined || value === '') {
      return true
    }

    if (typeof value !== 'string') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string.`)
      return false
    }

    if (!pattern.test(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: ${description}.`)
      return false
    }

    return true
  }
}

/**
 * 创建CSS值验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @param options.allowedValues - 允许的预定义值，可选
 * @param options.allowCssUnits - 是否允许CSS单位，默认为 true
 * @returns CSS值验证函数
 */
function createCssValueValidator(options: {
  componentName: string
  propName: string
  allowedValues?: string[]
  allowCssUnits?: boolean
}) {
  const { componentName, propName, allowedValues = [], allowCssUnits = true } = options

  return (value: string | undefined): boolean => {
    if (value === undefined || value === '') {
      return true
    }

    if (typeof value !== 'string') {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string.`)
      return false
    }

    const trimmed = value.trim()

    // 检查预定义值
    if (allowedValues.length > 0 && allowedValues.includes(trimmed)) {
      return true
    }

    // CSS关键字
    const cssKeywords = ['auto', 'inherit', 'initial', 'unset', 'revert', 'revert-layer']
    if (cssKeywords.includes(trimmed)) {
      return true
    }

    if (allowCssUnits) {
      // calc() 表达式
      if (trimmed.startsWith('calc(') || trimmed.startsWith('clamp(') || trimmed.startsWith('min(') || trimmed.startsWith('max(')) {
        return true
      }

      // CSS 单位值
      const cssUnitPattern = /^-?(?:\d+(?:\.\d+)?|\.\d+)(px|em|rem|vh|vw|vmin|vmax|%|in|cm|mm|pt|pc|ex|ch|fr|deg|rad|turn|s|ms)$/
      if (cssUnitPattern.test(trimmed)) {
        return true
      }

      // 纯数字（视为px）
      const numberPattern = /^-?(?:\d+(?:\.\d+)?|\.\d+)$/
      if (numberPattern.test(trimmed)) {
        return true
      }
    }

    const expectedDescription = allowedValues.length > 0
      ? `one of ${allowedValues.join(', ')}${allowCssUnits ? ' or valid CSS value' : ''}`
      : 'valid CSS value'

    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: ${expectedDescription}.`)
    return false
  }
}

/**
 * 创建对象验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @returns 对象验证函数
 */
function createObjectValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: unknown): boolean => {
    if (value === undefined) {
      return true
    }
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      console.warn(
        `[${componentName}] Invalid ${propName}: "${value}". Expected: object.`,
      )
      return false
    }
    // 这里只做类型校验，schema 校验可扩展
    return true
  }
}

// 通用的枚举
/**
 * 创建枚举验证器
 * @param options - 验证器配置选项
 * @param options.componentName - 组件名称
 * @param options.propName - 属性名称
 * @param options.enumValues - 枚举值数组
 * @param options.allowEmpty - 是否允许空值，默认为 true
 * @returns 枚举验证函数
 */
function createEnumValidator(options: {
  componentName: string
  propName: string
  enumValues: any[] // 重命名 enum 参数以避免与关键字冲突
  allowEmpty?: boolean
}) {
  const { componentName, propName, enumValues, allowEmpty = true } = options

  return (value: any): boolean => {
    if (value === undefined || value === null || (value === '' && allowEmpty)) {
      return true
    }

    if (!enumValues.includes(value)) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: one of ${enumValues.join(', ')}.`)
      return false
    }

    return true
  }
}

export default {
  // ===== 基础类型验证器 =====
  string: ({ componentName, propName, allowEmpty = true }: { componentName: string, propName: string, allowEmpty?: boolean }) =>
    createStringValidator({ componentName, propName, allowEmpty }),

  number: ({ componentName, propName, allowNaN = false, allowInfinity = false }: { componentName: string, propName: string, allowNaN?: boolean, allowInfinity?: boolean }) =>
    createNumberValidator({ componentName, propName, allowNaN, allowInfinity }),

  boolean: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createBooleanValidator({ componentName, propName }),

  function: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createFunctionValidator({ componentName, propName }),

  basicArray: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createBasicArrayValidator({ componentName, propName }),

  basicObject: ({ componentName, propName, allowArray = false }: { componentName: string, propName: string, allowArray?: boolean }) =>
    createBasicObjectValidator({ componentName, propName, allowArray }),

  // ===== 常用数值和字符串验证器 =====
  range: ({ componentName, propName, min, max }: { componentName: string, propName: string, min?: number, max?: number }) =>
    createRangeValidator({ componentName, propName, min, max }),

  stringLength: ({ componentName, propName, minLength, maxLength }: { componentName: string, propName: string, minLength?: number, maxLength?: number }) =>
    createStringLengthValidator({ componentName, propName, minLength, maxLength }),

  nonNegativeInteger: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createRangeValidator({ componentName, propName, min: 0 }),

  positiveInteger: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createRangeValidator({ componentName, propName, min: 1 }),

  // ===== 前端通用验证器 =====
  url: ({ componentName, propName, allowEmpty = true }: { componentName: string, propName: string, allowEmpty?: boolean }) =>
    createUrlValidator({ componentName, propName, allowEmpty }),

  email: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createEmailValidator({ componentName, propName }),

  array: ({ componentName, propName, minLength, maxLength, itemValidator }: { componentName: string, propName: string, minLength?: number, maxLength?: number, itemValidator?: (item: any, index: number) => boolean }) =>
    createArrayValidator({ componentName, propName, minLength, maxLength, itemValidator }),

  object: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createObjectValidator({ componentName, propName }),

  // ===== 格式验证器 =====
  regex: ({ componentName, propName, pattern, description }: { componentName: string, propName: string, pattern: RegExp, description: string }) =>
    createRegexValidator({ componentName, propName, pattern, description }),

  timeFormat: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createRegexValidator({
      componentName,
      propName,
      pattern: /^([01]?\d|2[0-3]):[0-5]\d$/,
      description: 'valid time format (HH:MM)',
    }),

  dateFormat: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createRegexValidator({
      componentName,
      propName,
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      description: 'valid date format (YYYY-MM-DD)',
    }),

  // ===== 组件专用验证器 =====
  // 尺寸和布局
  widthHeight: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createDimValidator({ componentName, propName, allowNegative: false }),

  fontSize: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createDimValidator({ componentName, propName, allowNegative: false }),

  gap: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createDimValidator({ componentName, propName, allowNegative: true }),

  spacing: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createDimValidator({ componentName, propName, allowNegative: true }),

  girdArea: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createGirdAreaValidator({ componentName, propName }),

  leftRightTopBottom: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createDimValidator({ componentName, propName, allowNegative: true }),

  offset: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createOffsetValidator({ componentName, propName }),

  // 颜色相关
  color: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createColorValidator({ componentName, propName }),

  themeColor: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createThemeColorValidator({ componentName, propName }),

  statusColor: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createStatusColorValidator({ componentName, propName }),

  colorValue: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createRegexValidator({
      componentName,
      propName,
      pattern: /^(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)|hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\))$/,
      description: 'valid color value (hex, rgb, rgba, hsl, hsla)',
    }),

  // 枚举类型
  fontWeight: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createEnumValidator({ componentName, propName, enumValues: [100, 200, 300, 400, 500, 600, 700, 800, 900] }),

  enum: ({ componentName, propName, values }: { componentName: string, propName: string, values: any[] }) =>
    createEnumValidator({ componentName, propName, enumValues: values }),

  size: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createSizeValidator({ componentName, propName }),

  direction: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createDirectionValidator({ componentName, propName }),

  trigger: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createTriggerValidator({ componentName, propName }),

  popoverPlacement: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createPopoverPlacementValidator({ componentName, propName }),

  xAlignment: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createXAlignmentValidator({ componentName, propName }),

  yAlignment: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createYAlignmentValidator({ componentName, propName }),

  // ===== CSS 和样式验证器 =====
  cssValue: ({ componentName, propName, allowedValues = [], allowCssUnits = true }: { componentName: string, propName: string, allowedValues?: string[], allowCssUnits?: boolean }) =>
    createCssValueValidator({ componentName, propName, allowedValues, allowCssUnits }),

}
