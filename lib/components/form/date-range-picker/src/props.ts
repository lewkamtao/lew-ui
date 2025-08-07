import type { Property } from 'csstype'
import type { LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const dateRangePickerModel = {
  modelValue: {
    type: Object as () => Record<string, Date | undefined>,
    default: () => ({}),
  },
}

export const dateRangePickerProps = {
  startKey: {
    type: String,
    default: 'start',
    validator: validators.string({
      componentName: 'LewDateRangePicker',
      propName: 'startKey',
    }),
  },
  endKey: {
    type: String,
    default: 'end',
    validator: validators.string({
      componentName: 'LewDateRangePicker',
      propName: 'endKey',
    }),
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    validator: validators.string({
      componentName: 'LewDateRangePicker',
      propName: 'valueFormat',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewDateRangePicker',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '300px',
    validator: validators.widthHeight({
      componentName: 'LewDateRangePicker',
      propName: 'width',
    }),
  },
  placeholderStart: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewDateRangePicker',
      propName: 'placeholderStart',
    }),
  },
  placeholderEnd: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewDateRangePicker',
      propName: 'placeholderEnd',
    }),
  },
  clearable: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewDateRangePicker',
      propName: 'clearable',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDateRangePicker',
      propName: 'readonly',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDateRangePicker',
      propName: 'disabled',
    }),
  },
}

export const dateRangeProps = {
  startKey: {
    type: String,
    default: 'start',
    validator: validators.string({
      componentName: 'LewDateRangePicker',
      propName: 'startKey',
    }),
  },
  endKey: {
    type: String,
    default: 'end',
    validator: validators.string({
      componentName: 'LewDateRangePicker',
      propName: 'endKey',
    }),
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    validator: validators.string({
      componentName: 'LewDateRangePicker',
      propName: 'valueFormat',
    }),
  },
}

export type LewDateRangePickerProps = ExtractPropTypes<typeof dateRangePickerProps>
