export * from './typeValues'

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

function validateSize(
  value: string | number | undefined,
  componentName: string,
  propName: string,
  allowNegative = false,
): boolean {
  if (value === undefined || value === null || value === '') {
    return true
  }

  if (typeof value === 'number') {
    if (!allowNegative && value < 0) {
      console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: non-negative number.`)
      return false
    }
    return true
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed)
      return true

    if (['auto', 'inherit', 'initial', 'unset'].includes(trimmed)) {
      return true
    }

    if (trimmed.startsWith('calc(') && trimmed.endsWith(')')) {
      return true
    }

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

    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: number, "auto", percentage (e.g., "50%"), or value with unit (e.g., "10px", "2rem", "100%").`)
    return false
  }

  console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: string or number.`)
  return false
}

function validateOffset(
  value: [number, number] | undefined,
  componentName: string,
  propName: string,
): boolean {
  if (value === undefined) {
    return true
  }

  if (!Array.isArray(value)) {
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: array with exactly 2 numbers.`)
    return false
  }

  if (value.length !== 2) {
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: array with exactly 2 numbers.`)
    return false
  }

  if (!value.every(v => typeof v === 'number')) {
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: all values must be numbers.`)
    return false
  }

  if (!value.every(v => !Number.isNaN(v) && Number.isFinite(v))) {
    console.warn(`[${componentName}] Invalid ${propName}: "${value}". Expected: all values must be valid numbers.`)
    return false
  }

  return true
}

function createOffsetValidator(options: {
  componentName: string
  propName: string
}) {
  const { componentName, propName } = options

  return (value: [number, number] | undefined): boolean => {
    return validateOffset(value, componentName, propName)
  }
}

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

    const identifierPattern = /^[a-z_][\w-]*$/i
    if (identifierPattern.test(trimmed)) {
      return true
    }

    if (trimmed === 'auto') {
      return true
    }

    const spanPattern = /^span\s+(?:\d+|[a-z_][\w-]*)$/i
    if (spanPattern.test(trimmed)) {
      return true
    }

    const numberPattern = /^\d+$/
    if (numberPattern.test(trimmed)) {
      return true
    }

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
    return true
  }
}

function createEnumValidator(options: {
  componentName: string
  propName: string
  enumValues: any[]
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
  string: ({ componentName, propName, allowEmpty = true }: { componentName: string, propName: string, allowEmpty?: boolean }) =>
    createStringValidator({ componentName, propName, allowEmpty }),

  number: ({ componentName, propName, allowNaN = false, allowInfinity = false }: { componentName: string, propName: string, allowNaN?: boolean, allowInfinity?: boolean }) =>
    createNumberValidator({ componentName, propName, allowNaN, allowInfinity }),

  boolean: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createBooleanValidator({ componentName, propName }),

  function: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createFunctionValidator({ componentName, propName }),

  range: ({ componentName, propName, min, max }: { componentName: string, propName: string, min?: number, max?: number }) =>
    createRangeValidator({ componentName, propName, min, max }),

  stringLength: ({ componentName, propName, minLength, maxLength }: { componentName: string, propName: string, minLength?: number, maxLength?: number }) =>
    createStringLengthValidator({ componentName, propName, minLength, maxLength }),

  nonNegativeInteger: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createRangeValidator({ componentName, propName, min: 0 }),

  positiveInteger: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createRangeValidator({ componentName, propName, min: 1 }),

  array: ({ componentName, propName, minLength, maxLength, itemValidator }: { componentName: string, propName: string, minLength?: number, maxLength?: number, itemValidator?: (item: any, index: number) => boolean }) =>
    createArrayValidator({ componentName, propName, minLength, maxLength, itemValidator }),

  object: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createObjectValidator({ componentName, propName }),

  regex: ({ componentName, propName, pattern, description }: { componentName: string, propName: string, pattern: RegExp, description: string }) =>
    createRegexValidator({ componentName, propName, pattern, description }),

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

  fontWeight: ({ componentName, propName }: { componentName: string, propName: string }) =>
    createEnumValidator({ componentName, propName, enumValues: [100, 200, 300, 400, 500, 600, 700, 800, 900] }),

  enum: ({ componentName, propName, values }: { componentName: string, propName: string, values: any[] }) =>
    createEnumValidator({ componentName, propName, enumValues: values }),

}
