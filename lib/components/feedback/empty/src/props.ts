import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'

// Type definitions
export type EmptyType
  = | '404'
    | 'address'
    | 'article'
    | 'goods'
    | 'likes'
    | 'car'
    | 'comment'
    | 'network'
    | 'order'
    | 'search'

// Props definitions
export const emptyProps = {
  type: {
    type: String as PropType<EmptyType>,
    default: 'search',
    validator(value: EmptyType): boolean {
      const validTypes: EmptyType[] = [
        '404',
        'address',
        'article',
        'goods',
        'likes',
        'car',
        'comment',
        'network',
        'order',
        'search',
      ]
      if (!validTypes.includes(value)) {
        console.warn(`[LewEmpty] Invalid type: "${value}". Expected: ${validTypes.join(', ')}.`)
        return false
      }
      return true
    },
  },
  title: {
    type: String,
    default: '暂无数据',
  },
  width: {
    type: [String, Number] as PropType<Property.Width | number>,
    default: '200px',
    validator(value: Property.Width | number): boolean {
      if (typeof value === 'number') {
        if (value <= 0) {
          console.warn(`[LewEmpty] Invalid width: "${value}". Expected: positive number.`)
          return false
        }
        return true
      }

      if (typeof value === 'string') {
        const autoRegex = /^auto$/i
        const calcRegex = /^calc\((.+)\)$/
        const percentRegex = /^-?\d+(\.\d+)?%$/
        const pixelRegex = /^-?\d+(\.\d+)?(px|rem|em|vw|vh)?$/

        if (
          autoRegex.test(value)
          || calcRegex.test(value)
          || percentRegex.test(value)
          || pixelRegex.test(value)
        ) {
          return true
        }

        console.warn(`[LewEmpty] Invalid width: "${value}". Expected: valid CSS width value (e.g., "200px", "50%", "auto", "calc(100% - 20px)").`)
        return false
      }

      console.warn(`[LewEmpty] Invalid width: "${value}". Expected: number or string.`)
      return false
    },
  },
  height: {
    type: [String, Number] as PropType<Property.Height | number>,
    default: 'auto',
    validator(value: Property.Height | number): boolean {
      if (typeof value === 'number') {
        if (value <= 0) {
          console.warn(`[LewEmpty] Invalid height: "${value}". Expected: positive number.`)
          return false
        }
        return true
      }

      if (typeof value === 'string') {
        const autoRegex = /^auto$/i
        const calcRegex = /^calc\((.+)\)$/
        const percentRegex = /^-?\d+(\.\d+)?%$/
        const pixelRegex = /^-?\d+(\.\d+)?(px|rem|em|vh|vw)?$/

        if (
          autoRegex.test(value)
          || calcRegex.test(value)
          || percentRegex.test(value)
          || pixelRegex.test(value)
        ) {
          return true
        }

        console.warn(`[LewEmpty] Invalid height: "${value}". Expected: valid CSS height value (e.g., "200px", "50%", "auto", "calc(100% - 20px)").`)
        return false
      }

      console.warn(`[LewEmpty] Invalid height: "${value}". Expected: number or string.`)
      return false
    },
  },
  fontSize: {
    type: [String, Number] as PropType<Property.FontSize | number>,
    default: '14px',
    validator(value: Property.FontSize | number): boolean {
      if (typeof value === 'number') {
        if (value <= 0) {
          console.warn(`[LewEmpty] Invalid fontSize: "${value}". Expected: positive number.`)
          return false
        }
        return true
      }

      if (typeof value === 'string') {
        const pixelRegex = /^-?\d+(\.\d+)?(px|rem|em|%)?$/
        const keywordRegex = /^(xx-small|x-small|small|medium|large|x-large|xx-large|smaller|larger|inherit|initial|unset)$/i

        if (pixelRegex.test(value) || keywordRegex.test(value)) {
          return true
        }

        console.warn(`[LewEmpty] Invalid fontSize: "${value}". Expected: valid CSS font-size value (e.g., "14px", "1rem", "medium").`)
        return false
      }

      console.warn(`[LewEmpty] Invalid fontSize: "${value}". Expected: number or string.`)
      return false
    },
  },
  padding: {
    type: [String, Number] as PropType<Property.Padding | number>,
    default: '20px',
    validator(value: Property.Padding | number): boolean {
      if (typeof value === 'number') {
        if (value < 0) {
          console.warn(`[LewEmpty] Invalid padding: "${value}". Expected: non-negative number.`)
          return false
        }
        return true
      }

      if (typeof value === 'string') {
        const paddingRegex = /^(\d+(\.\d+)?(px|rem|em|%)?(\s+\d+(\.\d+)?(px|rem|em|%)?){0,3})$/

        if (paddingRegex.test(value.trim())) {
          return true
        }

        console.warn(`[LewEmpty] Invalid padding: "${value}". Expected: valid CSS padding value (e.g., "20px", "10px 20px", "5px 10px 15px 20px").`)
        return false
      }

      console.warn(`[LewEmpty] Invalid padding: "${value}". Expected: number or string.`)
      return false
    },
  },
}

// Extract prop types
export type EmptyProps = ExtractPropTypes<typeof emptyProps>
