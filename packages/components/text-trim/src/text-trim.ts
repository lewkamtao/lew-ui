import type { ExtractPropTypes } from 'vue'

export const textTrimProps = {
  text: {
    type: String,
    default: () => '',
  },
  allowHTML: {
    type: Boolean,
    default: false,
  },
  arrow: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String,
    default: 'top',
  },
  x: {
    type: String,
    default: 'start', // center end
  },
  lineClamp: {
    type: Number,
    default: undefined,
  },
}

export type TextTrimProps = ExtractPropTypes<typeof textTrimProps>
