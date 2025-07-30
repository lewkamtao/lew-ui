import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'
import { isValidCssValue } from 'lew-ui/utils'

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
      return isValidCssValue({
        name: 'LewCollapse',
        field: 'width',
        value,
      })
    },
  },
}

export const collapseItemProps = {
  collapseKey: {
    type: [String, Number] as PropType<string | number>,
    required: true,
    validator(value: string | number): boolean {
      if (value === '' || value === null || value === undefined) {
        console.warn('[LewCollapseItem] collapseKey is required and cannot be empty')
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
      return isValidCssValue({
        name: 'LewCollapseItem',
        field: 'radius',
        value,
      })
    },
  },
}

// Extract prop types
export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
