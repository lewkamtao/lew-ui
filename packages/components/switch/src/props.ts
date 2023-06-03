export const _props = {
  modelValue: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  round: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  request: {
    type: Function,
  },
  loading: {
    type: Boolean,
    default: false,
  },
}
