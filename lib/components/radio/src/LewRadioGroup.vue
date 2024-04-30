<script lang="ts" setup>
import { radioGroupProps } from './props'
import type { RadioOptions } from './props'
import { object2class } from 'lew-ui/utils'
import LewRadio from './LewRadio.vue'

const emit = defineEmits(['change'])
const props = defineProps(radioGroupProps)
const modelValue: Ref<string | number | undefined> = defineModel<string | number | undefined>()

const change = ({ item }: { item: RadioOptions }) => {
  console.log('change', item)
  modelValue.value = item.value
  emit('change', {
    value: item.value,
    item: toRaw(item)
  })
}

const getRadioGroupClassName = computed(() => {
  const { size, direction, disabled, readonly } = props
  return object2class('lew-radio-group', { size, direction, disabled, readonly })
})
</script>

<template>
  <lew-flex x="start" gap="15" class="lew-radio-group" :class="getRadioGroupClassName">
    <lew-radio
      v-for="item in options"
      :key="item.value"
      :block="block"
      :iconable="iconable"
      :label="item.label"
      :disabled="item.disabled || disabled"
      :size="size"
      :checked="modelValue === item.value"
      @change="change({ item })"
    />
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-radio-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.lew-radio-group-size-small {
  min-height: var(--lew-form-item-height-small);
}

.lew-radio-group-size-medium {
  min-height: var(--lew-form-item-height-medium);
}

.lew-radio-group-size-large {
  min-height: var(--lew-form-item-height-large);
}

.lew-radio-group.lew-radio-group-direction-x {
  flex-direction: row;
}

.lew-radio-group.lew-radio-group-direction-y {
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
}
.lew-radio-group-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}
.lew-radio-group-readonly {
  pointer-events: none;
}
</style>
