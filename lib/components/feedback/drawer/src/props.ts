import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonProps } from '../../../general/button/index'

export const drawerModel = {
  visible: {
    type: Boolean,
    default: false,
    description: '控制抽屉的显示状态',
  },
}

export const drawerProps = {
  title: {
    type: String,
    default: '',
    description: '抽屉的标题',
  },
  position: {
    type: String,
    default: 'right',
    validator: (value: string) =>
      ['left', 'right', 'top', 'bottom'].includes(value),
    description: '抽屉的弹出位置',
  },
  width: {
    type: [Number, String],
    default: 500,
    validator: (value: number | string) => {
      const numValue = typeof value === 'string' ? Number.parseFloat(value) : value
      return !Number.isNaN(numValue) && numValue > 0
    },
    description: '抽屉的宽度，单位为像素或百分比',
  },
  height: {
    type: [Number, String],
    default: 500,
    validator: (value: number | string) => {
      const numValue = typeof value === 'string' ? Number.parseFloat(value) : value
      return !Number.isNaN(numValue) && numValue > 0
    },
    description: '抽屉的高度，单位为像素或百分比',
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    description: '是否允许点击遮罩层关闭抽屉',
  },
  closeByEsc: {
    type: Boolean,
    default: false,
    description: '是否允许按 ESC 键关闭抽屉',
  },
  hideFooter: {
    type: Boolean,
    default: false,
    description: '是否隐藏抽屉底部的操作区域',
  },
  okButtonProps: {
    type: Object as PropType<ButtonProps>,
    default: () => ({}),
    description: '确定按钮的属性配置',
  },
  closeButtonProps: {
    type: Object as PropType<ButtonProps>,
    default: () => ({}),
    description: '取消按钮的属性配置',
  },
  zIndex: {
    type: Number,
    default: 1001,
    description: '层级',
  },
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
