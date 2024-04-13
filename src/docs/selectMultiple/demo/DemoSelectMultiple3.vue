<script setup lang="ts">
    import { schools } from './schools';

    const schoolsOptions = schools.map((e) => {
        return { label: e, value: e };
    });

    const options = ref(schoolsOptions);
    const value = ref([]);

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
                const res = options.value.filter((e) => e.label.indexOf(event.keyword) >= 0);
                resolve(res);
            }, 500);
        });
    };
</script>

<template>
    <lew-flex style="width: 320px" direction="y">
        <lew-select-multiple
            v-model="value"
            searchable
            :default-value="value"
            :options="options"
            placeholder="默认过滤"
        >
            <template #empty>
                <div class="empty">
                    <lew-icon size="30" type="box" />
                    暂无内容
                </div>
            </template>
        </lew-select-multiple>
        <lew-select-multiple
            v-model="value"
            searchable
            :default-value="value"
            :search-method="filterFn"
            placeholder="自定义过滤方法"
        />
        <lew-select-multiple
            v-model="value"
            searchable
            :default-value="value"
            :search-method="searchFn"
            placeholder="模拟请求"
        />
    </lew-flex>
</template>
<style lang="scss" scoped>
    .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 220px;
        gap: 10px;
        text-align: center;
        color: #aaa;
    }
</style>
