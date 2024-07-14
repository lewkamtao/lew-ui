<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'medium'
  },
  options: {
    type: Array as PropType<any>
  }
})
</script>

<template>
  <div ref="formLabelRef" class="lew-form-label-box">
    <span
      :style="{
        fontSize: `var(--lew-form-font-size-${size})`
      }"
      v-for="(item, index) in options"
      :key="index"
      >{{ item.label }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.lew-form-label-box {
  position: fixed;
  width: auto;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #000;
  padding-left: 20px;
  z-index: -99;
  opacity: 0;
  left: -200vw;
  span {
    flex-shrink: 0;
    display: inline;
  }
}
</style>
