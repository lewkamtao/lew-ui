import type { LewSize } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export type InputNumberAlign = 'left' | 'center' | 'right'

export const inputNumberModel = {
  modelValue: {
    type: Number,
    default: undefined,
    description: '输入框的数值',
  },
}

export const inputNumberProps = {
  min: {
    type: [Number, String],
    default: '',
    validator: validators.number({
      componentName: 'LewInputNumber',
      propName: 'min',
    }),
  },
  max: {
    type: [Number, String],
    default: '',
    validator: validators.number({
      componentName: 'LewInputNumber',
      propName: 'max',
    }),
  },
  step: {
    type: [Number, String],
    default: 1,
    validator: validators.positiveInteger({
      componentName: 'LewInputNumber',
      propName: 'step',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInputNumber',
      propName: 'disabled',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewInputNumber',
      propName: 'size',
      values: validSizeList,
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewInputNumber',
      propName: 'placeholder',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInputNumber',
      propName: 'readonly',
    }),
  },
  width: {
    type: [Number, String],
    default: '150px',
    validator: validators.widthHeight({
      componentName: 'LewInputNumber',
      propName: 'width',
    }),
  },
  align: {
    type: String as PropType<InputNumberAlign>,
    typeValues: 'left | center | right',
    default: 'left',
    description: '对齐方式',
    validator(value: InputNumberAlign) {
      if (!['left', 'center', 'right'].includes(value)) {
        console.warn('[LewInputNumber] align 必须是 left、center 或 right')
        return false
      }
      return true
    },
  },
  selectByFocus: {
    type: Boolean,
    default: true,
    description: '聚焦时是否选中内容',
  },
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
