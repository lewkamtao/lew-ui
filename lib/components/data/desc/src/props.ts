import type { Property } from 'csstype'
import type { LewDescOptions, LewDirection, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'



export const descProps = {
  options: {
    type: Array as PropType<LewDescOptions[]>,
    required: true,
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
    validator: validators.size({
      componentName: 'LewDesc',
      propName: 'size',
    }),
  },
  labelX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
    validator: validators.xAlignment({
      componentName: 'LewDesc',
      propName: 'labelX',
    }),
  },
  valueX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
    validator: validators.xAlignment({
      componentName: 'LewDesc',
      propName: 'valueX',
    }),
  },
  gap: {
    type: String as PropType<string>,
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
    validator: validators.direction({
      componentName: 'LewDesc',
      propName: 'direction',
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
    validator: validators.size({
      componentName: 'LewDescItem',
      propName: 'size',
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
    validator: validators.direction({
      componentName: 'LewDescItem',
      propName: 'direction',
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
    validator: validators.xAlignment({
      componentName: 'LewDescItem',
      propName: 'labelX',
    }),
  },
  valueX: {
    type: String as PropType<Property.TextAlign>,
    default: 'start',
    validator: validators.xAlignment({
      componentName: 'LewDescItem',
      propName: 'valueX',
    }),
  },
  gridArea: {
    type: String,
    validator: validators.girdArea({
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



export type DescProps = ExtractPropTypes<typeof descProps>
export type DescItemProps = ExtractPropTypes<typeof descItemProps>
