import type { Property } from 'csstype'
import type { LewSize, TextTrimAlignment } from 'lew-ui'
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
  labelX?: TextTrimAlignment
  valueX?: TextTrimAlignment
}

export const descProps = {
  options: {
    type: Array as PropType<DescOptions[]>,
    required: true,
    validator(value: DescOptions[]): boolean {
      if (!Array.isArray(value)) {
        console.warn('[LewDesc] options must be an array')
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
        console.warn(`[LewDesc] Invalid size value: ${value}. Please use 'small', 'medium' or 'large'`)
        return false
      }
      return true
    },
  },
  labelX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
  },
  valueX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
  },
  gap: {
    type: [String, Number] as PropType<string | number>,
    default: 30,
    validator(value: string | number): boolean {
      const numValue = typeof value === 'string' ? Number.parseInt(value, 10) : value
      if (Number.isNaN(numValue) || numValue < 0) {
        console.warn('[LewDesc] gap must be a non-negative number or convertible string')
        return false
      }
      return true
    },
  },
  width: {
    type: [Number, String] as PropType<Property.Width | number>,
    validator(value: Property.Width | number): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewDesc] width cannot be negative')
        return false
      }
      if (value && typeof value === 'string' && !/^\d+(%|px|rem|em|vw|vh)?$/.test(value)) {
        console.warn('[LewDesc] width string must be a valid CSS width value')
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
        console.warn('[LewDesc] columns must be an integer greater than or equal to 1')
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
        console.warn('[LewDesc] labelWidth cannot be negative')
        return false
      }
      if (
        typeof value === 'string'
        && value !== 'auto'
        && !/^\d+(px|rem|em|%)?$/.test(value)
      ) {
        console.warn('[LewDesc] labelWidth string must be "auto" or a valid CSS width value')
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
        console.warn(`[LewDesc] Invalid direction value: ${value}. Please use 'x' or 'y'`)
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
        console.warn(`[LewDescItem] Invalid size value: ${value}. Please use 'small', 'medium' or 'large'`)
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
        console.warn('[LewDescItem] width cannot be negative')
        return false
      }
      if (value && typeof value === 'string' && !/^\d+(%|px|rem|em|vw|vh)?$/.test(value)) {
        console.warn('[LewDescItem] width string must be a valid CSS width value')
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
        console.warn('[LewDescItem] labelWidth cannot be negative')
        return false
      }
      if (
        typeof value === 'string'
        && value !== 'auto'
        && !/^\d+(px|rem|em|%)?$/.test(value)
      ) {
        console.warn('[LewDescItem] labelWidth string must be "auto" or a valid CSS width value')
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
        console.warn(`[LewDescItem] Invalid direction value: ${value}. Please use 'x' or 'y'`)
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
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
  },
  valueX: {
    type: String as PropType<TextTrimAlignment>,
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
