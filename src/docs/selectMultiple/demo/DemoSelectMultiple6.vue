<script setup lang="ts">
import { schools } from './schools';

const schoolsOptions = schools.map((e) => {
    return { label: e, value: e };
});
const options = ref(schoolsOptions);

const disabled = ref(true);
const value = ref([]);
</script>

<template>
    <lew-flex style="width: 320px" direction="y">
        <lew-select-multiple
            v-model="value"
            :options="options"
            clearable
            placeholder="支持清空"
        />
        <lew-select-multiple
            v-model="value"
            :options="options"
            placeholder="只读"
            readonly
        />
        <lew-select-multiple
            v-model="value"
            :options="options"
            :disabled="disabled"
            placeholder="禁用"
        />
    </lew-flex>
</template>
