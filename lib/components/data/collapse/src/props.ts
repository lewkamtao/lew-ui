import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'
import { isValidCssValue } from 'lew-ui/utils'

export const collapseModel = {
  modelValue: {
    type: [Array, String, Number],
    default: '',
  },
}

export const collapseItemModel = {
  modelValue: {
    type: Boolean,
    default: false,
  },
}

export const collapseProps = {
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
  },
}

export const collapseItemProps = {
  collapseKey: {
    type: [String, Number],
    default: '',
    description: '折叠项的唯一标识符。在使用 Collapse 组件时必须提供。',
    validator(value: string | number): boolean {
      if (value === '') {
        console.warn('[LewCollapseItem] collapseKey 不能为空。')
        return false
      }
      return true
    },
  },
  title: {
    type: String,
    default: '',
    description:
      '折叠项的标题文本。也可以使用具名插槽 "title" 自定义标题内容。',
  },
  radius: {
    type: [String, Number] as PropType<Property.BorderRadius>,
    default: '0px' as Property.BorderRadius,
    description: '折叠项的圆角大小，支持所有 CSS border-radius 属性值。',
    validator(value: Property.BorderRadius): boolean {
      return isValidCssValue({
        name: 'LewCollapseItem',
        field: 'radius',
        value,
      })
    },
  },
}

// 导出增强的类型定义
export interface CollapsePropsEnhanced {
  width?: Property.Width
}

export interface CollapseItemPropsEnhanced {
  collapseKey: string | number
  title?: string
  radius?: Property.BorderRadius
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
