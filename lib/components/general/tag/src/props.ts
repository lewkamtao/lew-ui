import type { LewSize } from 'lew-ui'
import type { LewTagType } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validColorList, validSizeList, validTagTypeList } from 'lew-ui/validators'

export const tagProps = {
  text: {
    type: String,
    validator: validators.string({
      componentName: 'LewTag',
      propName: 'text',
    }),
  },
  editable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'editable',
    }),
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<LewTagType>,
    typeValues: validTagTypeList,
    default: 'light',
    validator: validators.enum({
      componentName: 'LewTag',
      propName: 'type',
      values: validTagTypeList,
    }),
  },
  color: {
    type: String,
    typeValues: validColorList,
    default: 'primary',
    validator: validators.enum({
      componentName: 'LewTag',
      propName: 'color',
      values: validColorList,
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    typeValues: validSizeList,
    default: 'medium',
    validator: validators.enum({
      componentName: 'LewTag',
      propName: 'size',
      values: validSizeList,
    }),
  },
  round: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'round',
    }),
  },
  oversize: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'oversize',
    }),
  },

  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'disabled',
    }),
  },
  closeable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'closeable',
    }),
  },
  close: {
    type: Function as PropType<() => Promise<boolean>>,
    default: undefined,
    validator: validators.function({
      componentName: 'LewTag',
      propName: 'close',
    }),
  },
}

export type LewTagProps = ExtractPublicPropTypes<typeof tagProps>
