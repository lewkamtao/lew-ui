<script lang="ts" setup>
import type { LewRadioOption } from 'lew-ui/types'
import { LewFlex } from 'lew-ui'
import { object2class } from 'lew-ui/utils'
import LewRadio from './LewRadio.vue'
import { radioGroupEmits } from './emits'
import { radioGroupProps } from './props'

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)
const modelValue: Ref<string | number | undefined> = defineModel()

function change({ item }: { item: LewRadioOption }) {
  modelValue.value = item.value
  emit('change', {
    value: item.value,
    item: toRaw(item),
  })
}

const getRadioGroupClassName = computed(() => {
  const { size, disabled, readonly } = props
  return object2class('lew-radio-group', {
    size,
    disabled,
    readonly,
  })
})
</script>

<template>
  <LewFlex
    x="start"
    gap="10"
    class="lew-radio-group"
    :direction
    :class="getRadioGroupClassName"
  >
    <LewRadio
      v-for="item in options"
      :key="item.value"
      :checked="modelValue === item.value"
      :disabled="item.disabled || disabled"
      :size="size"
      :round="round"
      :block="block"
      :iconable="iconable"
      :label="item.label"
      @change="change({ item })"
    />
  </LewFlex>
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

.lew-radio-group-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}

.lew-radio-group-readonly {
  pointer-events: none;
}
</style>
