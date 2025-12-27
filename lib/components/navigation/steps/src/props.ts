import type { Property } from 'csstype'
import type { LewStepsOption, LewStepsStatus } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validStepsStatusList } from 'lew-ui/validators'

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
  canClickItem: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewSteps',
      propName: 'canClickItem',
    }),
  },
  canCrossSteps: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewSteps',
      propName: 'canCrossSteps',
    }),
  },
}

export type LewStepsProps = ExtractPublicPropTypes<typeof stepsProps>
