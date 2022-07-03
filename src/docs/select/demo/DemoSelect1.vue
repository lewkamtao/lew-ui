<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
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

let value = ref('');
</script>

<template>
    <div>
        <lew-flex style="width: 250px" direction="column" gap="30px">
            <lew-form-item direction="y" title="Click">
                <LewSelect v-model="value" :options="options"></LewSelect
            ></lew-form-item>
            <lew-form-item direction="y" title="Hover">
                <LewSelect
                    v-model="value"
                    :options="options"
                    trigger="hover"
                ></LewSelect
            ></lew-form-item>
        </lew-flex>
    </div>
</template>
