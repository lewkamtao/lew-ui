import type { ExtractPropTypes, PropType } from 'vue'

export type TabsOptions = {
  label: string
  value: string | number
}

export type TabsSize = 'small' | 'medium' | 'large'

export type TabsType = 'block' | 'line'

export const tabsModel = {
  modelValue: {
    type: [String, Number],
    default: '',
    description: '当前选中标签的值',
    validator: (value: string | number) => {
      if (typeof value !== 'string' && typeof value !== 'number') {
        console.warn('[LewTabs] modelValue 必须是字符串或数字')
        return false
      }
      return true
    }
  }
}

export const tabsProps = {
  options: {
    type: Array as PropType<TabsOptions[]>,
    default: () => [],
    description: '标签页配置列表',
    validator: (value: TabsOptions[]) => {
      if (!Array.isArray(value)) {
        console.warn('[LewTabs] options 必须是数组')
        return false
      }
      if (
        value.some(
          (item) =>
            typeof item.label !== 'string' ||
            (typeof item.value !== 'string' && typeof item.value !== 'number')
        )
      ) {
        console.warn(
          '[LewTabs] options 数组中的每个项目必须包含 label（字符串）、value（字符串或数字）属性'
        )
        return false
      }
      return true
    }
  },
  type: {
    type: String as PropType<TabsType>,
    default: 'block',
    description: '标签页类型，可选值为 block 或 line',
    validator: (value: TabsType) => {
      const validTypes = ['block', 'line']
      if (!validTypes.includes(value)) {
        console.warn(`[LewTabs] type 必须是 ${validTypes.join('、')} 中的一个`)
        return false
      }
      return true
    }
  },
  size: {
    type: String as PropType<TabsSize>,
    default: 'medium',
    description: '标签页尺寸，可选值为 small、medium 或 large',
    validator: (value: TabsSize) => {
      const validSizes = ['small', 'medium', 'large']
      if (!validSizes.includes(value)) {
        console.warn(`[LewTabs] size 必须是 ${validSizes.join('、')} 中的一个`)
        return false
      }
      return true
    }
  },
  width: {
    type: [Number, String],
    default: '',
    description: '标签页容器宽度，可以是数字（单位：像素）或字符串（如 "50%"）',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewTabs] width 必须大于 0')
        return false
      }
      return true
    }
  },
  itemWidth: {
    type: [Number, String],
    default: '',
    description:
      '单个标签页选项宽度，可以是数字（单位：像素）或字符串（如 "50%"）',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewTabs] itemWidth 必须大于 0')
        return false
      }
      return true
    }
  },
  round: {
    type: Boolean,
    default: false,
    description: '是否使用圆角样式'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用所有标签页'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否将所有标签页设置为只读状态'
  }
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
