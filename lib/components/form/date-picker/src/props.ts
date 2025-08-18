import type { Property } from 'csstype'
import type { LewDatePickerPresetsOption, LewSize } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const datePickerProps = {
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    validator: validators.string({
      componentName: 'LewDatePicker',
      propName: 'valueFormat',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewDatePicker',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '300px',
    validator: validators.widthHeight({
      componentName: 'LewDatePicker',
      propName: 'width',
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewDatePicker',
      propName: 'placeholder',
    }),
  },
  clearable: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewDatePicker',
      propName: 'clearable',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDatePicker',
      propName: 'readonly',
    }),
  },
  disabled: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewDatePicker',
      propName: 'disabled',
    }),
  },
  presets: {
    type: Array as PropType<LewDatePickerPresetsOption[]>,
    typePopKeys: ['LewDatePickerPresetsOption'],
    default: () => [],
    validator: validators.array({
      componentName: 'LewDatePicker',
      propName: 'presets',
    }),
  },
}

export const dateProps = {
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    validator: validators.string({
      componentName: 'LewDatePicker',
      propName: 'valueFormat',
    }),
  },
}

export type LewDatePickerProps = ExtractPublicPropTypes<typeof datePickerProps>
