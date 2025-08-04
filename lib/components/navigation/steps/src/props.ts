import type { Property } from 'csstype'
import type { LewStatus, LewStepsOptions } from 'lew-ui/types'
import type { ExtractPropTypes } from 'vue'
import validators from 'lew-ui/validators'

export const stepsModel = {
  modelValue: {
    type: Number,
  },
}

export const stepsProps = {
  options: {
    type: Array as PropType<LewStepsOptions[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewSteps',
      propName: 'options',
    }),
  },
  status: {
    type: String as PropType<LewStatus>,
    default: 'pending',
    validator: validators.enum({
      componentName: 'LewSteps',
      propName: 'status',
      values: ['pending', 'loading', 'done', 'error', 'warning'],
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

export type StepsProps = ExtractPropTypes<typeof stepsProps>
