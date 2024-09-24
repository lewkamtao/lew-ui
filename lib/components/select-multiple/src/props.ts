import type { PropType } from 'vue'

export type SelectMultipleOptions = {
  label: string
  value: string | number
  disabled?: boolean
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
  valueLayout: {
    type: String as PropType<'tag' | 'text'>,
    default: 'text',
    description: '选中值的显示方式'
  },
  valueTextSplit: {
    type: String,
    default: '、',
    description: '文本模式下选中值的分隔符'
  },
  placeholder: {
    type: String,
    default: '请选择',
    description: '选择框默认文本'
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
    description: '选择框尺寸'
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
    default: ({
      options,
      keyword
    }: {
      options: SelectMultipleOptions[]
      keyword: string
    }) => {
      if (options && keyword) {
        return options.filter((option: SelectMultipleOptions) =>
          option.label.includes(keyword)
        )
      }
      return []
    },
    description: '自定义搜索方法'
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
