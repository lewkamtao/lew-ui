import type { LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validColorList, validSizeList } from 'lew-ui/validators'

// Types
export type TagType = 'fill' | 'light' | 'ghost'

const typeValues = ['fill', 'light', 'ghost']

export const tagProps = {
  text: {
    type: String,
    validator: validators.string({
      componentName: 'LewTag',
      propName: 'text',
    }),
  },
  type: {
    type: String,
    typeValues,
    default: 'light',
    validator: validators.enum({
      componentName: 'LewTag',
      propName: 'type',
      values: typeValues,
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

  closable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'closable',
    }),
  },
}

export type LewTagProps = ExtractPropTypes<typeof tagProps>
