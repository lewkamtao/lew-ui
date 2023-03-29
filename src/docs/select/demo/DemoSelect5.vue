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
        <lew-form style="width: 350px" label-width="80px">
            <lew-form-item label="常规">
                <lew-select v-model="value" :options="options" multiple />
            </lew-form-item>
        </lew-form>
    </div>
</template>

<style lang="scss">
.custom-select-box {
    border-radius: var(--lew-border-radius);
    margin-bottom: 4px;
    padding: 6px 8px;
    user-select: none;
    cursor: pointer;
    .label {
        color: var(--lew-text-color-1);
        font-size: 14px;
    }
    .desc {
        color: var(--lew-text-color-8);
        font-size: 12px;
    }
}
.custom-select-checked {
    background: var(--lew-primary-color-light);
}
</style>
