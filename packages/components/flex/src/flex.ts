import type { ExtractPropTypes } from 'vue'

export const flexProps = {
  direction: {
    type: String,
    default: 'x',
  },
  x: {
    type: String,
    default: 'center', // start center end
  },
  y: {
    type: String,
    default: 'center', // start center end
  },
  wrap: {
    type: Boolean,
    default: false, // around / between
  },
  mode: {
    type: String,
    default: '', // around / between
  },
  gap: {
    type: [String, Number],
    default: () => {
      return 10
    },
  },
  width: { type: [String, Number] },
}
export type FlexProps = ExtractPropTypes<typeof flexProps>
