import type { PropType } from 'vue'

export interface SelectMultipleOptions {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectSearchMultipleMethodParams {
  options?: SelectMultipleOptions[]
  keyword?: string
}

export const selectMultipleProps = {
  modelValue: {
    type: (Array as PropType<string[] | number[]>) || undefined,
  },
  options: {
    type: Array as PropType<SelectMultipleOptions[]>,
    default() {
      return []
    },
  },
  trigger: {
    type: String,
    default: 'click',
    validator(value: string) {
      return ['click', 'hover'].includes(value)
    },
  },
  labelSlot: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  size: {
    type: String,
    default: 'medium',
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: '',
  },
  searchMethod: {
    type: Function as PropType<
            (e: SelectSearchMultipleMethodParams) => void
        >,
    default: (params: SelectSearchMultipleMethodParams) => {
      const { options, keyword } = params
      if (options && keyword) {
        const reslut = options.filter((e) => {
          return keyword && e.label.includes(keyword)
        })
        return reslut
      }
      return []
    },
  },
  searchDelay: {
    type: Number,
    default: 250,
  },
  clearable: {
    type: Boolean,
    default: () => false,
  },
  readonly: {
    type: Boolean,
    default: () => false,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  itemHeight: {
    type: Number,
    default: 30,
  },
  align: {
    type: String,
    default: 'left',
  },
  showCheckIcon: {
    type: Boolean,
    default: () => true,
  },
  defaultValue: {
    type: String,
    default: '',
  },
}
