import type { LewSize } from 'lew-ui/types'

export const colorPickerModel = {
  modelValue: {
    type: String,
    description: '颜色值'
  }
}

export type ColorPickerTrigger = 'click' | 'hover'
export const colorPickerProps = {
  modelValue: {
    type: String,
    default: '#000000',
    description: '颜色值'
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '颜色选择器尺寸'
  },
  width: {
    type: Number,
    default: 140,
    description: '颜色选择器宽度'
  },
  trigger: {
    type: String as PropType<ColorPickerTrigger>,
    default: 'click',
    description: '触发下拉菜单的方式，可选值为 "click" 或 "hover"'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  }
}
