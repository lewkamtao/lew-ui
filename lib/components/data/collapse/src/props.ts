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

// Props definitions
export const collapseProps = {
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
  },
}

export const collapseItemProps = {
  collapseKey: {
    type: [String, Number] as PropType<string | number>,
    required: true,
    validator(value: string | number): boolean {
      if (value === '' || value === null || value === undefined) {
        console.warn('[LewCollapseItem] collapseKey is required and cannot be empty.')
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
    default: '0px' as Property.BorderRadius,
    validator(value: Property.BorderRadius): boolean {
      return isValidCssValue({
        name: 'LewCollapseItem',
        field: 'radius',
        value,
      })
    },
  },
}

// Type definitions (使用 type 定义基础类型别名)
export type CollapseModelValue = (string | number)[] | string | number | null
export type CollapseItemModelValue = boolean

// Interface definitions (使用 interface 定义对象形状，便于扩展)
export interface CollapseProps {
  width?: Property.Width
}

export interface CollapseItemProps {
  collapseKey: string | number
  title?: string
  radius?: Property.BorderRadius
}

// Extract prop types (使用 type 定义提取的类型)
export type CollapsePropsType = ExtractPropTypes<typeof collapseProps>
export type CollapseItemPropsType = ExtractPropTypes<typeof collapseItemProps>
