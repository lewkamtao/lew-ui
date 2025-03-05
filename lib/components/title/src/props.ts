import type { ExtractPropTypes } from 'vue'

type BoldType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type TitleColor =
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

export const titleProps = {
  text: {
    type: String,
    default: '',
    description: '标题文字'
  },
  size: {
    type: [Number, String],
    default: 24,
    description: '标题文字大小，可以是数字（单位：像素）或字符串（如 "1.5em"）',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewTitle] size 必须大于 0')
        return false
      }
      return true
    }
  },
  color: {
    type: String,
    default: '',
    description: '标题文字颜色，可选值包括预定义的颜色名称或自定义的颜色值',
    validator: (value: string) => {
      const validColors: TitleColor[] = [
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
      if (
        value &&
        !validColors.includes(value as TitleColor) &&
        !/^#([0-9A-Fa-f]{3}){1,2}$/.test(value)
      ) {
        console.warn(
          `[LewTitle] color 必须是预定义的颜色名称之一或有效的十六进制颜色值`
        )
        return false
      }
      return true
    }
  },
  bold: {
    type: Number,
    default: 500,
    description: '标题文字粗细程度，可选值为 100 到 900 之间的整百数',
    validator: (value: number) => {
      if (
        !([100, 200, 300, 400, 500, 600, 700, 800, 900] as BoldType[]).includes(
          value as BoldType
        )
      ) {
        console.warn('[LewTitle] bold 必须是 100 到 900 之间的整百数')
        return false
      }
      return true
    }
  }
}

export type TitleProps = ExtractPropTypes<typeof titleProps>
