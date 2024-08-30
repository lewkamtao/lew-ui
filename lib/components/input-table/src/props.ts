import type { PropType } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'

interface InputTableColumn {
  title: string;
  width?: number;
  field: string;
  as: string;
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
        title: '标题',
        width: 120,
        field: 'label',
        as: 'input'
      },
      {
        title: '值',
        width: 120,
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
        console.warn(`[LewInputTable] size 必须是 ${validSizes.join('、')} 之一`)
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
  batchDelete: {
    type: Boolean,
    default: false,
    description: '是否显示批量删除功能'
  },
  autoUniqueId: {
    type: Boolean,
    default: true,
    description: '是否自动生成行数据唯一标识'
  }
}
