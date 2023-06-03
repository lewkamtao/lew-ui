// Returns the icon type to be used in a tooltip.

// delete ts ignore
const iconMap = {
  normal: 'info',
  warning: 'alert-triangle',
  success: 'check',
  error: 'alert-circle',
  info: 'bell',
}
// type: The type of message to display in the tooltip.
export function getIconType(type: keyof typeof iconMap): string {
  return iconMap[type] || 'info'
}

export function object2class(prefix: string, props: Object) {
  let className = ''
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'boolean' && value)
      className += ` ${prefix}-${key}`
    else if (typeof value === 'string')
      className += ` ${prefix}-${key}-${value}`
  }
  return className
}

export function numFormat(num: number) {
  const str = num.toString().split('.')
  let integerPart = str[0]
  const decimalPart = str[1] ? `.${str[1]}` : ''
  const reg = /(\d+)(\d{3})/
  while (reg.test(integerPart))
    integerPart = integerPart.replace(reg, '$1' + ',' + '$2')

  return integerPart + decimalPart
}

export function any2px(value: number | string | undefined): string {
  if (!value)
    return ''

  const autoRegex = /^auto$/i
  const calcRegex = /^calc\((.+)\)$/
  const percentRegex = /^-?\d+(\.\d+)?%$/
  const pixelRegex = /^-?\d+(\.\d+)?(px)?$/
  const numericRegex = /^-?\d+(\.\d+)?$/

  const _value = String(value)

  if (numericRegex.test(_value))
    return `${value}px`

  if (autoRegex.test(_value))
    return _value

  if (percentRegex.test(_value))
    return _value

  if (calcRegex.test(_value))
    return _value

  if (pixelRegex.test(_value))
    return `${_value}`

  const numValue = Number.parseFloat(_value)
  if (!Number.isNaN(numValue))
    return `${numValue}px`

  return ''
}

/** @func 生成uid */
let uid = 1
export function genUid(): number {
  return Date.now() + uid++
}
