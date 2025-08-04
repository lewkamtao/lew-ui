import type { LewSize } from 'lew-ui'
import type { PropType } from 'vue'
import validators from 'lew-ui/validators'

export interface LewTableColumn {
  title: string
  field: string
  fixed?: 'left' | 'right'
  x?: string
  y?: string
  width?: number
  columnStyle?: string
  sortable?: boolean
}

export const tableModel = {
  selectedKeys: {
    type: [Array, String, Number, undefined] as PropType<
      string[] | string | number | undefined
    >,
    default: undefined,
    validator: validators.array({
      componentName: 'LewTable',
      propName: 'selectedKeys',
    }),
  },
}

export const tableProps = {
  columns: {
    type: Array as PropType<LewTableColumn[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewTable',
      propName: 'columns',
    }),
  },
  bordered: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTable',
      propName: 'bordered',
    }),
  },
  dataSource: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewTable',
      propName: 'dataSource',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    validator: validators.size({
      componentName: 'LewTable',
      propName: 'size',
    }),
  },
  checkable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTable',
      propName: 'checkable',
    }),
  },
  sortable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTable',
      propName: 'sortable',
    }),
  },
  sortTooltipCustomRender: {
    type: Function as PropType<(row: Record<string, any>) => any>,
    default: undefined,
    validator: validators.function({
      componentName: 'LewTable',
      propName: 'sortTooltipCustomRender',
    }),
  },
  maxHeight: {
    type: [Number, String],
    default: '',
    validator: validators.widthHeight({
      componentName: 'LewTable',
      propName: 'maxHeight',
    }),
  },
  multiple: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTable',
      propName: 'multiple',
    }),
  },
  rowKey: {
    type: String,
    default: 'id',
    validator: validators.string({
      componentName: 'LewTable',
      propName: 'rowKey',
    }),
  },
}
