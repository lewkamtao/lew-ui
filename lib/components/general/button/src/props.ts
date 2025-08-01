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
  },
  dashed: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  request: {
    type: Function as PropType<() => Promise<void>>,
  },
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
