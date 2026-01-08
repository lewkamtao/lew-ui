import type { Property } from 'csstype'
import type { LewTagProps } from 'lew-ui'
import type { LewMenuTreeOption } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const menuTreeProps = {
  options: {
    type: Array as PropType<LewMenuTreeOption[]>,
    required: true,
    typePopKeys: ['LewMenuTreeOption'],
    validator: validators.array({
      componentName: 'LewMenuTree',
      propName: 'options',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '300px',
    validator: validators.widthHeight({
      componentName: 'LewMenuTree',
      propName: 'width',
    }),
  },
}

export const menuTreeItemProps = {
  label: {
    type: null,
  },
  icon: {
    type: null,
  },
  value: {
    type: String,
    required: true,
    validator: validators.string({
      componentName: 'LewMenuTreeItem',
      propName: 'value',
    }),
  },
  tagProps: {
    type: Object as PropType<LewTagProps>,
    validator: validators.object({
      componentName: 'LewMenuTreeItem',
      propName: 'tagProps',
    }),
  },
  level: {
    type: Number,
    default: 1,
    validator: validators.positiveInteger({
      componentName: 'LewMenuTreeItem',
      propName: 'level',
    }),
  },
  disabled: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewMenuTreeItem',
      propName: 'disabled',
    }),
  },
  isLeaf: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewMenuTreeItem',
      propName: 'isLeaf',
    }),
  },
}

export type LewMenuTreeProps = ExtractPublicPropTypes<typeof menuTreeProps>
export type LewMenuTreeItemProps = ExtractPublicPropTypes<typeof menuTreeItemProps>
