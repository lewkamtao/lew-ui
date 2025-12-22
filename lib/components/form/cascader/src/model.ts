import type { PropType } from 'vue'

export const cascaderModel = {
  modelValue: {
    type: [String, Array, undefined] as PropType<string | string[] | undefined>,
  },
}
