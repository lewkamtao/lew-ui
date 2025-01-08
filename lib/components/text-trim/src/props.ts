import type { ExtractPropTypes, PropType } from 'vue'

export type TextTrimPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TextTrimAlignment = 'start' | 'center' | 'end'

export const textTrimProps = {
  text: {
    type: [String, Number, Boolean, Array, Object],
    default: '',
    description: '要显示的文本内容'
  },
  lineClamp: {
    type: Number,
    default: undefined,
    description: '文本显示的最大行数，超出部分将被截断',
    validator(value: number): boolean {
      if (value <= 0) {
        console.warn('[LewTextTrim] lineClamp 属性必须大于 0')
        return false
      }
      return true
    }
  },
  allowHTML: {
    type: Boolean,
    default: false,
    description: '是否允许渲染 HTML 标签'
  },
  placement: {
    type: String as PropType<TextTrimPlacement>,
    default: 'top',
    description: '提示框的显示位置',
    validator(value: TextTrimPlacement): boolean {
      const validPlacements: TextTrimPlacement[] = [
        'top',
        'bottom',
        'left',
        'right'
      ]
      if (!validPlacements.includes(value)) {
        console.warn(
          `[LewTextTrim] 无效的 placement 值: ${value}。请使用 ${validPlacements.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },
  offset: {
    type: Array as PropType<number[]>,
    default: () => [0, 15],
    description: '提示框相对于目标元素的偏移量 [x, y]（单位：像素）',
    validator(value: [number, number]): boolean {
      if (
        !Array.isArray(value) ||
        value.length !== 2 ||
        !value.every((item) => typeof item === 'number')
      ) {
        console.warn('[LewTextTrim] offset 属性必须是包含两个数字的数组')
        return false
      }
      return true
    }
  },
  x: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: '提示框在水平方向的对齐方式',
    validator(value: TextTrimAlignment): boolean {
      const validAlignments: TextTrimAlignment[] = ['start', 'center', 'end']
      if (!validAlignments.includes(value)) {
        console.warn(
          `[LewTextTrim] 无效的 x 值: ${value}。请使用 ${validAlignments.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },
  delay: {
    type: Array as PropType<number[]>,
    default: [120, 120],
    description:
      '显示和隐藏提示框的延迟时间 [显示延迟, 隐藏延迟]（单位：毫秒）',
    validator(value: [number, number]): boolean {
      if (
        !Array.isArray(value) ||
        value.length !== 2 ||
        !value.every((item) => typeof item === 'number' && item >= 0)
      ) {
        console.warn('[LewTextTrim] delay 属性必须是包含两个非负数的数组')
        return false
      }
      return true
    }
  },
  reserveEnd: {
    type: Number,
    default: 0,
    description: '保留末尾的字符数量，当文本溢出时会在中间显示省略号，保留开头和指定数量的末尾字符',
    validator(value: number): boolean {
      if (value < 0) {
        console.warn('[LewTextTrim] reserveEnd 属性必须大于等于 0')
        return false
      }
      return true
    }
  }
}

export type TextTrimProps = ExtractPropTypes<typeof textTrimProps>
