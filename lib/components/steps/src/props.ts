import type { ExtractPropTypes } from 'vue'

export type StepsOptions = {
  title: string
  description: string
}

export type StepsStatus = 'pending' | 'loading' | 'done' | 'error' | 'warning'

export const stepsModel = {
  modelValue: {
    type: [String, Number],
    default: '',
    description: '当前激活步骤的索引值',
    validator: (value: string | number) => {
      if (typeof value !== 'string' && typeof value !== 'number') {
        console.warn('[LewSteps] modelValue 必须是字符串或数字')
        return false
      }
      return true
    }
  }
}

export const stepsProps = {
  options: {
    type: Array as PropType<StepsOptions[]>,
    default: () => [],
    description: '步骤配置项数组',
    validator: (value: StepsOptions[]) => {
      if (!Array.isArray(value)) {
        console.warn('[LewSteps] options 必须是数组')
        return false
      }
      if (
        value.some(
          (item) =>
            typeof item.title !== 'string' ||
            typeof item.description !== 'string'
        )
      ) {
        console.warn(
          '[LewSteps] options 数组中的每个项目必须包含 title 和 description 字符串属性'
        )
        return false
      }
      return true
    }
  },
  status: {
    type: String as PropType<StepsStatus>,
    default: 'pending',
    description: '步骤条的当前状态',
    validator: (value: StepsStatus) => {
      const validStatus = ['pending', 'loading', 'done', 'error', 'warning']
      if (!validStatus.includes(value)) {
        console.warn(
          `[LewSteps] status 必须是 ${validStatus.join(', ')} 中的一个`
        )
        return false
      }
      return true
    }
  },
  minWidth: {
    type: String as PropType<string>,
    default: '300px',
    description: '步骤条的最小宽度'
  }
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>
