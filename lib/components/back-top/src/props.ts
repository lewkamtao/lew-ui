import type { ExtractPropTypes } from 'vue'

export const backTopProps = {
  right: {
    type: Number,
    default: 40,
    validator(value: number): boolean {
      if (value < 0) {
        console.warn('[LewBackTop] right 属性值不能为负数。')
        return false
      }
      return true
    },
    description: '设置组件距离页面右侧的距离，单位为像素。'
  },
  bottom: {
    type: Number,
    default: 40,
    validator(value: number): boolean {
      if (value < 0) {
        console.warn('[LewBackTop] bottom 属性值不能为负数。')
        return false
      }
      return true
    },
    description: '设置组件距离页面底部的距离，单位为像素。'
  },
  valveHeight: {
    type: Number,
    default: 50,
    validator(value: number): boolean {
      if (value < 0) {
        console.warn('[LewBackTop] valveHeight 属性值不能为负数。')
        return false
      }
      return true
    },
    description:
      '设置页面滚动高度的阈值，当滚动高度超过此值时显示回到顶部按钮，单位为像素。'
  },
  target: {
    type: String,
    default: '',
    validator(value: string): boolean {
      if (
        value &&
        typeof document !== 'undefined' &&
        !document.querySelector(value)
      ) {
        console.warn(
          `[LewBackTop] 未找到目标元素：${value}。请确保提供了有效的 CSS 选择器。`
        )
        return false
      }
      return true
    },
    description:
      '指定触发滚动事件的目标元素，使用 CSS 选择器。如果为空，则默认为整个窗口。'
  }
}

export type BackTopProps = ExtractPropTypes<typeof backTopProps>
