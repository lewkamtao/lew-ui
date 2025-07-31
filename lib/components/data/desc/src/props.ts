import type { Property } from 'csstype'
import type { LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { validSizes } from 'lew-ui/constants'

export type DescDirection = 'x' | 'y'

export interface DescOptions {
  label: string
  field: string
  gridArea?: string
  direction?: DescDirection
  customRender?: (params: { field: string, label: string, dataSource: Record<string, any> }) => any
  size?: LewSize
  width?: number | string
  labelWidth?: number | string
  tips?: string
  type?: 'text-trim'
  labelX?: Property.TextAlign
  valueX?: Property.TextAlign
}

export const descProps = {
  options: {
    type: Array as PropType<DescOptions[]>,
    required: true,
    validator(value: DescOptions[]): boolean {
      if (!Array.isArray(value)) {
        console.warn(`[LewDesc] Invalid options: "${typeof value}". Expected: array.`)
        return false
      }
      return true
    },
  },
  dataSource: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(`[LewDesc] Invalid size: "${value}". Expected: ${validSizes.join(', ')}.`)
        return false
      }
      return true
    },
  },
  labelX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
  },
  valueX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
  },
  gap: {
    type: [String, Number] as PropType<string | number>,
    default: 30,
    validator(value: string | number): boolean {
      const numValue = typeof value === 'string' ? Number.parseInt(value, 10) : value
      if (Number.isNaN(numValue) || numValue < 0) {
        console.warn(`[LewDesc] Invalid gap: "${value}". Expected: non-negative number or convertible string.`)
        return false
      }
      return true
    },
  },
  width: {
    type: [Number, String] as PropType<Property.Width | number>,
    validator(value: Property.Width | number): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn(`[LewDesc] Invalid width: "${value}". Expected: non-negative number.`)
        return false
      }
      if (value && typeof value === 'string' && !/^\d+(%|px|rem|em|vw|vh)?$/.test(value)) {
        console.warn(`[LewDesc] Invalid width: "${value}". Expected: valid CSS width value (e.g., "100px", "50%", "2rem").`)
        return false
      }
      return true
    },
  },
  columns: {
    type: [Number, String] as PropType<number | string>,
    default: 1,
    validator(value: number | string): boolean {
      const numValue = Number(value)
      if (Number.isNaN(numValue) || numValue < 1 || !Number.isInteger(numValue)) {
        console.warn(`[LewDesc] Invalid columns: "${value}". Expected: integer greater than or equal to 1.`)
        return false
      }
      return true
    },
  },
  labelWidth: {
    type: [Number, String] as PropType<Property.Width | number>,
    default: 'auto',
    validator(value: Property.Width | number): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn(`[LewDesc] Invalid labelWidth: "${value}". Expected: non-negative number.`)
        return false
      }
      if (
        typeof value === 'string'
        && value !== 'auto'
        && !/^\d+(px|rem|em|%)?$/.test(value)
      ) {
        console.warn(`[LewDesc] Invalid labelWidth: "${value}". Expected: "auto" or valid CSS width value (e.g., "100px", "50%", "2rem").`)
        return false
      }
      return true
    },
  },
  direction: {
    type: String as PropType<DescDirection>,
    default: 'x',
    validator(value: DescDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(`[LewDesc] Invalid direction: "${value}". Expected: "x" or "y".`)
        return false
      }
      return true
    },
  },
  id: {
    type: String,
    hidden: true,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
}

export const descItemProps = {
  label: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(`[LewDescItem] Invalid size: "${value}". Expected: ${validSizes.join(', ')}.`)
        return false
      }
      return true
    },
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String] as PropType<Property.Width | number>,
    validator(value: Property.Width | number): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn(`[LewDescItem] Invalid width: "${value}". Expected: non-negative number.`)
        return false
      }
      if (value && typeof value === 'string' && !/^\d+(%|px|rem|em|vw|vh)?$/.test(value)) {
        console.warn(`[LewDescItem] Invalid width: "${value}". Expected: valid CSS width value (e.g., "100px", "50%", "2rem").`)
        return false
      }
      return true
    },
  },
  labelWidth: {
    type: [Number, String] as PropType<Property.Width | number>,
    default: 'auto',
    validator(value: Property.Width | number): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn(`[LewDescItem] Invalid labelWidth: "${value}". Expected: non-negative number.`)
        return false
      }
      if (
        typeof value === 'string'
        && value !== 'auto'
        && !/^\d+(px|rem|em|%)?$/.test(value)
      ) {
        console.warn(`[LewDescItem] Invalid labelWidth: "${value}". Expected: "auto" or valid CSS width value (e.g., "100px", "50%", "2rem").`)
        return false
      }
      return true
    },
  },
  direction: {
    type: String as PropType<DescDirection>,
    default: 'x',
    validator(value: DescDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(`[LewDescItem] Invalid direction: "${value}". Expected: "x" or "y".`)
        return false
      }
      return true
    },
  },
  tips: {
    type: String,
  },
  type: {
    type: String as PropType<'text-trim'>,
  },
  labelX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
  },
  valueX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
  },
  gridArea: {
    type: String,
  },
  customRender: {
    type: Function as PropType<(params: { field: string, label: string, dataSource: Record<string, any> }) => any>,
  },
  id: {
    type: String,
    hidden: true,
  },
  dataSource: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
    hidden: true,
  },
}

export const lewDescSizePaddingMap: Record<LewSize, number> = {
  small: 14,
  medium: 20,
  large: 26,
}

export type DescProps = ExtractPropTypes<typeof descProps>
export type DescItemProps = ExtractPropTypes<typeof descItemProps>
