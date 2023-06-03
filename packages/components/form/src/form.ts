import type { ExtractPropTypes } from 'vue'

export const formProps = {
  options: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: 'medium',
  },
  width: {
    type: Number,
    default: '',
  },
  labelWidth: {
    type: Number,
    default: '',
  },
  direction: {
    type: String,
    default: 'x',
  },
}

export type FormProps = ExtractPropTypes<typeof formProps>
