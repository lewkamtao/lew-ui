import type { LewCascaderOptions, LewSize, LewTrigger } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validSizeList, validTriggerList } from 'lew-ui/validators'

export const cascaderModel = {
  modelValue: {
    type: String,
  },
}

export const cascaderProps = {
  options: {
    type: Array as PropType<LewCascaderOptions[]>,
    typePopKey: ['LewCascaderOptions'],
    default: () => [],
    validator: validators.array({
      componentName: 'LewCascader',
      propName: 'options',
    }),
  },
  width: {
    type: String,
    default: '300px',
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
    type: Function,
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
    type: Function,
    validator: validators.function({
      componentName: 'LewCascader',
      propName: 'initMethod',
    }),
  },
  initMethodId: {
    type: String,
    hidden: true,
    validator: validators.string({
      componentName: 'LewCascader',
      propName: 'initMethodId',
    }),
  },
  readonly: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCascader',
      propName: 'readonly',
    }),
  },
}

export type LewCascaderProps = ExtractPropTypes<typeof cascaderProps>
