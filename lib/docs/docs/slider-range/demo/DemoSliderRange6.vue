<script setup lang="ts">
let v = ref([-10, 40])
</script>

<template>
    <lew-slider-range
        style="width: 700px"
        v-model="v"
        max="100"
        min="-30"
        range
        :options="[
            {
                label: '极冷',
                value: -30,
            },
            {
                label: '冷 (0°C)',
                value: 0,
            },
            {
                label: '温暖 (20°C)',
                value: 20,
            },
            {
                label: '剧热 (50°C)',
                value: 50,
            },
            {
                label: '极热',
                value: 100,
            },
        ]"
        step="1"
    />
</template>
