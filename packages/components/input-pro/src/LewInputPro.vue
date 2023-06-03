<script setup lang="ts">
import type { Options } from './props'
import { _props } from './props'

const props = defineProps(_props)
const emit = defineEmits([
  'update:modelValue',
  'clear',
  'blur',
  'focus',
  'change',
  'input',
])

const v = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    v.value = props.modelValue
  },
)

const lewDropdownRef = ref()

function input(value: string) {
  emit('update:modelValue', value)
  emit('input', value)
}

function clear() {
  emit('clear', v.value)
  v.value = ''
  emit('update:modelValue', v.value)
}

function selectFn(e: Options) {
  v.value = e.value
  emit('update:modelValue', v.value)
  emit('input', v.value)
  emit('change', v.value)
  hide()
}

function open() {
  if (props.options.length === 0)
    return
  lewDropdownRef.value.show()
}
function hide() {
  lewDropdownRef.value.hide()
}

const width = ref(0)

function focus(e: any) {
  width.value = lewDropdownRef.value.$el.clientWidth - 14
  open()
  e?.currentTarget?.select()
  emit('focus', v)
}
</script>

<template>
  <div class="lew-input-pro">
    <slot name="left" />
    <lew-dropdown
      ref="lewDropdownRef"
      style="width: 100%"
      :trigger="trigger"
      :placement="placement"
      :align="align"
      :width="`${width}px`"
      :options="options"
      @change="selectFn"
    >
      <lew-input
        v-model="v"
        :type="type"
        :auto-width="autoWidth"
        :size="size"
        :align="align"
        :placeholder="placeholder"
        :clearable="clearable"
        @click.stop
        @input="input"
        @change="emit('change', v)"
        @blur="emit('blur', v)"
        @focus="focus"
        @clear="clear"
      />
    </lew-dropdown>
    <slot name="right" />
  </div>
</template>

<style lang="scss" scoped>
.lew-input-pro {
    display: inline-flex;
    align-items: center;
    width: 100%;
    .lew-input {
        width: 100%;
    }
}
</style>
