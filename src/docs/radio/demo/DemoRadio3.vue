<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
    { name: '宋朝', id: 1 },
    { name: '唐朝', id: 2 },
    { name: '明朝', id: 3 },
    { name: '清朝', id: 4 },
]);

let value = ref();
</script>

<template>
    <lew-flex direction="column" x="start">
        <lew-title size="14px">无图标</lew-title>
        <lew-radiobox-group
            v-model="value"
            block
            :iconable="false"
            :options="options"
        ></lew-radiobox-group>
        <br />
        <br />
        <lew-title size="14px">有图标</lew-title>
        <lew-radiobox-group
            v-model="value"
            block
            :options="options"
        ></lew-radiobox-group>
    </lew-flex>
</template>
