import type { LewColor, LewOffset } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validColorList } from 'lew-ui/validators'

export const badgeProps = {
  text: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewBadge',
      propName: 'text',
    }),
  },
  offset: {
    type: Array as unknown as PropType<LewOffset>,
    default: (): LewOffset => [0, 0],
    validator: validators.array({
      componentName: 'LewBadge',
      propName: 'offset',
    }),
  },
  processing: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewBadge',
      propName: 'processing',
    }),
  },
  max: {
    type: Number,
    default: 99,
    validator: validators.number({
      componentName: 'LewBadge',
      propName: 'max',
    }),
  },
  color: {
    type: String as PropType<LewColor>,
    typeValues: validColorList,
    default: 'red',
    validator: validators.enum({
      componentName: 'LewBadge',
      propName: 'color',
      values: validColorList,
    }),
  },
  value: {
    type: String,
    validator: validators.string({
      componentName: 'LewBadge',
      propName: 'value',
    }),
  },
}

export type LewBadgeProps = ExtractPropTypes<typeof badgeProps>
