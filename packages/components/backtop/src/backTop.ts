import type { ExtractPropTypes } from 'vue'

export const backTopProps = {
  right: {
    type: Number,
    default: 40,
  },
  bottom: {
    type: Number,
    default: 40,
  },
  valveHeight: {
    type: Number,
    default: 50,
  },
  target: {
    type: String,
    default: '',
  },
}

export type BackTopProps = ExtractPropTypes<typeof backTopProps>
