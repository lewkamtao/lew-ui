<script lang="ts" setup>
import type { LewCheckboxOptions } from 'lew-ui'
import { LewCheckbox, LewFlex } from 'lew-ui'
import { object2class } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { checkboxGroupProps } from './props'

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(['change'])
const modelValue: Ref<string[] | number[] | undefined> = defineModel({
  default: () => [],
  required: true,
})

const checkList = ref([] as boolean[])

watch(
  () => modelValue.value,
  () => {
    initCheckbox()
  },
  {
    deep: true, // 开启深度监听
  },
)

function change({ item, checked }: { item: LewCheckboxOptions, checked: boolean }) {
  const _value = modelValue.value || []
  if (checked) {
    _value.push(item.value as string & number)
  }
  else {
    const index = _value.findIndex((e: any) => e === item.value)
    if (index >= 0) {
      _value.splice(index, 1)
    }
  }
  emit('change', {
    value: cloneDeep(_value),
    item,
  })
  modelValue.value = cloneDeep(_value)
}

function initCheckbox() {
  checkList.value = props.options.map((item: LewCheckboxOptions) => {
    if (modelValue.value && modelValue.value.includes(item.value as string & number)) {
      return true
    }
    return false
  })
}

const getCheckboxGroupClassName = computed(() => {
  const { size, readonly, disabled } = props as any
  return object2class('lew-checkbox-group', {
    size,
    readonly,
    disabled,
  })
})

initCheckbox()
</script>

<template>
  <LewFlex
    x="start"
    gap="10"
    wrap
    :direction
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
      @change="change({ item, checked: $event })"
    />
  </LewFlex>
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

.lew-checkbox-group-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}
.lew-checkbox-group-readonly {
  pointer-events: none;
}
</style>
