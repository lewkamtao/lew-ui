import type { LewTreeDataSource } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const treeModel = {
  modelValue: {
    type: [Array, String],
    default: [],
  },
  expandedKeys: {
    type: [Array, String],
    default: [],
  },
}

export const treeProps = {
  dataSource: {
    type: Array as PropType<LewTreeDataSource[]>,
    typePopKeys: ['LewTreeDataSource'],
    validator: validators.array({
      componentName: 'LewTree',
      propName: 'dataSource',
    }),
  },
  height: {
    type: String,
    default: '100%',
    validator: validators.widthHeight({
      componentName: 'LewTree',
      propName: 'height',
    }),
  },
  multiple: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTree',
      propName: 'multiple',
    }),
  },
  checkable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTree',
      propName: 'checkable',
    }),
  },
  searchable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTree',
      propName: 'searchable',
    }),
  },
  expandAll: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTree',
      propName: 'expandAll',
    }),
  },
  free: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTree',
      propName: 'free',
    }),
  },
  showLine: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTree',
      propName: 'showLine',
    }),
  },
  keyField: {
    type: String,
    default: 'key',
    validator: validators.string({
      componentName: 'LewTree',
      propName: 'keyField',
    }),
  },
  labelField: {
    type: String,
    default: 'label',
    validator: validators.string({
      componentName: 'LewTree',
      propName: 'labelField',
    }),
  },
  disabledField: {
    type: String,
    default: 'disabled',
    validator: validators.string({
      componentName: 'LewTree',
      propName: 'disabledField',
    }),
  },
  initMethod: {
    type: Function as PropType<() => void>,
    validator: validators.function({
      componentName: 'LewTree',
      propName: 'initMethod',
    }),
  },
  loadMethod: {
    type: Function as PropType<(item: LewTreeDataSource) => void>,
    validator: validators.function({
      componentName: 'LewTree',
      propName: 'loadMethod',
    }),
  },
  isSelect: {
    type: Boolean,
    default: false,
    hidden: true,
    validator: validators.boolean({
      componentName: 'LewTree',
      propName: 'isSelect',
    }),
  },
  onlyLeafSelectable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTree',
      propName: 'onlyLeafSelectable',
    }),
  },
}

export const treeItemProps = {
  label: {
    type: null,
  },
  __key: {
    type: String,
    required: true,
    validator: validators.string({
      componentName: 'LewTreeItem',
      propName: '__key',
    }),
  },
  icon: {
    type: null,
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeItem',
      propName: 'disabled',
    }),
  },
  level: {
    type: Number,
    default: 1,
    validator: validators.number({
      componentName: 'LewTreeItem',
      propName: 'level',
    }),
  },
  isLeaf: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeItem',
      propName: 'isLeaf',
    }),
  },
  extend: {
    type: Object,
    default: () => { },
    validator: validators.object({
      componentName: 'LewTreeItem',
      propName: 'extend',
    }),
  },
}

export type LewTreeProps = ExtractPublicPropTypes<typeof treeProps>
