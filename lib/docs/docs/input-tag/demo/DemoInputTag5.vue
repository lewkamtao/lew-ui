<script lang="ts" setup>
const v = ref(['小明', '小红', '小刚'])
</script>

<template>
  <lew-input-tag v-model="v" style="width: 320px" clearable />
</template>
