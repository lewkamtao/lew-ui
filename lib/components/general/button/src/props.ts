import type { Property } from 'csstype'
import type { LewColor, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export type ButtonSize = 'mini' | LewSize
export type ButtonType = 'fill' | 'light' | 'ghost' | 'text'
export type IconPosition = 'left' | 'right'
export type ButtonWidth = Property.Width | number

export const buttonProps = {
  text: {
    type: String,
    validator: validators.string({
      componentName: 'LewButton',
      propName: 'text',
    }),
  },
  width: {
    type: [String, Number] as PropType<ButtonWidth>,
    validator: validators.widthHeight({
      componentName: 'LewButton',
      propName: 'width',
    }),
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'fill',
    validator: validators.string({
      componentName: 'LewButton',
      propName: 'type',
    }),
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
    validator: validators.size({
      componentName: 'LewButton',
      propName: 'size',
    }),
  },
  singleIcon: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'singleIcon',
    }),
  },
  color: {
    type: String as PropType<LewColor>,
    default: 'primary',
    validator: validators.string({
      componentName: 'LewButton',
      propName: 'color',
    }),
  },
  round: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'round',
    }),
  },
  dashed: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'dashed',
    }),
  },
  loading: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewButton',
      propName: 'loading',
    }),
  },
  disabled: {
    type: Boolean,
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

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
