import type { PropType } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'

export type SelectMultipleOptions = {
  label: string
  value: string | number
  disabled?: boolean
  isGroup?: boolean
  groupValue?: string | number
  groupLabel?: string
}

export type SelectMultipleOptionsGroup = {
  label: string
  children: SelectMultipleOptions[]
}

export type SelectSearchMultipleMethodParams = {
  options?: SelectMultipleOptions[]
  keyword?: string
}

export const selectMultipleModel = {
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
    description: '多选框的选中值数组'
  }
}

export const selectMultipleProps = {
  options: {
    type: Array as PropType<SelectMultipleOptions[]>,
    default: () => [],
    description: '可选项列表'
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
    description: '触发下拉菜单的方式'
  },
  width: {
    type: [String, Number],
    default: '300px',
    description: '选择框宽度，支持数字（单位：像素）或带单位的字符串'
  },
  valueLayout: {
    type: String as PropType<'tag' | 'text'>,
    default: 'text',
    description: '选中值的显示方式'
  },
  valueTextSplit: {
    type: String,
    default: ',',
    description: '文本模式下选中值的分隔符'
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    description: '选择框默认文本'
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '尺寸',
    validator(value: LewSize) {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewSelectMultiple] size 必须是 ${validSizes.join('、')} 之一`
        )
        return false
      }
      return true
    }
  },
  itemHeight: {
    type: Number,
    default: 38,
    description: '选项高度（像素），用于虚拟列表计算'
  },
  searchable: {
    type: Boolean,
    default: false,
    description: '是否启用搜索功能'
  },
  searchPlaceholder: {
    type: String,
    default: '',
    description: '搜索框占位文本'
  },
  searchMethod: {
    type: Function as PropType<
      (params: SelectSearchMultipleMethodParams) => SelectMultipleOptions[]
    >,
    default: undefined,
    description: '自定义搜索方法，接收搜索参数并返回过滤后的选项列表'
  },
  searchMethodId: {
    type: String,
    default: '',
    hidden: true,
    description: '上传函数的标识'
  },
  searchDelay: {
    type: Number,
    default: 250,
    description: '搜索防抖延迟时间（毫秒）'
  },
  clearable: {
    type: Boolean,
    default: false,
    description: '是否显示清空按钮'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否为只读状态'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用选择框'
  },
  showCheckIcon: {
    type: Boolean,
    default: true,
    description: '是否在选项旁显示勾选图标'
  },
  defaultValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
    description: '选择框默认值'
  }
}
