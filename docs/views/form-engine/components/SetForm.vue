<script setup lang="ts">
import SetFormItem from './SetFormItem.vue'

defineProps({
  options: {
    type: Array as PropType<any>,
    default: () => [],
  },
  collapseHeight: {
    type: Number,
    default: 0,
  },
})

const form: any = defineModel({ default: {} })
</script>

<template>
  <lew-expand :collapse-height>
    <div class="set-form">
      <SetFormItem
        v-for="item in options"
        :key="item.field"
        v-model="form[item.field]"
        v-bind="{ ...item }"
      />
    </div>
  </lew-expand>
</template>

<style lang="scss" scoped>
.set-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0px 15px;
  gap: 10px;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.25s;
}
</style>
