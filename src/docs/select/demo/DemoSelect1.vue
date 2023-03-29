<script setup lang="ts">
import { schools } from './schools';

const schoolsOptions = schools.map((e) => {
    return { label: e, value: e };
});
const options = ref(schoolsOptions);

const value = ref('');

const searchFn = (event: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let res = options.value.filter(
                (e) => e.label.indexOf(event.keyword) >= 0
            );
            resolve(res);
        }, 500);
    });
};
</script>

<template>
    <div>
        <lew-form style="width: 350px" direction="x" label-width="80px">
            <lew-form-item label="小的">
                <LewSelect
                    searchable
                    v-model="value"
                    size="small"
                    :options="options"
                ></LewSelect>
            </lew-form-item>
            <lew-form-item label="常规">
                <LewSelect
                    searchable
                    search-mode="custom"
                    :search-method="searchFn"
                    v-model="value"
                    :options="options"
                ></LewSelect>
            </lew-form-item>
            <lew-form-item label="大的">
                <LewSelect
                    v-model="value"
                    size="large"
                    :options="options"
                ></LewSelect>
            </lew-form-item>
            <lew-form-item label="Hover">
                <LewSelect
                    v-model="value"
                    :options="options"
                    trigger="hover"
                ></LewSelect>
            </lew-form-item>
        </lew-form>
    </div>
</template>
