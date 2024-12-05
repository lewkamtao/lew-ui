import type { PropType } from 'vue'
import type { LewSize } from 'lew-ui'

export type CascaderOptions = {
  label: string
  value: string
  labelPaths?: string[]
  valuePaths?: string[]
  level: number
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentLabelPaths?: string[]
  parentValuePaths?: string[]
  children?: CascaderOptions[]
}

export type CascaderTriggerType = 'click' | 'hover'

export const cascaderModel = {
  modelValue: {
    type: [String, Number],
    default: '',
    description: '当前选中的值'
  }
}

export const cascaderProps = {
  modelValue: {
    type: [String, Number],
    default: '',
    description: '当前选中的值'
  },
  options: {
    type: Array as PropType<CascaderOptions[]>,
    default: () => [],
    description: '可选项数据源',
    validator: (value: CascaderOptions[]) => {
      if (!Array.isArray(value)) {
        console.warn('[LewCascader] options 必须是一个数组')
        return false
      }
      return true
    }
  },
  placeholder: {
    type: String,
    default: '请选择',
    description: '输入框占位文本'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  },
  clearable: {
    type: Boolean,
    default: true,
    description: '是否可清空'
  },
  showAllLevels: {
    type: Boolean,
    default: true,
    description: '是否显示完整的选中值路径'
  },
  multiple: {
    type: Boolean,
    default: false,
    description: '是否多选'
  },
  free: {
    type: Boolean,
    default: false,
    description: '是否启用自由选择模式'
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '尺寸',
    validator: (value: string) => {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  trigger: {
    type: String as PropType<CascaderTriggerType>,
    default: 'click',
    description: '次级菜单的展开方式',
    validator: (value: string) => {
      return ['click', 'hover'].includes(value)
    }
  },
  loadMethod: {
    type: Function,
    description: '动态加载子节点数据的函数'
  },
  loadMethodId: {
    type: String,
    default: '',
    hidden: true,
    description: '动态加载子节点数据函数的标识'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  }
}
