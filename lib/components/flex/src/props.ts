import type { ExtractPropTypes, PropType } from 'vue';

export type FlexDirection = 'x' | 'y';
export type FlexXAlignment = 'start' | 'center' | 'end' | 'left' | 'right';
export type FlexYAlignment = 'start' | 'center' | 'end' | 'top' | 'bottom';
export type FlexMode = 'around' | 'between';

export const flexProps = {
  direction: {
    type: String as PropType<FlexDirection>,
    default: 'x',
    typeDesc: 'x | y',
    validator(value: FlexDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(`[LewFlex] 无效的方向值: ${value}。请使用 'x' 或 'y'。`);
        return false;
      }
      return true;
    },
  },
  x: {
    type: String as PropType<FlexXAlignment>,
    default: 'start',
    typeDesc: 'start | center | end',
    validator(value: FlexXAlignment): boolean {
      if (!['start', 'center', 'end', 'left', 'right'].includes(value)) {
        console.warn(
          `[LewFlex] 无效的水平对齐值: ${value}。请使用 'start'、'center'、'end'、'left' 或 'right'。`
        );
        return false;
      }
      return true;
    },
  },
  y: {
    type: String as PropType<FlexYAlignment>,
    default: 'center',
    typeDesc: 'start | center | end',
    validator(value: FlexYAlignment): boolean {
      if (!['start', 'center', 'end', 'top', 'bottom'].includes(value)) {
        console.warn(
          `[LewFlex] 无效的垂直对齐值: ${value}。请使用 'start'、'center'、'end'、'top' 或 'bottom'。`
        );
        return false;
      }
      return true;
    },
  },
  mode: {
    type: String as PropType<FlexMode>,
    default: '',
    typeDesc: 'around | between',
    validator(value: FlexMode): boolean {
      if (value && !['around', 'between'].includes(value)) {
        console.warn(
          `[LewFlex] 无效的分布模式: ${value}。请使用 'around' 或 'between'。`
        );
        return false;
      }
      return true;
    },
  },
  wrap: {
    type: Boolean,
    default: false,
  },
  gap: {
    type: [String, Number],
    default: 10,
    validator(value: string | number): boolean {
      const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
      if (isNaN(numValue) || numValue < 0) {
        console.warn(`[LewFlex] gap 值必须是非负数或可转换为非负数的字符串。`);
        return false;
      }
      return true;
    },
  },
  width: {
    type: [String, Number],
    default: '',
    validator(value: string | number): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn(`[LewFlex] width 值必须是非负数。`);
        return false;
      }
      if (
        value &&
        typeof value === 'string' &&
        !/^(\d+(\.\d+)?(px|%)?|\d+)$/.test(value)
      ) {
        console.warn(
          `[LewFlex] width 字符串值必须是有效的 CSS 宽度值（如 '100px' 或 '50%'）。`
        );
        return false;
      }
      return true;
    },
  },
};

export type FlexProps = ExtractPropTypes<typeof flexProps>;
