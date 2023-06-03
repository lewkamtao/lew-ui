<script lang="ts" setup>
import { useVModel, watchArray } from '@vueuse/core'
import { object2class } from 'lew-ui/utils'
import { checkboxGroupProps } from './checkbox'
import type { CheckboxOptions } from './checkbox'
import LewCheckbox from './LewCheckbox.vue'

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(['change', 'update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
const checkList = ref([] as any)

function change(item: CheckboxOptions, checked: boolean) {
  const _value = modelValue.value || []
  if (checked) {
    _value.push(item.value)
  }
  else {
    const index = _value.findIndex((e: any) => e === item.value)
    if (index >= 0)
      _value.splice(index, 1)
  }
  modelValue.value = _value
  emit('change', {
    value: modelValue.value,
    item,
  })
}

watchArray(modelValue.value, () => {
  initCheckbox()
})

function initCheckbox() {
  checkList.value = props.options.map((item) => {
    if (modelValue.value.includes(item.value))
      return true

    return false
  })
}

const getCheckboxGroupClassName = computed(() => {
  const { size, direction } = props
  return object2class('lew-checkbox-group', { size, direction })
})

initCheckbox()
</script>

<template>
  <lew-flex
    x="start"
    gap="15"
    :direction="direction"
    class="lew-checkbox-group"
    :class="getCheckboxGroupClassName"
  >
    <LewCheckbox
      v-for="(item, index) in options"
      :key="item.value"
      v-model="checkList[index]"
      :block="block"
      :iconable="iconable"
      :round="round"
      :size="size"
      :label="item.label"
      :disabled="item.disabled || disabled"
      @change="change(item, $event)"
    />
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-checkbox-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.lew-checkbox-group-size-small {
    min-height: var(--lew-form-item-height-small);
}

.lew-checkbox-group-size-medium {
    min-height: var(--lew-form-item-height-medium);
}

.lew-checkbox-group-size-large {
    min-height: var(--lew-form-item-height-large);
}

.lew-checkbox-group.lew-checkbox-group-direction-x {
    flex-direction: row;
}

.lew-checkbox-group.lew-checkbox-group-direction-y {
    align-items: flex-start;
    flex-direction: column;
}
</style>
