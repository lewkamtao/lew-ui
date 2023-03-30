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
        value: '121',
    },
    {
        disabled: true,
        label: '雍正帝',
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
    {
        label: '宋钦宗',
        value: '6',
    },
    {
        label: '唐高宗',
        value: '7',
    },
    {
        label: '齐高帝萧道成',
        disabled: true,
        value: '8',
    },
    {
        label: '晋武帝',
        value: '9',
    },
    {
        label: '唐中宗',
        value: '10',
    },
    {
        label: '唐睿宗',
        value: '11',
    },
    {
        disabled: true,
        label: '汉献帝',
        value: '12',
    },
    {
        label: '齐武帝',
        value: '13',
    },
]);

const value = ref('');
</script>

<template>
    <div>
        <lew-form style="width: 420px" label-width="120px">
            <lew-form-item label="Focus">
                <lew-select v-model="value" :options="options"></lew-select>
            </lew-form-item>
            <lew-form-item label="Hover">
                <lew-select
                    v-model="value"
                    :options="options"
                    trigger="hover"
                ></lew-select>
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
