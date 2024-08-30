import type { ExtractPropTypes, PropType } from 'vue'

export const collapseModel = {
  modelValue: {
    type: [Array, String],
    default: false,
    description: '折叠面板的当前值，用于双向绑定。数组类型表示多选模式，字符串类型表示手风琴模式。',
    validator(value: string[] | number[] | string): boolean {
      if (Array.isArray(value)) {
        if (!value.every(item => typeof item === 'string' || typeof item === 'number')) {
          console.warn('[LewCollapse] modelValue 数组中的元素必须是字符串或数字类型。')
          return false
        }
      } else if (typeof value !== 'string') {
        console.warn('[LewCollapse] modelValue 必须是数组或字符串类型。')
        return false
      }
      return true
    }
  }
}

export const collapseItemModel = {
  modelValue: {
    type: Boolean,
    default: false,
    description: '折叠项的展开状态，true 表示展开，false 表示折叠。'
  }
}

export const collapseProps = {
  width: {
    type: String,
    default: '100%',
    description: '折叠面板的宽度，支持 CSS 宽度值。',
    validator(value: string): boolean {
      if (!/^\d+(%|px|em|rem|vw)$/.test(value)) {
        console.warn('[LewCollapse] width 属性必须是有效的 CSS 宽度值。')
        return false
      }
      return true
    }
  },
  gap: {
    type: String,
    default: '0px',
    description: '折叠项之间的间距，支持 CSS 长度值。',
    validator(value: string): boolean {
      if (!/^\d+(%|px|em|rem|vw)$/.test(value)) {
        console.warn('[LewCollapse] gap 属性必须是有效的 CSS 长度值。')
        return false
      }
      return true
    }
  }
}

export const collapseItemProps = {
  collapseKey: {
    type: [String, Number],
    default: '',
    description: '折叠项的唯一标识符。在使用 Collapse 组件时必须提供。',
    validator(value: string | number): boolean {
      if (value === '') {
        console.warn('[LewCollapseItem] collapseKey 不能为空。')
        return false
      }
      return true
    }
  },
  title: {
    type: String,
    default: '',
    description: '折叠项的标题文本。也可以使用具名插槽 "title" 自定义标题内容。'
  },
  radius: {
    type: String,
    default: '0px',
    description: '折叠项的圆角大小，支持 CSS 圆角值。',
    validator(value: string): boolean {
      if (!/^\d+(%|px|em|rem)$/.test(value)) {
        console.warn('[LewCollapseItem] radius 属性必须是有效的 CSS 圆角值。')
        return false
      }
      return true
    }
  },
  padding: {
    type: String,
    default: '0px 0px 0px 20px',
    description: '折叠项内容的内边距，支持 CSS padding 值。',
    validator(value: string): boolean {
      const parts = value.split(' ')
      if (parts.length > 4 || parts.some(part => !/^\d+(%|px|em|rem)$/.test(part))) {
        console.warn('[LewCollapseItem] padding 属性必须是有效的 CSS padding 值。')
        return false
      }
      return true
    }
  }
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
