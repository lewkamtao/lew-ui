import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonProps } from '../../button/index'

export const modalModel = {
  visible: {
    type: Boolean,
    default: false,
    description: '绑定值，显示控制'
  }
}

export const modalProps = {
  title: {
    type: String,
    default: '',
    description: '标题'
  },
  width: {
    type: [String, Number],
    default: 'auto',
    description: '宽度'
  },
  height: {
    type: [String, Number],
    default: 'auto',
    description: '高度'
  },
  hideFooter: {
    type: Boolean,
    default: false,
    description: '隐藏底部'
  },
  closeByEsc: {
    type: Boolean,
    default: false,
    description: '是否允许esc关闭'
  },
  okProps: {
    type: Object as PropType<ButtonProps>,
    default: () => {
      return {
        text: '确定',
        color: 'primary'
      }
    },
    description: '确定按钮文字'
  },
  cancelProps: {
    type: Object as PropType<ButtonProps>,
    default: () => {
      return {
        type: 'text',
        text: '取消',
        color: 'normal'
      }
    },
    description: '确定按钮文字'
  },
  hideOkButton: {
    type: Boolean,
    default: false,
    description: '隐藏确定按钮'
  },
  hideCancelButton: {
    type: Boolean,
    default: false,
    description: '隐藏取消按钮'
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    description: '点击遮罩层是否关闭'
  }
}
export type ModalProps = ExtractPropTypes<typeof modalProps>
