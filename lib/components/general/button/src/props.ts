import type { Property } from 'csstype'
import type { LewButtonSize, LewButtonType, LewColor } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validColorList } from 'lew-ui/validators'

const typeValues = ['fill', 'light', 'ghost', 'text']
const sizeValues = ['mini', 'small', 'medium', 'large']

export const buttonProps = {
  text: {
    type: String,
    validator: validators.string({
      componentName: 'LewButton',
      propName: 'text',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    validator: validators.widthHeight({
      componentName: 'LewButton',
      propName: 'width',
    }),
  },
  type: {
    type: String as PropType<LewButtonType>,
    typeValues,
    default: 'fill',
    validator: validators.enum({
      componentName: 'LewButton',
      propName: 'type',
      values: typeValues,
    }),
  },
  size: {
    type: String as PropType<LewButtonSize>,
    typeValues: sizeValues,
    default: 'medium',
    validator: validators.enum({
      componentName: 'LewButton',
      propName: 'size',
      values: sizeValues,
    }),
  },
  singleIcon: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'singleIcon',
    }),
  },
  color: {
    type: String as PropType<LewColor>,
    default: 'primary',
    typeValues: validColorList,
    validator: validators.enum({
      componentName: 'LewButton',
      propName: 'color',
      values: validColorList,
    }),
  },
  round: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'round',
    }),
  },
  dashed: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'dashed',
    }),
  },
  loading: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'loading',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'disabled',
    }),
  },
  request: {
    type: Function as PropType<() => Promise<void>>,
    validator: validators.function({
      componentName: 'LewButton',
      propName: 'request',
    }),
  },
}

export type LewButtonProps = ExtractPropTypes<typeof buttonProps>
