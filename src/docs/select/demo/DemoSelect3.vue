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
    <div>
        <lew-form style="width: 420px" direction="x" label-width="120px">
            <lew-form-item label="默认过滤">
                <lew-select
                    searchable
                    :default-value="value"
                    v-model="value"
                    :options="options"
                ></lew-select>
            </lew-form-item>
            <lew-form-item label="自定义过滤方法">
                <lew-select
                    searchable
                    :default-value="value"
                    :search-method="filterFn"
                    v-model="value"
                ></lew-select>
            </lew-form-item>
            <lew-form style="width: 420px" direction="x" label-width="120px">
                <lew-form-item label="模拟异步请求">
                    <lew-select
                        searchable
                        :default-value="value"
                        :search-method="searchFn"
                        v-model="value"
                    />
                </lew-form-item>
            </lew-form>
        </lew-form>
    </div>
</template>
