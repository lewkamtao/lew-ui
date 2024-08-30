import type { ExtractPropTypes, PropType } from 'vue'

type EmptyType =
  | '404'
  | 'address'
  | 'article'
  | 'goods'
  | 'likes'
  | 'car'
  | 'comments'
  | 'network'
  | 'order'
  | 'search'

export const emptyProps = {
  type: {
    type: String as PropType<EmptyType>,
    default: 'search',
    typeDesc: `404
        | address
        | article
        | goods
        | likes
        | car
        | comments
        | network
        | order
        | search`,
    description: '空状态的类型，用于展示不同场景下的空状态样式'
  },
  title: {
    type: String,
    default: '暂无数据',
    description: '空状态的标题文本，用于提示用户当前无数据'
  },
  fontSize: {
    type: [String, Number],
    default: '14px',
    description: '标题文本的字体大小，可以是像素值或其他有效的 CSS 字体大小单位'
  },
  padding: {
    type: String,
    default: '20px',
    description: '空状态组件的内边距，用于调整内容与边界的距离'
  },
  width: {
    type: String,
    default: '200px',
    description: '空状态组件的宽度，可以是像素值或其他有效的 CSS 宽度单位'
  },
  height: {
    type: String,
    default: 'auto',
    description: '空状态组件的高度，默认为自适应，也可以设置为具体的 CSS 高度值'
  }
}

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
