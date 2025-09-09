import type { Property } from 'csstype'
import type { LewStepsOption, LewStepsStatus } from 'lew-ui/types'
import type { ExtractPublicPropTypes } from 'vue'
import validators, { validStepsStatusList } from 'lew-ui/validators'

export const stepsModel = {
  modelValue: {
    type: Number,
  },
}

export const stepsProps = {
  options: {
    type: Array as PropType<LewStepsOption[]>,
    typePopKeys: ['LewStepsOption'],
    required: true,
    validator: validators.array({
      componentName: 'LewSteps',
      propName: 'options',
    }),
  },
  status: {
    type: String as PropType<LewStepsStatus>,
    default: 'pending',
    typeValues: validStepsStatusList,
    validator: validators.enum({
      componentName: 'LewSteps',
      propName: 'status',
      values: validStepsStatusList,
    }),
  },
  minWidth: {
    type: String as PropType<Property.Width>,
    default: '300px',
    validator: validators.widthHeight({
      componentName: 'LewSteps',
      propName: 'minWidth',
    }),
  },
}

export type LewStepsProps = ExtractPublicPropTypes<typeof stepsProps>
