import type { LewColor, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

// Types
export type TagType = 'fill' | 'light' | 'ghost'

export const tagProps = {
  text: {
    type: String,
    validator: validators.string({
      componentName: 'LewTag',
      propName: 'text',
    }),
  },
  type: {
    type: String as PropType<TagType>,
    default: 'light',
    validator: validators.enum({
      componentName: 'LewTag',
      propName: 'type',
      values: ['fill', 'light', 'ghost'],
    }),
  },
  color: {
    type: String as PropType<LewColor>,
    default: 'primary',
    validator: validators.string({
      componentName: 'LewTag',
      propName: 'color',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    validator: validators.size({
      componentName: 'LewTag',
      propName: 'size',
    }),
  },
  round: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'round',
    }),
  },
  oversize: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'oversize',
    }),
  },

  disabled: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'disabled',
    }),
  },

  closable: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewTag',
      propName: 'closable',
    }),
  },
}

export type LewTagProps = ExtractPropTypes<typeof tagProps>
