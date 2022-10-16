<script setup lang="ts">
const options = ref([
    {
        label: '广东',
        value: '1',
    },
    {
        label: '深圳',
        value: '2',
    },
    {
        label: '杭州',
        value: '3',
    },
    {
        label: '上海',
        value: '4',
    },
    {
        label: '北京',
        value: '5',
    },
]);

const value = ref('');
</script>

<template>
    <div>
        <lew-form style="width: 350px" direction="x" label-width="80px">
            <lew-form-item label="小的">
                <LewSelect
                    v-model="value"
                    size="small"
                    :options="options"
                ></LewSelect>
            </lew-form-item>
            <lew-form-item label="常规">
                <LewSelect v-model="value" :options="options"></LewSelect>
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
