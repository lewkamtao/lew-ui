import type { Property } from 'csstype'
import type { LewCascaderOption, LewSize, LewTrigger } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList, validTriggerList } from 'lew-ui/validators'

export const cascaderMultipleProps = {
  options: {
    type: Array as PropType<LewCascaderOption[]>,
    typePopKey: ['LewCascaderOption'],
    validator: validators.array({
      componentName: 'LewCascader',
      propName: 'options',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
    validator: validators.widthHeight({
      componentName: 'LewCascader',
      propName: 'width',
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewCascader',
      propName: 'placeholder',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewCascader',
      propName: 'disabled',
    }),
  },
  clearable: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewCascader',
      propName: 'clearable',
    }),
  },
  showAllLevels: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewCascader',
      propName: 'showAllLevels',
    }),
  },
  multiple: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewCascader',
      propName: 'multiple',
    }),
  },
  free: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewCascader',
      propName: 'free',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewCascader',
      propName: 'size',
      values: validSizeList,
    }),
  },
  trigger: {
    type: String as PropType<LewTrigger>,
    default: 'click',
    typeValues: validTriggerList,
    validator: validators.enum({
      componentName: 'LewCascader',
      propName: 'trigger',
      values: validTriggerList,
    }),
  },
  loadMethod: {
    type: Function as PropType<() => Promise<LewCascaderOption[]>>,
    default: null,
    validator: validators.function({
      componentName: 'LewCascader',
      propName: 'loadMethod',
    }),
  },
  loadMethodId: {
    type: String,
    hidden: true,
    validator: validators.string({
      componentName: 'LewCascader',
      propName: 'loadMethodId',
    }),
  },
  initMethod: {
    type: Function as PropType<() => Promise<LewCascaderOption[]>>,
    default: null,
    validator: validators.function({
      componentName: 'LewCascader',
      propName: 'initMethod',
    }),
  },
  initMethodId: {
    type: String,
    validator: validators.string({
      componentName: 'LewCascader',
      propName: 'initMethodId',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewCascader',
      propName: 'readonly',
    }),
  },
}

export type LewCascadeMultipleProps = ExtractPublicPropTypes<typeof cascaderMultipleProps>
