import type { LewSize } from 'lew-ui/types'
import type { PropType } from 'vue'
import validators from 'lew-ui/validators'

export const colorPickerModel = {
  modelValue: {
    type: String,
  },
}

export type ColorPickerTrigger = 'click' | 'hover'
export const colorPickerProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    validator: validators.size({
      componentName: 'LewColorPicker',
      propName: 'size',
    }),
  },
  width: {
    type: [Number, String],
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewColorPicker',
      propName: 'width',
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewColorPicker',
      propName: 'placeholder',
    }),
  },
  disabled: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewColorPicker',
      propName: 'disabled',
    }),
  },
  readonly: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewColorPicker',
      propName: 'readonly',
    }),
  },
}
