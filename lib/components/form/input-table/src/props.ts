import type { Property } from 'csstype'
import type { LewInputTableColumn, LewSize } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const inputTableModel = {
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
}

export const inputTableProps = {
  columns: {
    type: Array as PropType<LewInputTableColumn[]>,
    default: () => [
      {
        title: '标签',
        width: 100,
        field: 'label',
        as: 'input',
      },
      {
        title: '值',
        width: 100,
        field: 'value',
        as: 'input',
      },
    ],
    validator: validators.array({
      componentName: 'LewInputTable',
      propName: 'columns',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewInputTable',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '',
    validator: validators.widthHeight({
      componentName: 'LewInputTable',
      propName: 'width',
    }),
  },
  rowKey: {
    type: String,
    default: 'id',
    description: '行数据的唯一标识字段名',
    validator: validators.string({
      componentName: 'LewInputTable',
      propName: 'rowKey',
    }),
  },
  addable: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewInputTable',
      propName: 'addable',
    }),
  },
  defaultForm: {
    type: Object,
    default: {},
    description: '默认表单值',
    validator: validators.object({
      componentName: 'LewInputTable',
      propName: 'defaultForm',
    }),
  },
  deletable: {
    type: Boolean,
    default: true,
    description: '是否允许删除行',
    validator: validators.boolean({
      componentName: 'LewInputTable',
      propName: 'deletable',
    }),
  },
  maxRows: {
    type: Number,
    default: Infinity,
    description: '最大允许的行数',
    validator: validators.number({
      componentName: 'LewInputTable',
      propName: 'maxRows',
    }),
  },
  minRows: {
    type: Number,
    default: 1,
    description: '最小允许的行数',
    validator: validators.number({
      componentName: 'LewInputTable',
      propName: 'minRows',
    }),
  },
  clearable: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewInputTable',
      propName: 'clearable',
    }),
  },
  sortable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInputTable',
      propName: 'sortable',
    }),
  },
  sortTooltipCustomRender: {
    type: Function as PropType<(row: Record<string, any>) => string>,
    default: undefined,
    validator: validators.function({
      componentName: 'LewInputTable',
      propName: 'sortTooltipCustomRender',
    }),
  },
  autoUniqueId: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewInputTable',
      propName: 'autoUniqueId',
    }),
  },
  uniqueField: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewInputTable',
      propName: 'uniqueField',
    }),
  },
}

export type InputTableProps = ExtractPublicPropTypes<typeof inputTableProps>
