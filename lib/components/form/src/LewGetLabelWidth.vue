<script setup lang="ts">
import RequiredIcon from './RequiredIcon.vue'
import { requiredIconSizeMap } from './props'
import type { LewSize } from 'lew-ui'
import { LewFlex } from 'lew-ui'

defineProps({
  size: {
    type: String as PropType<LewSize>,
    default: 'medium'
  },
  options: {
    type: Array as PropType<any>
  }
})

const formLabelRef = ref<HTMLDivElement>()

const getWidth = () => {
  return formLabelRef.value?.offsetWidth
}

defineExpose({
  getWidth
})
</script>

<template>
  <div ref="formLabelRef" class="lew-get-label-width-box">
    <lew-flex
      gap="5"
      :style="{
        fontSize: `var(--lew-form-font-size-${size})`
      }"
      v-for="(item, index) in options"
      :key="index"
    >
      <RequiredIcon
        :size="requiredIconSizeMap[size]"
        v-if="item.required && item.label"
      />
      {{ item.label }}
    </lew-flex>
  </div>
</template>

<style lang="scss" scoped>
.lew-get-label-width-box {
  position: fixed;
  width: auto;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: -99;
  opacity: 0;
}
</style>
