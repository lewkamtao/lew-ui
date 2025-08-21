import type { Property } from 'csstype'
import type { LewSize, LewSliderOption } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const sliderModel = {
  modelValue: {
    type: Number,
    default: undefined,
  },
}

export const sliderProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewSlider',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
    validator: validators.widthHeight({
      componentName: 'LewDatePicker',
      propName: 'width',
    }),
  },
  min: {
    type: Number,
    default: 0,
    validator: validators.number({
      componentName: 'LewSlider',
      propName: 'min',
    }),
  },
  max: {
    type: Number,
    default: 100,
    validator: validators.number({
      componentName: 'LewSlider',
      propName: 'max',
    }),
  },
  step: {
    type: Number,
    default: 1,
    validator: validators.number({
      componentName: 'LewSlider',
      propName: 'step',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSlider',
      propName: 'readonly',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSlider',
      propName: 'disabled',
    }),
  },
  options: {
    type: Array as PropType<LewSliderOption[]>,
    validator: validators.array({
      componentName: 'LewSlider',
      propName: 'options',
    }),
    default: () => [
      {
        label: '0',
        value: 0,
      },
      {
        label: '100',
        value: 100,
      },
    ],
  },
  formatTooltip: {
    type: Function as PropType<(value: number) => string>,
    default: (value: number) => value.toString(),
    validator: validators.function({
      componentName: 'LewSlider',
      propName: 'formatTooltip',
    }),
  },
}

export type LewSliderProps = ExtractPublicPropTypes<typeof sliderProps>
