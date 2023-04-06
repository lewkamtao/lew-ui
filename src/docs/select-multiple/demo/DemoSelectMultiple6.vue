<script setup lang="ts">
import { schools } from './schools';

const schoolsOptions = schools.map((e) => {
    return { label: e, value: e };
});
const options = ref(schoolsOptions);

const disabled = ref(true);
const value = ref('');
</script>

<template>
    <div>
        <lew-form style="width: 420px" direction="x" label-width="120px">
            <lew-form-item label="支持清空">
                <lew-select v-model="value" :options="options" clearable />
            </lew-form-item>
            <lew-form-item label="禁用">
                <lew-select
                    v-model="value"
                    :options="options"
                    :disabled="disabled"
                />
            </lew-form-item>
        </lew-form>
    </div>
</template>
