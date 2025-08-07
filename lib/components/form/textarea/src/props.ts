import type { Property } from 'csstype'
import type { LewSize, LewTextareaResize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validResizeList, validSizeList } from 'lew-ui/validators'

export const textareaModel = {
  modelValue: {
    type: String,
    default: undefined,
  },
}

export const textareaProps = {
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewTextarea',
      propName: 'placeholder',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTextarea',
      propName: 'disabled',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTextarea',
      propName: 'readonly',
    }),
  },
  clearable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTextarea',
      propName: 'clearable',
    }),
  },
  showCount: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTextarea',
      propName: 'showCount',
    }),
  },
  maxLength: {
    type: Number,
    default: undefined,
    validator: validators.number({
      componentName: 'LewTextarea',
      propName: 'maxLength',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewTextarea',
      propName: 'size',
      values: validSizeList,
    }),
  },
  resize: {
    type: String as PropType<LewTextareaResize>,
    default: 'none',
    validator: validators.enum({
      componentName: 'LewTextarea',
      propName: 'resize',
      values: validResizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
    validator: validators.widthHeight({
      componentName: 'LewTextarea',
      propName: 'width',
    }),
  },
  height: {
    type: String as PropType<Property.Height>,
    default: '80px',
    validator: validators.widthHeight({
      componentName: 'LewTextarea',
      propName: 'height',
    }),
  },
  minWidth: {
    type: String as PropType<Property.Width>,
    default: '240px',
    validator: validators.widthHeight({
      componentName: 'LewTextarea',
      propName: 'minWidth',
    }),
  },
  minHeight: {
    type: String as PropType<Property.Height>,
    default: '80px',
    validator: validators.widthHeight({
      componentName: 'LewTextarea',
      propName: 'minHeight',
    }),
  },
  maxWidth: {
    type: String as PropType<Property.Width>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewTextarea',
      propName: 'maxWidth',
    }),
  },
  maxHeight: {
    type: String as PropType<Property.Height>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewTextarea',
      propName: 'maxHeight',
    }),
  },
  selectByFocus: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTextarea',
      propName: 'selectByFocus',
    }),
  },
  okByEnter: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTextarea',
      propName: 'okByEnter',
    }),
  },
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
