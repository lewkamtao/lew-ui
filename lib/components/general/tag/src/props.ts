import type { LewColor, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

// Types
export type TagType = 'fill' | 'light' | 'ghost'

export const tagProps = {
  text: {
    type: String,
  },

  // Style props
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
  },
  oversize: {
    type: Boolean,
  },

  // State props
  disabled: {
    type: Boolean,
  },

  // Feature props
  closable: {
    type: Boolean,
  },
}

// Export model for documentation
export const model = {
  tag: {
    type: 'String | Object',
    description: 'Tag model value',
  },
}

export type TagProps = ExtractPropTypes<typeof tagProps>
