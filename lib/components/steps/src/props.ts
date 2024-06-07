import type { ExtractPropTypes, PropType } from 'vue'

export type StepsOptions = {
  title: string
  description: string
}

export type StepsStatus = 'pending' | 'done' | 'error' | 'warning'

export const stepsModel = {
  modelValue: {
    type: [String, Number, undefined],
    default: '',
    description: '绑定值'
  }
}
export const stepsProps = {
  options: {
    type: Array as PropType<StepsOptions[]>,
    default: [],
    description: '类型'
  },
  status: {
    type: String as PropType<StepsStatus>,
    default: '',
    description: '状态'
  }
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>
