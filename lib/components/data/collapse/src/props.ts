import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'

// Model definitions (使用 type 定义联合类型场景)
export const collapseModel = {
  modelValue: {
    type: [Array, String, Number] as PropType<string[] | string | number | null>,
  },
}

export const collapseItemModel = {
  modelValue: {
    type: Boolean,
    default: false,
  },
}

// Type definitions
export type CollapseModelValue = (string | number)[] | string | number | null
export type CollapseItemModelValue = boolean

// Props definitions
export const collapseProps = {
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
    validator(value: Property.Width): boolean {
      if (!value) {
        console.warn(`[LewCollapse] Invalid width: "${value}". Expected: valid CSS width value.`)
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
      console.warn(`[LewCollapse] Invalid width: "${value}". Expected: valid CSS width value (e.g., "100px", "50%", "auto", "calc(100% - 20px)").`)
      return false
    },
  },
}

export const collapseItemProps = {
  collapseKey: {
    type: [String, Number] as PropType<string | number>,
    required: true,
    validator(value: string | number): boolean {
      if (value === '' || value === null || value === undefined) {
        console.warn(`[LewCollapseItem] Invalid collapseKey: "${value}". Expected: non-empty string or number.`)
        return false
      }
      return true
    },
  },
  title: {
    type: String,
  },
  radius: {
    type: [String, Number] as PropType<Property.BorderRadius>,
    default: '0px',
    validator(value: Property.BorderRadius): boolean {
      if (!value) {
        console.warn(`[LewCollapseItem] Invalid radius: "${value}". Expected: valid CSS border-radius value.`)
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
      console.warn(`[LewCollapseItem] Invalid radius: "${value}". Expected: valid CSS border-radius value (e.g., "4px", "50%", "2rem", "calc(50% - 10px)").`)
      return false
    },
  },
}

// Extract prop types
export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
