import type { ExtractPropTypes, PropType } from 'vue'
import type { LewSize, TextTrimAlignment } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'

export type DescDirection = 'x' | 'y'

export const descProps = {
  options: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
    default: () => [],
    description: '定义表单结构和内容的配置选项数组',
    validator(value: Array<Record<string, any>>): boolean {
      if (!Array.isArray(value)) {
        console.warn('[LewDesc] options 必须是一个数组')
        return false
      }
      return true
    }
  },
  dataSource: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
    description: '表单项的值'
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '表单整体尺寸，影响所有表单项大小',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewDesc] 无效的 size 值: ${value}。请使用 'small', 'medium' 或 'large'`
        )
        return false
      }
      return true
    }
  },
  labelX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: 'label 对齐方式'
  },
  valueX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: 'value 对齐方式'
  },
  gap: {
    type: [String, Number],
    default: 30,
    description: '子元素之间的间距（单位：像素）',
    validator(value: string | number): boolean {
      const numValue = typeof value === 'string' ? parseInt(value, 10) : value
      if (isNaN(numValue) || numValue < 0) {
        console.warn(`[LewFlex] gap 值必须是非负数或可转换为非负数的字符串。`)
        return false
      }
      return true
    }
  },
  width: {
    type: [Number, String],
    default: '',
    description: '表单整体宽度，支持数字（像素）或百分比字符串',
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
    }
  },
  columns: {
    type: [Number, String],
    default: 1,
    description: '每行显示的表单项数量，最大值为4',
    validator(value: number | string): boolean {
      const numValue = Number(value)
      if (isNaN(numValue) || numValue < 1 || numValue > 4) {
        console.warn('[LewDesc] columns 必须是 1 到 4 之间的数字')
        return false
      }
      return true
    }
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto',
    description: '表单项标签宽度，支持数字（像素）或 "auto"',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewDesc] labelWidth 不能为负数')
        return false
      }
      if (
        typeof value === 'string' &&
        value !== 'auto' &&
        !/^\d+px$/.test(value)
      ) {
        console.warn('[LewDesc] labelWidth 字符串必须是 "auto" 或有效的像素值')
        return false
      }
      return true
    }
  },
  direction: {
    type: String as PropType<DescDirection>,
    default: 'x',
    description: '表单项排列方向，"x" 为水平，"y" 为垂直',
    validator(value: DescDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(
          `[LewDesc] 无效的 direction 值: ${value}。请使用 'x' 或 'y'`
        )
        return false
      }
      return true
    }
  },
  id: {
    type: String,
    default: '',
    description: '表单的唯一标识符',
    hidden: true
  }
}

export const descItemProps = {
  label: {
    type: String,
    default: '',
    description: '标签文本'
  },
  field: {
    type: String,
    default: '',
    description: '字段'
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '单项的尺寸，可覆盖表单整体设置',
    validator(value: LewSize): boolean {
      if (!['small', 'medium', 'large'].includes(value)) {
        console.warn(
          `[LewDescItem] 无效的 size 值: ${value}。请使用 'small', 'medium' 或 'large'`
        )
        return false
      }
      return true
    }
  },
  width: {
    type: [Number, String],
    default: '',
    description: '单个表单项的宽度，支持数字（像素）或百分比字符串',
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
    }
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto',
    description: '单个表单项标签宽度，支持数字（像素）或 "auto"',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewDescItem] labelWidth 不能为负数')
        return false
      }
      if (
        typeof value === 'string' &&
        value !== 'auto' &&
        !/^\d+px$/.test(value)
      ) {
        console.warn(
          '[LewDescItem] labelWidth 字符串必须是 "auto" 或有效的像素值'
        )
        return false
      }
      return true
    }
  },
  direction: {
    type: String as PropType<DescDirection>,
    default: 'x',
    description: '单个表单项的排列方向，"x" 为水平，"y" 为垂直',
    validator(value: DescDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(
          `[LewDescItem] 无效的 direction 值: ${value}。请使用 'x' 或 'y'`
        )
        return false
      }
      return true
    }
  },
  tips: {
    type: String,
    default: '',
    description: '表单项的提示信息'
  },
  type: {
    type: String as PropType<'text-trim'>,
    default: '',
    description: '表单项类型'
  },
  labelX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: 'label 对齐方式'
  },
  valueX: {
    type: String as PropType<TextTrimAlignment>,
    default: 'start',
    description: 'value 对齐方式'
  },
  gridArea: {
    type: String,
    default: '',
    description: '在网格布局中的位置'
  },
  customRender: {
    type: Function as PropType<(value: any) => any>,
    default: null,
    description: '自定义渲染函数'
  },
  id: {
    type: String,
    default: '',
    description: '表单项的唯一标识符',
    hidden: true
  },
  dataSource: {
    type: Object,
    default: {},
    hidden: true
  }
}

export type DescProps = ExtractPropTypes<typeof descProps>
export type DescItemProps = ExtractPropTypes<typeof descItemProps>
