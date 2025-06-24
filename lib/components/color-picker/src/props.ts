import type { LewSize } from 'lew-ui/types';

export const colorPickerModel = {
  modelValue: {
    type: String,
    description: '颜色值',
  },
};

export type ColorPickerTrigger = 'click' | 'hover';
export const colorPickerProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '颜色选择器尺寸',
  },
  width: {
    type: [Number, String],
    default: 'auto',
    description: '颜色选择器宽度',
  },
  placeholder: {
    type: String,
    default: '请选择',
    description: '颜色选择器占位文本',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读',
  },
};
