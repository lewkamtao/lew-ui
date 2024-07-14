<script setup lang="ts">
import SetFormItem from './SetFormItem.vue'

defineProps({
  options: {
    type: Array as PropType<any>,
    default: () => []
  }
})

const form: any = defineModel()
</script>

<template>
  <div class="set-form">
    <set-form-item v-for="item in options" v-model="form[item.field]" v-bind="{ ...item }" />
  </div>
</template>

<style lang="scss" scoped>
.set-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
