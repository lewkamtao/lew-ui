import type { ExtractPropTypes, PropType } from 'vue'

type EmptyType =
  | '404'
  | 'address'
  | 'article'
  | 'goods'
  | 'likes'
  | 'car'
  | 'comment'
  | 'network'
  | 'order'
  | 'search'

export const emptyProps = {
  type: {
    type: String as PropType<EmptyType>,
    default: 'search',
    validator: (value: EmptyType) => {
      const validTypes: EmptyType[] = [
        '404',
        'address',
        'article',
        'goods',
        'likes',
        'car',
        'comment',
        'network',
        'order',
        'search'
      ]
      if (!validTypes.includes(value)) {
        console.warn(
          '[LewEmpty] 无效的类型: type 应该是 404, address, article, goods, likes, car, comment, network, order, search 之一'
        )
        return false
      }
      return true
    },
    description: '空状态的类型，用于展示不同场景下的空状态样式'
  },
  title: {
    type: String,
    default: '暂无数据',
    validator: (value: string) => {
      if (typeof value !== 'string') {
        console.warn('[LewEmpty] 无效的标题: title 应该是一个字符串')
        return false
      }
      return true
    },
    description: '空状态的标题文本，用于提示用户当前无数据'
  },
  fontSize: {
    type: [String, Number],
    default: '14px',
    validator: (value: string | number) => {
      if (typeof value !== 'string' && typeof value !== 'number') {
        console.warn(
          '[LewEmpty] 无效的字体大小: fontSize 应该是一个字符串或数字'
        )
        return false
      }
      return true
    },
    description: '标题文本的字体大小，可以是像素值或其他有效的 CSS 字体大小单位'
  },
  padding: {
    type: String,
    default: '20px',
    validator: (value: string) => {
      if (typeof value !== 'string') {
        console.warn('[LewEmpty] 无效的内边距: padding 应该是一个字符串')
        return false
      }
      return true
    },
    description: '空状态组件的内边距，用于调整内容与边界的距离'
  },
  width: {
    type: [String, Number],
    default: '200px',
    validator: (value: string | number) => {
      if (typeof value !== 'string' && typeof value !== 'number') {
        console.warn(
          '[LewEmpty] 无效的宽度: width 应该是一个字符串或数字'
        )
        return false
      }
      return true
    },
    description: '空状态组件的宽度，可以是像素值或其他有效的 CSS 宽度单位'
  },
  height: {
    type: String,
    default: 'auto',
    validator: (value: string) => {
      if (typeof value !== 'string') {
        console.warn('[LewEmpty] 无效的高度: height 应该是一个字符串')
        return false
      }
      return true
    },
    description: '空状态组件的高度，默认为自适应，也可以设置为具体的 CSS 高度值'
  }
}

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
