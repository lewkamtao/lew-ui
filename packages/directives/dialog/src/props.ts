export const _props = {
  visible: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '',
  },
  ok: {
    type: Function,
    default: () => {
      return true
    },
  },
  okText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
  cancel: {
    type: Function,
    default: () => {
      return true
    },
  },
  layout: {
    type: String,
    default: 'normal', // normal or mini
  },
}
