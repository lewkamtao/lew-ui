<script setup lang="ts">
import { any2px } from 'lew-ui/utils'
import { LewInput, LewSelect, LewDatePicker, LewTabs, LewSwitch } from 'lew-ui'

const props = defineProps({
  as: {
    type: String,
    default: 'input'
  },
  label: {
    type: String,
    default: ''
  },
  field: {
    type: String,
    default: ''
  },
  componentWidth: {
    type: [String, Number]
  },
  props: {
    type: Object
  }
})

const modelValue = defineModel()

const asMap: Record<string, any> = {
  input: LewInput,
  select: LewSelect,
  'date-picker': LewDatePicker,
  tabs: LewTabs,
  switch: LewSwitch
}
</script>

<template>
  <div class="set-form-item">
    <label v-if="as">
      {{ label || '标签' }}
    </label>
    <div :style="{ width: any2px(props?.componentWidth) }" class="lew-form-item-main">
      <component v-model="modelValue" :is="asMap[as]" v-bind="{ ...props.props, size: 'small' }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.set-form-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    white-space: nowrap;
  }
}
</style>
