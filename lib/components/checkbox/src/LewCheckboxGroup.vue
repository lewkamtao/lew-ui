<script lang="ts" setup>
import { checkboxGroupProps } from './props'
import type { CheckboxOptions } from './props'
import { object2class } from 'lew-ui/utils'
import { LewCheckbox } from 'lew-ui'
import { cloneDeep } from 'lodash-es'

const props = defineProps(checkboxGroupProps as any)
const emit = defineEmits(['change'])
const modelValue: Ref<String[] | Number[] | undefined> = defineModel({
  default: () => [],
  required: true
})

const checkList = ref([] as boolean[])

watch(
  () => modelValue.value,
  () => {
    initCheckbox()
  },
  {
    deep: true // 开启深度监听
  }
)

const change = ({ item, checked }: { item: CheckboxOptions; checked: boolean }) => {
  let _value = modelValue.value || []
  if (checked) {
    _value.push(item.value as string & number)
  } else {
    const index = _value.findIndex((e) => e === item.value)
    if (index >= 0) {
      _value.splice(index, 1)
    }
  }
  emit('change', {
    value: cloneDeep(_value),
    item
  })
  modelValue.value = cloneDeep(_value)
}

const initCheckbox = () => {
  checkList.value = props.options.map((item: CheckboxOptions) => {
    if (modelValue.value && modelValue.value.includes(item.value as string & number)) {
      return true
    }
    return false
  })
}

const getCheckboxGroupClassName = computed(() => {
  const { size, direction, readonly, disabled } = props as any
  return object2class('lew-checkbox-group', {
    size,
    direction,
    readonly,
    disabled
  })
})

initCheckbox()
</script>
<template>
  <lew-flex
    x="start"
    gap="10"
    :direction="direction"
    class="lew-checkbox-group"
    :class="getCheckboxGroupClassName"
  >
    <lew-checkbox
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
.lew-checkbox-group-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}
.lew-checkbox-group-readonly {
  pointer-events: none;
}
</style>
