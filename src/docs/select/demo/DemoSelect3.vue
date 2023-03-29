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
            console.log(res);

            resolve(res);
        }, 500);
    });
};
</script>

<template>
    <div>
        <lew-form style="width: 350px" direction="x" label-width="80px">
            <lew-form-item label="默认过滤">
                <lew-select
                    searchable
                    v-model="value"
                    :options="options"
                ></lew-select>
            </lew-form-item>

            <lew-form-item label="模拟请求">
                <lew-select
                    searchable
                    search-mode="custom"
                    :search-method="searchFn"
                    v-model="value"
                    :options="options"
                />
            </lew-form-item>
        </lew-form>
    </div>
</template>
