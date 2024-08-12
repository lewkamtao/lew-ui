import type { ExtractPropTypes } from 'vue'

export const collapseModel = {
  modelValue: {
    type: [Array as PropType<String[] | Number[]>, String],
    default: false,
    description: '值（双向绑定）,当值为字符串时会变成手风琴模式。'
  }
}

export const collapseItemModel = {
  modelValue: {
    type: Boolean,
    default: false,
    description: '值（双向绑定）'
  }
}

export const collapseProps = {
  width: {
    type: String,
    default: '100%',
    description: '宽度'
  },
  gap: {
    type: String,
    default: '0px',
    description: '间距'
  }
}
export const collapseItemProps = {
  collapseKey: {
    type: String,
    default: '',
    description: 'collapseKey，唯一标识，单独使用组件时不用传'
  },
  title: {
    type: String,
    default: '',
    description: '标题（支持插槽）'
  },
  radius: {
    type: String,
    default: '0px',
    description: '圆角'
  },
  padding: {
    type: String,
    default: '0px 0px 0px 20px',
    description: '内边距'
  }
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
