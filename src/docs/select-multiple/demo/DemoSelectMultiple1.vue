<script setup lang="ts">
import { schools } from './schools';

let schoolsOptions = schools.map((e, i) => {
    return { label: e, value: i + 1 };
});

const options = ref(schoolsOptions);

const value = ref([]);
</script>

<template>
    <div>
        <lew-form style="width: 420px" direction="x" label-width="120px">
            <lew-form-item label="小的">
                <lew-select-multiple
                    v-model="value"
                    size="small"
                    :options="options"
                    clearable
                />
            </lew-form-item>
            <lew-form-item label="常规">
                <lew-select-multiple
                    v-model="value"
                    :options="options"
                    clearable
                />
            </lew-form-item>
            <lew-form-item label="大的">
                <lew-select-multiple
                    v-model="value"
                    size="large"
                    :options="options"
                    clearable
                />
            </lew-form-item>
        </lew-form>
    </div>
</template>
