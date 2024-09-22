import type { PropType } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'

interface InputTableColumn {
  title: string
  width?: number
  field: string
  as: string
}

export const inputTableModel = {
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => [],
    description: '表格数据，支持双向绑定'
  }
}

export const inputTableProps = {
  columns: {
    type: Array as PropType<InputTableColumn[]>,
    default: () => [
      {
        title: '标签',
        width: 100,
        field: 'label',
        as: 'input'
      },
      {
        title: '值',
        width: 100,
        field: 'value',
        as: 'input'
      }
    ],
    description: '表格列配置',
    validator(value: InputTableColumn[]): boolean {
      if (!Array.isArray(value) || value.length === 0) {
        console.warn('[LewInputTable] columns 必须是非空数组')
        return false
      }
      return true
    }
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '表格尺寸',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewInputTable] size 必须是 ${validSizes.join('、')} 之一`
        )
        return false
      }
      return true
    }
  },
  width: {
    type: [Number, String],
    default: '',
    description: '表格宽度',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewInputTable] width 必须大于 0')
        return false
      }
      return true
    }
  },
  rowKey: {
    type: String,
    default: 'id',
    description: '行数据的唯一标识字段名',
    validator(value: string): boolean {
      if (!value) {
        console.warn('[LewInputTable] rowKey 不能为空')
        return false
      }
      return true
    }
  },
  batchDeletable: {
    type: Boolean,
    default: true,
    description: '是否显示批量删除功能'
  },
  // 添加新行
  addable: {
    type: Boolean,
    default: true,
    description: '是否允许添加新行'
  },
  defaultForm: { type: Object, default: {}, description: '默认表单值' },
  // 删除行
  deletable: {
    type: Boolean,
    default: true,
    description: '是否允许删除行'
  },
  // 最大行数
  maxRows: {
    type: Number,
    default: Infinity,
    description: '最大允许的行数',
    validator(value: number): boolean {
      if (value < 1) {
        console.warn('[LewInputTable] maxRows 必须大于等于 1')
        return false
      }
      return true
    }
  },
  // 最小行数
  minRows: {
    type: Number,
    default: 0,
    description: '最小允许的行数',
    validator(value: number): boolean {
      if (value < 1) {
        console.warn('[LewInputTable] minRows 必须大于等于 1')
        return false
      }
      return true
    }
  },
  clearable: {
    type: Boolean,
    default: true,
    description: '是否显示清空按钮'
  },
  //  排序
  sortable: {
    type: Boolean,
    default: true,
    description: '是否启用排序功能'
  },
  autoUniqueId: {
    type: Boolean,
    default: true,
    description: '是否自动生成行数据唯一标识'
  },
  uniqueField: {
    type: String,
    default: '',
    description: '指定一个不可重复的字段，用于添加数据时检查重复'
  }
}
