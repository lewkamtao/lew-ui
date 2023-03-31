<script setup lang="ts">
import { schools } from './schools';

const schoolsOptions = schools.map((e) => {
    return { label: e, value: e };
});
const options = ref(schoolsOptions);

const value = ref('');
</script>

<template>
    <div>
        <lew-form style="width: 420px" direction="x" label-width="120px">
            <lew-form-item label="小的">
                <lew-select v-model="value" size="small" :options="options" />
            </lew-form-item>
            <lew-form-item label="常规">
                <lew-select v-model="value" :options="options" />
            </lew-form-item>
            <lew-form-item label="大的">
                <lew-select v-model="value" size="large" :options="options" />
            </lew-form-item>
        </lew-form>
    </div>
</template>
