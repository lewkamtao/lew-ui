import type { ExtractPropTypes, PropType } from 'vue'

export type InputTagSize = 'small' | 'medium' | 'large'

export const inputTagModel = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
    description: '标签输入框的值，支持双向绑定',
  },
}

export const inputTagProps = {
  size: {
    type: String as PropType<InputTagSize>,
    default: 'medium',
    description: '标签输入框的尺寸，可选值为 small、medium 或 large',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用标签输入框',
  },
  clearable: {
    type: Boolean,
    default: false,
    description: '是否显示清空按钮，点击可清空所有标签',
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    description: '输入框的占位文本，当没有标签时显示',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否将标签输入框设为只读，只读状态下无法添加或删除标签',
  },
  allowDuplicates: {
    type: Boolean,
    default: false,
    description: '是否允许添加重复的标签',
  },
  maxLength: {
    type: Number,
    default: 0,
    description: '允许添加标签的最大数量',
  },
  width: {
    type: [String, Number],
    default: '300px',
    description: '输入框宽度，支持数字（单位：像素）或带单位的字符串',
  },
}

export type InputTagProps = ExtractPropTypes<typeof inputTagProps>
