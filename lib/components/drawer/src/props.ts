import type { ExtractPropTypes } from 'vue'

export const drawerProps = {
  visible: {
    type: Boolean,
    default: false,
    description: '是否显示'
  },
  width: {
    type: Number,
    default: 30,
    description: '宽度'
  },
  height: {
    type: Number,
    default: 30,
    description: '高度'
  },
  position: {
    type: String,
    default: '',
    description: '位置，可选值为 left、right、top、bottom'
  }
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

export const getStyle = (position: string, width: number, height: number) => {
  switch (true) {
    case !position:
      return 'width:30%;height:100%'

    case position === 'left':
      return `width:${width}%;height:100%`

    case position === 'right':
      return `width:${width}%;height:100%`

    case position === 'top':
      return `width:100%;height:${height}%`

    case position === 'bottom':
      return `width:100%;height:${height}%`

    default:
      break
  }
}

export const getPosition = (position: string) => {
  switch (position) {
    case 'left':
      return 0
    case 'right':
      return 0
    case 'top':
      return 1
    case 'bottom':
      return 1
    default:
      return 0
  }
}
