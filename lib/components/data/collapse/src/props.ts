import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const collapseModel = {
  modelValue: {
    type: [Array, String] as PropType<string[] | string>,
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
    validator: validators.widthHeight({
      componentName: 'LewCollapse',
      propName: 'width',
    }),
  },
}

export const collapseItemProps = {
  collapseKey: {
    type: String,
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
    type: String as PropType<Property.BorderRadius>,
    default: '0px',
    validator: validators.widthHeight({
      componentName: 'LewCollapseItem',
      propName: 'radius',
    }),
  },
}

export type LewCollapseProps = ExtractPropTypes<typeof collapseProps>
export type LewCollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
