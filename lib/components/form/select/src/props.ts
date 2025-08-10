import type { Property } from 'csstype'
import type { LewSelectOption, LewSelectSearchMethodParams, LewSize, LewTrigger } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList, validTriggerList } from 'lew-ui/validators'

export const selectModel = {
  modelValue: {
    type: [String, Number, undefined] as PropType<string | number | undefined>,
    default: '',
  },
}

export const selectProps = {
  defaultValue: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewSelect',
      propName: 'defaultValue',
    }),
  },
  options: {
    type: Array as PropType<LewSelectOption[]>,
    typePopKeys: ['LewSelectOption'],
    required: true,
    validator: validators.array({
      componentName: 'LewSelect',
      propName: 'options',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '300px',
    validator: validators.widthHeight({
      componentName: 'LewSelect',
      propName: 'width',
    }),
  },
  popoverWidth: {
    type: String as PropType<Property.Width>,
    default: '300px',
    validator: validators.widthHeight({
      componentName: 'LewSelect',
      propName: 'popoverWidth',
    }),
  },
  autoWidth: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelect',
      propName: 'autoWidth',
    }),
  },
  trigger: {
    type: String as PropType<LewTrigger>,
    default: 'click',
    typeValues: validTriggerList,
    validator: validators.enum({
      componentName: 'LewSelect',
      propName: 'trigger',
      values: validTriggerList,
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewSelect',
      propName: 'placeholder',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewSelect',
      propName: 'size',
      values: validSizeList,
    }),
  },
  itemHeight: {
    type: Number,
    default: 38,
    validator: validators.number({
      componentName: 'LewSelect',
      propName: 'itemHeight',
    }),
  },
  searchable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelect',
      propName: 'searchable',
    }),
  },
  searchMethod: {
    type: Function as PropType<
      (params: LewSelectSearchMethodParams) => LewSelectOption[]
    >,
    default: undefined,
    validator: validators.function({
      componentName: 'LewSelect',
      propName: 'searchMethod',
    }),
  },
  initMethod: {
    type: Function as PropType<
      () =>
        | (LewSelectOption[] | LewSelectOption[])
        | Promise<LewSelectOption[] | LewSelectOption[]>
    >,
    default: undefined,
    validator: validators.function({
      componentName: 'LewSelect',
      propName: 'initMethod',
    }),
  },
  initMethodId: {
    type: String,
    default: '',
    hidden: true,
    validator: validators.string({
      componentName: 'LewSelect',
      propName: 'initMethodId',
    }),
  },
  searchMethodId: {
    type: String,
    default: '',
    hidden: true,
    validator: validators.string({
      componentName: 'LewSelect',
      propName: 'searchMethodId',
    }),
  },
  searchDelay: {
    type: Number,
    default: 250,
    validator: validators.number({
      componentName: 'LewSelect',
      propName: 'searchDelay',
    }),
  },
  clearable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelect',
      propName: 'clearable',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelect',
      propName: 'readonly',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSelect',
      propName: 'disabled',
    }),
  },
  showCheckIcon: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewSelect',
      propName: 'showCheckIcon',
    }),
  },
  enableSearchCache: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewSelect',
      propName: 'enableSearchCache',
    }),
  },
}

export type LewSelectProps = ExtractPublicPropTypes<typeof selectProps>
