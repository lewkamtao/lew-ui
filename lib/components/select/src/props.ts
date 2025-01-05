import type { PropType } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'

export type SelectOptions = {
  label: string
  value: string | number
  disabled?: boolean
  isGroup?: boolean
  groupValue?: string | number
  groupLabel?: string
}

export interface SelectOptionsGroup {
  label: string
  children: SelectOptions[]
}

export type SelectSearchMethodParams = {
  options?: SelectOptions[]
  keyword?: string
}

export type SelectTrigger = 'click' | 'hover'

export const selectModel = {
  modelValue: {
    type: [String, Number, undefined] as PropType<string | number | undefined>,
    default: '',
    description: '选择器的当前值，支持双向绑定'
  }
}

export const selectProps = {
  defaultValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
    description: '选择器的默认值，用于异步加载选项时设置初始值'
  },
  options: {
    type: Array as PropType<SelectOptions[] | SelectOptionsGroup[]>,
    default: () => [],
    description: '选择器的选项列表'
  },
  trigger: {
    type: String as PropType<SelectTrigger>,
    default: 'click',
    description: '触发下拉菜单的方式，可选值为 "click" 或 "hover"'
  },
  placeholder: {
    type: String,
    default: '请选择',
    description: '选择器的占位文本'
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '尺寸',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewSelect] 尺寸: ${value}。请使用 ${validSizes.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },
  itemHeight: {
    type: Number,
    default: 38,
    description: '选项的高度（单位：像素），用于计算虚拟列表的高度'
  },
  searchable: {
    type: Boolean,
    default: false,
    description: '是否启用搜索功能'
  },
  searchMethod: {
    type: Function as PropType<
      (params: SelectSearchMethodParams) => SelectOptions[]
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
    description: '搜索延迟时间（单位：毫秒），仅在 searchable 为 true 时生效'
  },
  clearable: {
    type: Boolean,
    default: false,
    description: '是否显示清空按钮'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否将选择器设为只读状态'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用选择器'
  },
  showCheckIcon: {
    type: Boolean,
    default: true,
    description: '是否在选中项旁显示勾选图标'
  }
}
