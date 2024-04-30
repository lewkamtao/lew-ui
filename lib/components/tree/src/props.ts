import { PropType } from 'vue'

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
    description: '值（双向绑定）'
  },
  expandedKeys: {
    type: [Array, String],
    default: [],
    description: '展开节点的 key 的集合'
  }
}

export const treeProps = {
  dataSource: {
    type: Array as PropType<TreeDataSource[]>,
    default: [],
    description: '配置项'
  },
  multiple: {
    type: Boolean,
    default: false,
    description: '多选的'
  },
  showCheckbox: {
    type: Boolean,
    default: false,
    description: '是否显示复选框'
  },
  expandAll: {
    type: Boolean,
    default: false,
    description: '默认全部展开'
  },
  free: {
    type: Boolean,
    default: true,
    description: '自由模式（是否严格的遵循父子互相关联）'
  },
  showLine: {
    type: Boolean,
    default: false,
    description: '是否显示连接线'
  },
  trigger: {
    type: String as PropType<TreeTriggerType>,
    default: 'click',
    description: '触发方式'
  },
  placeholder: {
    type: String,
    default: '请选择',
    description: '默认提示文案'
  },
  keyField: {
    type: String,
    default: 'key',
    description: '替代 TreeDataSource 中的 key 字段名，该字段值必须唯一。'
  },
  labelField: {
    type: String,
    default: 'label',
    description: '替代 TreeDataSource 中的 label 字段名'
  },
  disabledField: {
    type: String,
    default: 'disabled',
    description: '替代 TreeDataSource 中的 disabled 字段名'
  },
  initTree: {
    type: Function as PropType<() => void> | undefined,
    default: undefined,
    description: '初始化加载树形数据'
  },
  onload: {
    type: Function as PropType<(item: TreeDataSource) => void> | undefined,
    default: undefined,
    description: '异步加载数据'
  }
}
