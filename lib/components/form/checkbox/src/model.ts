export const checkboxModel = {
  modelValue: {
    type: Boolean,
    default: false,
  },
}

export const checkboxGroupModel = {
  modelValue: {
    type: Array,
    default: () => [],
    required: true,
  },
}
