<script setup lang="ts">
import { schools } from './schools';

let schoolsOptions = schools.map((e) => {
    return { label: e, value: e };
});

const options = ref(schoolsOptions);
const value = ref('');

const filterFn = (params: any) => {
    // 自定义过滤方法
    const { keyword } = params;
    const result = options.value.filter((e: any) => {
        return e.label.indexOf(keyword) >= 0;
    });
    return result;
};

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
    <lew-flex style="width: 320px" direction="y">
        <lew-select
            searchable
            :default-value="value"
            v-model="value"
            :options="options"
            placeholder="默认过滤"
        />
        <lew-select
            searchable
            :default-value="value"
            :search-method="filterFn"
            placeholder="自定义过滤方法"
            v-model="value"
        />
        <lew-select
            searchable
            :default-value="value"
            :search-method="searchFn"
            placeholder="模拟请求"
            v-model="value"
        />
    </lew-flex>
</template>
