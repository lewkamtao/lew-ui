import type { LewSize } from 'lew-ui/types'
import type { PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const switchModel = {
  modelValue: {
    type: Boolean,
    default: false,
    description: '开关的当前状态',
    validator: (value: boolean) => {
      if (typeof value !== 'boolean') {
        console.warn('[LewSwitch] modelValue 必须是布尔值')
        return false
      }
      return true
    },
  },
}

export const switchProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewSwitch',
      propName: 'size',
      values: validSizeList,
    }),
  },
  round: {
    type: [Boolean, Number],
    default: true,
    description: '是否为圆角样式，当为数字时表示圆角大小',
    validator: (value: boolean | number) => {
      if (typeof value !== 'boolean' && typeof value !== 'number') {
        console.warn('[LewSwitch] round 必须是布尔值或数字')
        return false
      }
      return true
    },
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否为只读状态',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用开关',
  },
  request: {
    type: Function,
    default: null,
    description: '切换状态时的异步请求函数',
  },
  loading: {
    type: Boolean,
    default: false,
    description: '是否显示加载状态',
  },
}
