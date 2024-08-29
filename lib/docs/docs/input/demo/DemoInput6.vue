<script setup lang="ts">
const v = ref('这是宽度自适应的输入框')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="v" size="small" autoWidth clearable />
    <lew-input v-model="v" size="medium" autoWidth clearable />
    <lew-input v-model="v" size="large" autoWidth clearable />
    <lew-input v-model="v" size="small" autoWidth clearable show-count />
    <lew-input v-model="v" size="medium" autoWidth clearable show-count />
    <lew-input v-model="v" size="large" autoWidth clearable show-count />
    <lew-input v-model="v" size="small" autoWidth clearable show-count max-length="30" />
    <lew-input v-model="v" size="medium" autoWidth clearable show-count max-length="30" />
    <lew-input v-model="v" size="large" autoWidth clearable show-count max-length="30" />
  </lew-flex>
</template>
