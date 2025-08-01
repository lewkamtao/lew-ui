import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

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
    validator: validators.widthHeight({
      componentName: 'LewCollapse',
      propName: 'width',
    }),
  },
}

export const collapseItemProps = {
  collapseKey: {
    type: [String, Number] as PropType<string | number>,
    required: true,
    validator: validators.string({
      componentName: 'LewCollapseItem',
      propName: 'collapseKey',
      allowEmpty: false,
    }),
  },
  title: {
    type: String,
    validator: validators.string({
      componentName: 'LewCollapseItem',
      propName: 'title',
    }),
  },
  radius: {
    type: [String, Number] as PropType<Property.BorderRadius>,
    default: '0px',
    validator: validators.widthHeight({
      componentName: 'LewCollapseItem',
      propName: 'radius',
    }),
  },
}

// Extract prop types
export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
