import type { ExtractPropTypes } from 'vue'
import type { ButtonProps } from '../../button/index'
export const drawerModel = {
  visible: {
    type: String,
    default: '',
    description: '绑定值'
  }
}
export const drawerProps = {
  title: {
    type: String,
    default: '',
    description: '标题'
  },
  width: {
    type: Number,
    default: 500,
    description: '宽度'
  },
  height: {
    type: Number,
    default: 500,
    description: '高度'
  },
  position: {
    type: String,
    default: 'right',
    description: '位置，可选值为 left、right、top、bottom'
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
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    description: '点击遮罩层是否关闭'
  }
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
