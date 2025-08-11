import type { Property } from 'csstype'
import type { LewSelectMultipleOption, LewSelectMultipleValueLayout, LewSelectSearchMultipleMethodParams, LewSize, LewTrigger } from 'lew-ui'
import type { PropType } from 'vue'
import validators, { validSelectMultipleValueLayout, validSizeList, validTriggerList } from 'lew-ui/validators'

export const selectMultipleModel = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
}

export const selectMultipleProps = {
  options: {
    type: Array as PropType<LewSelectMultipleOption[]>,
    typePopKeys: ['LewSelectMultipleOption'],
    validator: validators.array({
      componentName: 'LewSelectMultiple',
      propName: 'options',
    }),
  },
  trigger: {
    type: String as PropType<LewTrigger>,
    default: 'click',
    typeValues: validTriggerList,
    validator: validators.enum({
      componentName: 'LewSelectMultiple',
      propName: 'trigger',
      values: validTriggerList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '300px',
    validator: validators.widthHeight({
      componentName: 'LewSelectMultiple',
      propName: 'width',
    }),
  },
  valueLayout: {
    type: String as PropType<LewSelectMultipleValueLayout>,
    default: 'text',
    typeValues: validSelectMultipleValueLayout,
    validator: validators.enum({
      componentName: 'LewSelectMultiple',
      propName: 'valueLayout',
      values: validSelectMultipleValueLayout,
    }),
  },
  valueTextSplit: {
    type: String,
    default: ',',
    validator: validators.string({
      componentName: 'LewSelectMultiple',
      propName: 'valueTextSplit',
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewSelectMultiple',
      propName: 'placeholder',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewSelectMultiple',
      propName: 'size',
      values: validSizeList,
    }),
  },
  itemHeight: {
    type: Number,
    default: 38,
    validator: validators.number({
      componentName: 'LewSelectMultiple',
      propName: 'itemHeight',
    }),
  },
  searchable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelectMultiple',
      propName: 'searchable',
    }),
  },
  searchPlaceholder: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewSelectMultiple',
      propName: 'searchPlaceholder',
    }),
  },
  searchMethod: {
    type: Function as PropType<
      (params: LewSelectSearchMultipleMethodParams) => LewSelectMultipleOption[]
    >,
    default: undefined,
    validator: validators.function({
      componentName: 'LewSelectMultiple',
      propName: 'searchMethod',
    }),
  },
  initMethod: {
    type: Function as PropType<
      () =>
        | LewSelectMultipleOption[]
        | Promise<LewSelectMultipleOption[]>
    >,
    default: undefined,
    validator: validators.function({
      componentName: 'LewSelectMultiple',
      propName: 'initMethod',
    }),
  },
  initMethodId: {
    type: String,
    validator: validators.string({
      componentName: 'LewSelectMultiple',
      propName: 'initMethodId',
    }),
  },
  searchMethodId: {
    type: String,
    hidden: true,
    validator: validators.string({
      componentName: 'LewSelectMultiple',
      propName: 'searchMethodId',
    }),
  },
  searchDelay: {
    type: Number,
    default: 250,
    validator: validators.number({
      componentName: 'LewSelectMultiple',
      propName: 'searchDelay',
    }),
  },
  clearable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelectMultiple',
      propName: 'clearable',
    }),
  },
  enableSearchCache: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelectMultiple',
      propName: 'enableSearchCache',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelectMultiple',
      propName: 'readonly',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelectMultiple',
      propName: 'disabled',
    }),
  },
  showCheckIcon: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewSelectMultiple',
      propName: 'showCheckIcon',
    }),
  },
  defaultValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewSelectMultiple',
      propName: 'defaultValue',
    }),
  },
}
