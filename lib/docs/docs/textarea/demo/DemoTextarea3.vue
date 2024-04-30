<script setup lang="ts">
const value = ref('')
const ok = () => {
  LewMessage.success('提交成功')
}
</script>

<template>
  <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
    <lew-textarea v-model="value" placeholder="可清空的" :maxLength="300" showCount clearable />
    <lew-textarea
      v-model="value"
      placeholder="只读"
      :maxLength="300"
      showCount
      readonly
      clearable
    />
    <lew-textarea
      v-model="value"
      placeholder="禁用"
      :maxLength="300"
      showCount
      disabled
      clearable
    />
    <lew-textarea
      v-model="value"
      placeholder="按enter触发"
      :maxLength="300"
      showCount
      clearable
      okByEnter
      @ok="ok"
    />
  </lew-flex>
</template>
