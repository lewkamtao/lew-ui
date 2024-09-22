import type { ExtractPropTypes, PropType } from 'vue'

type MarkColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'mint'
  | 'teal'
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'gray'
  | 'brown'

type CursorStyle = 'pointer' | 'default' | 'text' | 'move' | 'not-allowed'

type BoldValue = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export const markProps = {
  color: {
    type: String as PropType<MarkColor>,
    default: 'blue',
    validator: (value: MarkColor): boolean => {
      const validColors: MarkColor[] = [
        'red',
        'orange',
        'yellow',
        'green',
        'mint',
        'teal',
        'cyan',
        'blue',
        'indigo',
        'purple',
        'pink',
        'gray',
        'brown'
      ]
      if (!validColors.includes(value)) {
        console.warn(
          `[LewMark] 无效的颜色值: ${value}。请使用以下有效颜色之一: ${validColors.join(', ')}`
        )
        return false
      }
      return true
    },
    description: '标记的颜色'
  },
  bold: {
    type: [Number, String] as PropType<BoldValue | string>,
    default: 400,
    validator: (value: BoldValue | string): boolean => {
      const numValue = typeof value === 'string' ? parseInt(value, 10) : value
      if (
        isNaN(numValue) ||
        numValue < 100 ||
        numValue > 900 ||
        numValue % 100 !== 0
      ) {
        console.warn(
          `[LewMark] 无效的加粗值: ${value}。请使用 100 到 900 之间的 100 的倍数`
        )
        return false
      }
      return true
    },
    description: '文本的加粗程度（100-900）'
  },
  round: {
    type: Boolean,
    default: false,
    description: '是否使用圆角样式'
  },
  cursor: {
    type: String as PropType<CursorStyle>,
    default: 'default',
    validator: (value: CursorStyle): boolean => {
      const validCursors: CursorStyle[] = [
        'pointer',
        'default',
        'text',
        'move',
        'not-allowed'
      ]
      if (!validCursors.includes(value)) {
        console.warn(
          `[LewMark] 无效的鼠标样式: ${value}。请使用以下有效样式之一: ${validCursors.join(', ')}`
        )
        return false
      }
      return true
    },
    description: '鼠标悬停时的光标样式'
  }
}

export type MarkProps = ExtractPropTypes<typeof markProps>
