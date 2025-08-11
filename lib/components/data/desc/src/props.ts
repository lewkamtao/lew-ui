import type { Property } from 'csstype'
import type { LewDescOption, LewDirection, LewSize } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validDirectionList, validSizeList, validXAlignmentList } from 'lew-ui/validators'

export const descProps = {
  options: {
    type: Array as PropType<LewDescOption[]>,
    required: true,
    typePopKeys: ['LewDescOption'],
    validator: validators.array({
      componentName: 'LewDesc',
      propName: 'options',
    }),
  },
  dataSource: {
    type: Object as PropType<Record<string, any>>,
    required: true,
    default: () => ({}),
    validator: validators.object({
      componentName: 'LewDesc',
      propName: 'dataSource',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewDesc',
      propName: 'size',
      values: validSizeList,
    }),
  },
  labelX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
    typeValues: validXAlignmentList,
    validator: validators.enum({
      componentName: 'LewDesc',
      propName: 'labelX',
      values: validXAlignmentList,
    }),
  },
  valueX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
    typeValues: validXAlignmentList,
    validator: validators.enum({
      componentName: 'LewDesc',
      propName: 'valueX',
      values: validXAlignmentList,
    }),
  },
  gap: {
    type: String as PropType<Property.Gap>,
    default: '30px',
    validator: validators.gap({
      componentName: 'LewDesc',
      propName: 'gap',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    validator: validators.widthHeight({
      componentName: 'LewDesc',
      propName: 'width',
    }),
  },
  columns: {
    type: Number as PropType<number>,
    default: 1,
    validator: validators.positiveInteger({
      componentName: 'LewDesc',
      propName: 'columns',
    }),
  },
  labelWidth: {
    type: String as PropType<Property.Width>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewDesc',
      propName: 'labelWidth',
    }),
  },
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    typeValues: validDirectionList,
    validator: validators.enum({
      componentName: 'LewDesc',
      propName: 'direction',
      values: validDirectionList,
    }),
  },
  id: {
    type: String,
    hidden: true,
    validator: validators.string({
      componentName: 'LewDesc',
      propName: 'id',
    }),
  },
  bordered: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDesc',
      propName: 'bordered',
    }),
  },
}

export const descItemProps = {
  label: {
    type: String,
    required: true,
    validator: validators.string({
      componentName: 'LewDescItem',
      propName: 'label',
    }),
  },
  field: {
    type: String,
    required: true,
    validator: validators.string({
      componentName: 'LewDescItem',
      propName: 'field',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewDescItem',
      propName: 'size',
      values: validSizeList,
    }),
  },
  bordered: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDescItem',
      propName: 'bordered',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    validator: validators.widthHeight({
      componentName: 'LewDescItem',
      propName: 'width',
    }),
  },
  labelWidth: {
    type: String as PropType<Property.Width>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewDescItem',
      propName: 'labelWidth',
    }),
  },
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    typeValues: validDirectionList,
    validator: validators.enum({
      componentName: 'LewDescItem',
      propName: 'direction',
      values: validDirectionList,
    }),
  },
  tips: {
    type: String,
    validator: validators.string({
      componentName: 'LewDescItem',
      propName: 'tips',
    }),
  },
  type: {
    type: String as PropType<'text-trim'>,
    validator: validators.enum({
      componentName: 'LewDescItem',
      propName: 'type',
      values: ['text-trim'],
    }),
  },
  labelX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
    typeValues: validXAlignmentList,
    validator: validators.enum({
      componentName: 'LewDescItem',
      propName: 'labelX',
      values: validXAlignmentList,
    }),
  },
  valueX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
    typeValues: validXAlignmentList,
    validator: validators.enum({
      componentName: 'LewDescItem',
      propName: 'valueX',
      values: validXAlignmentList,
    }),
  },
  gridArea: {
    type: String,
    validator: validators.gridArea({
      componentName: 'LewDescItem',
      propName: 'gridArea',
    }),
  },
  customRender: {
    type: null,
  },
  id: {
    type: String,
    hidden: true,
    validator: validators.string({
      componentName: 'LewDescItem',
      propName: 'id',
    }),
  },
  dataSource: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
    validator: validators.object({
      componentName: 'LewDescItem',
      propName: 'dataSource',
    }),
    hidden: true,
  },
}

export const lewDescSizePaddingMap: Record<LewSize, number> = {
  small: 14,
  medium: 20,
  large: 26,
}

export type LewDescProps = ExtractPublicPropTypes<typeof descProps>
export type LewDescItemProps = ExtractPublicPropTypes<typeof descItemProps>
