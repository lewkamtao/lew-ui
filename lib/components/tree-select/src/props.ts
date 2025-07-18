import type { LewSize } from 'lew-ui'
import type { PropType } from 'vue'
import type { TreeDataSource } from '../../tree'
import { validSizes } from 'lew-ui/constants'

export interface TreeSelectOptions {
  label: string
  value: string | number
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
export type TreeSelectAlign = 'left' | 'center' | 'right'

export const treeSelectModel = {
  modelValue: {
    type: [String, Number],
    default: undefined,
    description: '当前选中的值',
  },
}

export interface TreeSelectSearchMethodParams {
  item?: TreeDataSource
  keyword?: string
}

export const treeSelectProps = {
  dataSource: {
    type: Array as PropType<TreeDataSource[]>,
    default: () => [],
    description: '树形数据源',
    validator: (value: TreeDataSource[]) => {
      if (!Array.isArray(value)) {
        console.warn('[LewTreeSelect] dataSource 必须是一个数组')
        return false
      }
      return true
    },
  },
  width: {
    type: [String, Number],
    default: '240px',
    description: '选择器宽度，支持数字（单位：像素）或带单位的字符串',
  },
  defaultValue: {
    type: [String, Number],
    default: '',
    description: '默认选中值',
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    description: '占位文本',
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '组件尺寸',
    validator: (value: LewSize) => {
      if (!validSizes.includes(value)) {
        console.warn('[LewTreeSelect] size 必须是 small、medium 或 large')
        return false
      }
      return true
    },
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用',
  },
  clearable: {
    type: Boolean,
    default: false,
    description: '是否可清空',
  },
  checkable: {
    type: Boolean,
    default: false,
    description: '是否显示复选框',
  },
  showAllLevels: {
    type: Boolean,
    default: true,
    description: '是否显示完整路径',
  },
  showCheckIcon: {
    type: Boolean,
    default: true,
    description: '是否显示选中图标',
  },
  showLine: {
    type: Boolean,
    default: false,
    description: '是否显示连接线',
  },
  expandAll: {
    type: Boolean,
    default: false,
    description: '是否默认展开所有节点',
  },
  searchable: {
    type: Boolean,
    default: false,
    description: '是否可搜索',
  },
  searchDelay: {
    type: Number,
    default: 250,
    description: '搜索防抖延迟（毫秒）',
    validator: (value: number) => {
      if (value < 0) {
        console.warn('[LewTreeSelect] searchDelay 必须大于或等于 0')
        return false
      }
      return true
    },
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读',
  },
  free: {
    type: Boolean,
    default: true,
    description: '是否为自由模式（父子节点选中状态不关联）',
  },
  align: {
    type: String as PropType<TreeSelectAlign>,
    default: 'left',
    description: '文本对齐方式',
    validator: (value: TreeSelectAlign) => {
      if (!['left', 'center', 'right'].includes(value)) {
        console.warn('[LewTreeSelect] align 必须是 left、center 或 right')
        return false
      }
      return true
    },
  },
  trigger: {
    type: String as PropType<TreeSelectTriggerType>,
    default: 'click',
    description: '子菜单触发方式',
    validator: (value: TreeSelectTriggerType) => {
      if (!['click', 'hover'].includes(value)) {
        console.warn('[LewTreeSelect] trigger 必须是 click 或 hover')
        return false
      }
      return true
    },
  },
  keyField: {
    type: String,
    default: 'key',
    description: '节点标识字段名',
  },
  labelField: {
    type: String,
    default: 'label',
    description: '节点标签字段名',
  },
  disabledField: {
    type: String,
    default: 'disabled',
    description: '节点禁用状态字段名',
  },
  initOptionsMethod: {
    type: Function as PropType<() => void>,
    default: undefined,
    description: '初始化树数据的方法',
  },
  initOptionsMethodId: {
    type: String,
    default: '',
    hidden: true,
    description: '初始化选项方法函数的标识',
  },
  loadMethod: {
    type: Function as PropType<() => void>,
    default: undefined,
    description: '异步加载子节点数据的方法',
  },
}
