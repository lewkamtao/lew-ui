<script setup lang="ts">
const options = ref([
    {
        label: '宋太宗',
        value: '1',
    },
    {
        label: '明神宗',
        value: '2',
        disabled: true,
    },
    {
        label: '雍正帝',
        disabled: true,
        value: '3',
    },
    {
        label: '宋宁宗',
        value: '4',
    },
    {
        label: '陈高祖陈霸先',
        value: '5',
    },
]);

const value = ref('');
</script>

<template>
    <div>
        <lew-form style="width: 420px" label-width="120px">
            <lew-form-item label="常规">
                <lew-select v-model="value" :options="options" />
            </lew-form-item>
        </lew-form>
    </div>
</template>
