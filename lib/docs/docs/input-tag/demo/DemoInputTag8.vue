<script lang="ts" setup>
const v = ref(['apple', 'banana', 'orange'])
</script>
<template>
    <lew-input-tag style="width: 320px" max-length="3" v-model="v" />
</template>
