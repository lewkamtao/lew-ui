import type { ExtractPropTypes } from 'vue';
import type { LewSize } from 'lew-ui';
import { validSizes } from 'lew-ui/constants';

export const textareaModel = {
  modelValue: {
    type: String,
    default: undefined,
    description: '文本域的值',
  },
};

export const textareaProps = {
  placeholder: {
    type: String,
    defaultLocale: true,
    description: '占位文本',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用文本域',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否为只读状态',
  },
  clearable: {
    type: Boolean,
    default: false,
    description: '是否显示清空按钮',
  },
  showCount: {
    type: Boolean,
    default: false,
    description: '是否显示字符计数',
  },
  maxLength: {
    type: [Number, String],
    default: '',
    description: '最大输入字符数',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewTextarea] maxLength 必须大于或等于 0');
        return false;
      }
      return true;
    },
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '文本域尺寸',
    validator: (value: LewSize) => {
      if (!validSizes.includes(value)) {
        console.warn('[LewTextarea] size 必须是 small、medium 或 large');
        return false;
      }
      return true;
    },
  },
  resize: {
    type: String,
    default: 'none',
    description: '调整尺寸的方向',
    validator: (value: string) => {
      const validResizes = ['none', 'both', 'horizontal', 'vertical'];
      if (!validResizes.includes(value)) {
        console.warn(
          '[LewTextarea] resize 必须是 none、both、horizontal 或 vertical'
        );
        return false;
      }
      return true;
    },
  },
  width: {
    type: [Number, String],
    default: '',
    description: '文本域宽度',
  },
  height: {
    type: [Number, String],
    default: '',
    description: '文本域高度',
  },
  minWidth: {
    type: [Number, String],
    default: '',
    description: '最小宽度',
  },
  minHeight: {
    type: [Number, String],
    default: '',
    description: '最小高度',
  },
  maxWidth: {
    type: [Number, String],
    default: '',
    description: '最大宽度',
  },
  maxHeight: {
    type: [Number, String],
    default: '',
    description: '最大高度',
  },
  selectByFocus: {
    type: Boolean,
    default: false,
    description: '聚焦时是否自动选中文本',
  },
  okByEnter: {
    type: Boolean,
    default: false,
    description: '是否启用回车键确认（启用后，Shift+Enter可换行）',
  },
};

export type TextareaProps = ExtractPropTypes<typeof textareaProps>;
