import type { Property } from 'csstype'
import type { LewSize, LewTreeDataSource, LewTrigger } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList, validTriggerList } from 'lew-ui/validators'

export const treeSelectModel = {
  modelValue: {
    type: String,
    default: undefined,
  },
}

export const treeSelectProps = {
  dataSource: {
    type: Array as PropType<LewTreeDataSource[]>,
    typePopKeys: ['LewTreeDataSource'],
    validator: validators.array({
      componentName: 'LewTreeSelect',
      propName: 'dataSource',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
    validator: validators.widthHeight({
      componentName: 'LewTreeSelect',
      propName: 'width',
    }),
  },
  defaultValue: {
    type: String,
    validator: validators.string({
      componentName: 'LewTreeSelect',
      propName: 'defaultValue',
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewTreeSelect',
      propName: 'placeholder',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewTreeSelect',
      propName: 'size',
      values: validSizeList,
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'disabled',
    }),
  },
  clearable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'clearable',
    }),
  },
  checkable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'checkable',
    }),
  },
  showAllLevels: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'showAllLevels',
    }),
  },
  showCheckIcon: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'showCheckIcon',
    }),
  },
  showLine: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'showLine',
    }),
  },
  expandAll: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'expandAll',
    }),
  },
  searchable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'searchable',
    }),
  },
  searchDelay: {
    type: Number,
    default: 250,
    validator: validators.number({
      componentName: 'LewTreeSelect',
      propName: 'searchDelay',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'readonly',
    }),
  },
  free: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewTreeSelect',
      propName: 'free',
    }),
  },
  trigger: {
    type: String as PropType<LewTrigger>,
    default: 'click',
    typeValues: validTriggerList,
    validator: validators.enum({
      componentName: 'LewTreeSelect',
      propName: 'trigger',
      values: validTriggerList,
    }),
  },
  keyField: {
    type: String,
    default: 'key',
    validator: validators.string({
      componentName: 'LewTreeSelect',
      propName: 'keyField',
    }),
  },
  labelField: {
    type: String,
    default: 'label',
    validator: validators.string({
      componentName: 'LewTreeSelect',
      propName: 'labelField',
    }),
  },
  disabledField: {
    type: String,
    default: 'disabled',
    validator: validators.string({
      componentName: 'LewTreeSelect',
      propName: 'disabledField',
    }),
  },
  initMethod: {
    type: Function as PropType<() => void>,
    default: undefined,
    validator: validators.function({
      componentName: 'LewTreeSelect',
      propName: 'initMethod',
    }),
  },
  initMethodId: {
    type: String,
    validator: validators.string({
      componentName: 'LewTreeSelect',
      propName: 'initMethodId',
    }),
  },
  loadMethod: {
    type: Function as PropType<() => void>,
    default: undefined,
    validator: validators.function({
      componentName: 'LewTreeSelect',
      propName: 'loadMethod',
    }),
  },
}

export type LewTreeSelectProps = ExtractPublicPropTypes<typeof treeSelectProps>
