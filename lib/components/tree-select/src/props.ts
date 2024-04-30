import type { PropType } from 'vue'
import type { TreeDataSource } from '../../tree'

export type TreeSelectOptions = {
  label: string
  value: [string, number]
  labelPaths?: string[]
  keysPaths?: string[]
  level: number
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentLabelPaths?: string[]
  parentKeysPaths?: string[]
  parentChildren?: TreeSelectOptions[]
  children?: TreeSelectOptions[]
}

export type TreeSelectTriggerType = 'click' | 'hover'

export const treeSelectModel = {
  modelValue: {
    type: [String, Number, undefined],
    default: '',
    description: '绑定值'
  }
}

export type TreeSelectSearchMethodParams = {
  item?: TreeDataSource
  keyword?: string
}

export const treeSelectProps = {
  dataSource: {
    type: Array as PropType<TreeDataSource[]>,
    default: [],
    description: '配置列表'
  },
  trigger: {
    type: String,
    default: 'click',
    description: '触发方式，可选值为 click 或 hover'
  },
  placeholder: {
    type: String,
    default: '请选择',
    description: '默认提示语'
  },
  size: {
    type: String,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
  },
  searchable: {
    type: Boolean,
    default: false,
    description: '是否可搜索'
  },

  searchDelay: {
    type: Number,
    default: 250,
    description: '搜索延迟，单位毫秒'
  },
  clearable: {
    type: Boolean,
    default: false,
    description: '是否可清空'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  },
  align: {
    type: String,
    default: 'left',
    description: '对齐方式，可选值为 left、center、right'
  },
  showCheckIcon: {
    type: Boolean,
    default: true,
    description: '是否显示选中图标'
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
  defaultValue: {
    type: String,
    default: '',
    description: '默认值'
  },
  showCheckbox: {
    type: Boolean,
    default: false,
    description: '是否显示复选框'
  },
  initTree: {
    type: Function as PropType<() => void> | undefined,
    default: undefined,
    description: '初始化加载树形数据，会覆盖searchMethod方法'
  },
  onload: {
    type: Function as PropType<() => void> | undefined,
    default: undefined,
    description: '异步加载数据'
  },
  showLine: {
    type: Boolean,
    default: false,
    description: '是否显示连接线'
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
  }
}
