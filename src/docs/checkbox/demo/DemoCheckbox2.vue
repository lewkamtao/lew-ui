<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);

let value = ref([]);
</script>

<template>
    <lew-checkbox-group
        v-model="value"
        direction="y"
        round
        :options="options"
    ></lew-checkbox-group>
</template>
