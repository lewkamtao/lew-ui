import type { LewSize } from 'lew-ui/types'
import type { PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const switchModel = {
  modelValue: {
    type: Boolean,
    default: false,
  },
}

export const switchProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewSwitch',
      propName: 'size',
      values: validSizeList,
    }),
  },
  round: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewSwitch',
      propName: 'round',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSwitch',
      propName: 'readonly',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSwitch',
      propName: 'disabled',
    }),
  },
  request: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
    validator: validators.function({
      componentName: 'LewSwitch',
      propName: 'request',
    }),
  },
  loading: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSwitch',
      propName: 'loading',
    }),
  },
}
