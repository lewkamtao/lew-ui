import type { PropType } from 'vue'

export interface TreeDataSource {
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
    description: '树组件的选中值，支持v-model双向绑定',
  },
  expandedKeys: {
    type: [Array, String],
    default: [],
    description: '展开节点的key集合',
  },
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
    },
  },
  height: {
    type: String,
    default: '100%',
    description: '树组件的高度',
  },
  multiple: {
    type: Boolean,
    default: false,
    description: '是否允许多选',
  },
  checkable: {
    type: Boolean,
    default: false,
    description: '是否显示选框',
  },
  searchable: {
    type: Boolean,
    default: false,
    description: '是否显示搜索框',
  },
  expandAll: {
    type: Boolean,
    default: false,
    description: '是否默认展开所有节点',
  },
  free: {
    type: Boolean,
    default: true,
    description: '是否为自由模式（不严格遵循父子节点关联）',
  },
  showLine: {
    type: Boolean,
    default: false,
    description: '是否显示连接线',
  },
  keyField: {
    type: String,
    default: 'key',
    description: '指定作为唯一标识的字段名',
  },
  labelField: {
    type: String,
    default: 'label',
    description: '指定作为显示文本的字段名',
  },
  disabledField: {
    type: String,
    default: 'disabled',
    description: '指定作为禁用状态的字段名',
  },
  initMethod: {
    type: Function as PropType<() => void>,
    default: undefined,
    description: '初始化树形数据的方法',
  },
  loadMethod: {
    type: Function as PropType<(item: TreeDataSource) => void>,
    default: undefined,
    description: '异步加载子节点数据的方法',
  },
  isSelect: {
    type: Boolean,
    default: false,
    hidden: true,
    description: '是否作为选择器使用',
  },
}

export const treeItemProps = {
  label: {
    type: null,
    default: undefined,
    description:
      '菜单树项的标题文本。也可以使用具名插槽 "label" 自定义标题内容。',
  },
  __key: {
    type: [String, Number],
    required: true,
    description: '菜单树项的唯一标识符。',
    validator(value: string | number): boolean {
      if (value === '') {
        console.warn('[LewTreeItem] key 不能为空。')
        return false
      }
      return true
    },
  },
  icon: {
    type: Function as PropType<() => any>,
    default: undefined,
    description: '菜单树项的图标。',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '菜单树项是否禁用。',
  },
  level: {
    type: Number,
    default: 1,
    description: '菜单树项的层级，从 1 开始。',
  },
  isLeaf: {
    type: Boolean,
    default: false,
    description: '是否为叶子节点。',
  },
  extend: {
    type: Object,
    default: () => {},
    description: '扩展数据。',
  },
}
