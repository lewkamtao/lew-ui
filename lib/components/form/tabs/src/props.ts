import type { Property } from 'csstype'
import type { LewSize, LewTabsOption, LewTabsType } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList, validTabsTypeList } from 'lew-ui/validators'

export const tabsModel = {
  modelValue: {
    type: String,
    default: '',
  },
}

export const tabsProps = {
  options: {
    type: Array as PropType<LewTabsOption[]>,
    default: () => [],
    required: true,
    validator: validators.array({
      componentName: 'LewTabs',
      propName: 'options',
    }),
  },
  type: {
    type: String as PropType<LewTabsType>,
    default: 'block',
    typeValues: validTabsTypeList,
    validator: validators.enum({
      componentName: 'LewTabs',
      propName: 'type',
      values: validTabsTypeList,
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewTabs',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewTabs',
      propName: 'width',
    }),
  },
  itemWidth: {
    type: String as PropType<Property.Width>,
    default: '',
    validator: validators.widthHeight({
      componentName: 'LewTabs',
      propName: 'itemWidth',
    }),
  },
  round: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTabs',
      propName: 'round',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTabs',
      propName: 'disabled',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewTabs',
      propName: 'readonly',
    }),
  },
}

export type TabsProps = ExtractPublicPropTypes<typeof tabsProps>
