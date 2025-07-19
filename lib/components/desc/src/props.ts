import type { LewSize, TextTrimAlignment } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { validSizes } from 'lew-ui/constants'

export type DescDirection = 'x' | 'y'

export interface DescOptions {
  label: string
  field: string
  gridArea: string
  direction: DescDirection
  customRender: (value: any) => any
}

export const descProps = {
  options: {
    type: Array as PropType<Array<DescOptions>>,
    required: true,
    default: () => [],
    description: '配置选项数组，用于定义描述组件的结构和内容',
    validator(value: Array<DescOptions>): boolean {
      if (!Array.isArray(value)) {
        console.warn('[LewDesc] options 必须是一个数组')
        return false
      }
      return true
    },
  },
  dataSource: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
    description: '包含描述项值的对象',
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '描述组件的整体尺寸，影响所有描述项的大小',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewDesc] 无效的 size 值: ${value}。请使用 'small', 'medium' 或 'large'`,
        )
        return false
      }
      return true
    },
  },
  labelX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: '描述项标签的对齐方式',
  },
  valueX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: '描述项值的对齐方式',
  },
  gap: {
    type: [String, Number],
    default: 30,
    description: '描述项之间的间距，单位为像素',
    validator(value: string | number): boolean {
      const numValue = typeof value === 'string' ? Number.parseInt(value, 10) : value
      if (Number.isNaN(numValue) || numValue < 0) {
        console.warn(`[LewFlex] gap 值必须是非负数或可转换为非负数的字符串。`)
        return false
      }
      return true
    },
  },
  width: {
    type: [Number, String],
    default: '',
    description: '描述组件的整体宽度，可以是数字（像素）或百分比字符串',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewDesc] width 不能为负数')
        return false
      }
      if (value && typeof value === 'string' && !/^\d+(%|px)?$/.test(value)) {
        console.warn('[LewDesc] width 字符串必须是有效的 CSS 宽度值')
        return false
      }
      return true
    },
  },
  columns: {
    type: [Number, String],
    default: 1,
    description: '每行显示的描述项数量，范围为1到4',
    validator(value: number | string): boolean {
      const numValue = Number(value)
      if (Number.isNaN(numValue) || numValue < 1 || numValue > 4) {
        console.warn('[LewDesc] columns 必须是 1 到 4 之间的数字')
        return false
      }
      return true
    },
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto',
    description: '描述项标签的宽度，可以是数字（像素）或 "auto"',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewDesc] labelWidth 不能为负数')
        return false
      }
      if (
        typeof value === 'string'
        && value !== 'auto'
        && !/^\d+px$/.test(value)
      ) {
        console.warn('[LewDesc] labelWidth 字符串必须是 "auto" 或有效的像素值')
        return false
      }
      return true
    },
  },
  direction: {
    type: String as PropType<DescDirection>,
    default: 'x',
    description: '描述项的排列方向，"x" 表示水平排列，"y" 表示垂直排列',
    validator(value: DescDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(
          `[LewDesc] 无效的 direction 值: ${value}。请使用 'x' 或 'y'`,
        )
        return false
      }
      return true
    },
  },
  id: {
    type: String,
    default: '',
    description: '描述组件的唯一标识符，用于区分不同的描述',
    hidden: true,
  },
  bordered: {
    type: Boolean,
    default: false,
    description: '是否显示边框和标签背景',
  },
}

export const descItemProps = {
  label: {
    type: String,
    default: '',
    description: '描述项的标签文本',
  },
  field: {
    type: String,
    default: '',
    description: '描述项对应的数据字段',
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '单个描述项的尺寸，可以覆盖整体设置',
    validator(value: LewSize): boolean {
      if (!['small', 'medium', 'large'].includes(value)) {
        console.warn(
          `[LewDescItem] 无效的 size 值: ${value}。请使用 'small', 'medium' 或 'large'`,
        )
        return false
      }
      return true
    },
  },
  bordered: {
    type: Boolean,
    default: false,
    description: '是否显示边框和标签背景',
  },
  width: {
    type: [Number, String],
    default: '',
    description: '单个描述项的宽度，可以是数字（像素）或百分比字符串',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewDescItem] width 不能为负数')
        return false
      }
      if (value && typeof value === 'string' && !/^\d+(%|px)?$/.test(value)) {
        console.warn('[LewDescItem] width 字符串必须是有效的 CSS 宽度值')
        return false
      }
      return true
    },
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto',
    description: '单个描述项标签的宽度，可以是数字（像素）或 "auto"',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewDescItem] labelWidth 不能为负数')
        return false
      }
      if (
        typeof value === 'string'
        && value !== 'auto'
        && !/^\d+px$/.test(value)
      ) {
        console.warn(
          '[LewDescItem] labelWidth 字符串必须是 "auto" 或有效的像素值',
        )
        return false
      }
      return true
    },
  },
  direction: {
    type: String as PropType<DescDirection>,
    default: 'x',
    description: '单个描述项的排列方向，"x" 表示水平，"y" 表示垂直',
    validator(value: DescDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(
          `[LewDescItem] 无效的 direction 值: ${value}。请使用 'x' 或 'y'`,
        )
        return false
      }
      return true
    },
  },
  tips: {
    type: String,
    default: '',
    description: '描述项的提示信息，用于提供额外的说明',
  },
  type: {
    type: String as PropType<'text-trim'>,
    default: '',
    description: '描述项的类型，例如文本截断',
  },
  labelX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: '描述项标签的对齐方式',
  },
  valueX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: '描述项值的对齐方式',
  },
  gridArea: {
    type: String,
    default: '',
    description: '在网格布局中的位置',
  },
  customRender: {
    type: Function as PropType<(value: any) => any>,
    default: null,
    description: '自定义渲染函数，用于自定义描述项的显示',
  },
  id: {
    type: String,
    default: '',
    description: '单个描述项的唯一标识符，用于区分不同的描述项',
    hidden: true,
  },
  dataSource: {
    type: Object,
    default: {},
    hidden: true,
  },
}

export const lewDescSizePaddingMap: Record<LewSize, number> = {
  small: 14,
  medium: 20,
  large: 26,
}

export type DescProps = ExtractPropTypes<typeof descProps>
export type DescItemProps = ExtractPropTypes<typeof descItemProps>
