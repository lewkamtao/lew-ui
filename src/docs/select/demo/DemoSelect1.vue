<script setup lang="ts">
    import { schools } from './schools';

    const schoolsOptions = schools.map((e, i) => {
        return { label: e, value: i + 1 };
    });

    const options = ref(schoolsOptions);

    const value = ref('');
</script>

<template>
    <lew-flex style="width: 320px" direction="y">
        <lew-select v-model="value" size="small" placeholder="小" :options="options" />
        <lew-select v-model="value" size="medium" placeholder="中" :options="options" />
        <lew-select v-model="value" size="large" placeholder="大" :options="options" />
    </lew-flex>
</template>
