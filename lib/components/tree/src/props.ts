import type { PropType } from 'vue'

export type TreeDataSource = {
  label: string
  key: string
  level: number
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentKey?: string | number
  treeIndex?: number
  labelPaths?: string[]
  valueKeys?: string[]
  parentKeyPaths?: string[]
  parentLabelPaths?: string[]
  allNodeValues: string[]
  leafNodeValues: string[]
  children?: TreeDataSource[]
}

export type TreeTriggerType = 'click' | 'hover'

export const treeModel = {
  modelValue: {
    type: [Array, String],
    default: [],
    description: '树组件的选中值，支持v-model双向绑定'
  },
  expandedKeys: {
    type: [Array, String],
    default: [],
    description: '展开节点的key集合'
  }
}

export const treeProps = {
  dataSource: {
    type: Array as PropType<TreeDataSource[]>,
    default: () => [],
    description: '树组件的数据源',
    validator: (value: TreeDataSource[]) => {
      if (!Array.isArray(value)) {
        console.warn('[LewTree] dataSource必须是一个数组')
        return false
      }
      return true
    }
  },
  multiple: {
    type: Boolean,
    default: false,
    description: '是否允许多选'
  },
  showCheckbox: {
    type: Boolean,
    default: false,
    description: '是否显示复选框'
  },
  expandAll: {
    type: Boolean,
    default: false,
    description: '是否默认展开所有节点'
  },
  free: {
    type: Boolean,
    default: true,
    description: '是否为自由模式（不严格遵循父子节点关联）'
  },
  showLine: {
    type: Boolean,
    default: false,
    description: '是否显示连接线'
  },
  trigger: {
    type: String as PropType<TreeTriggerType>,
    default: 'click',
    description: '节点展开收起的触发方式',
    validator: (value: TreeTriggerType) => {
      if (!['click', 'hover'].includes(value)) {
        console.warn('[LewTree] trigger必须是 "click" 或 "hover"')
        return false
      }
      return true
    }
  },
  placeholder: {
    type: String,
    default: '请选择',
    description: '选择框默认文本'
  },
  keyField: {
    type: String,
    default: 'key',
    description: '指定作为唯一标识的字段名'
  },
  labelField: {
    type: String,
    default: 'label',
    description: '指定作为显示文本的字段名'
  },
  disabledField: {
    type: String,
    default: 'disabled',
    description: '指定作为禁用状态的字段名'
  },
  initTree: {
    type: Function as PropType<() => void>,
    default: undefined,
    description: '初始化树形数据的方法'
  },
  onload: {
    type: Function as PropType<(item: TreeDataSource) => void>,
    default: undefined,
    description: '异步加载子节点数据的方法'
  },
  isSelect: {
    type: Boolean,
    default: false,
    description: '是否作为选择器使用'
  }
}
