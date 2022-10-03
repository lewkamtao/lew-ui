<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
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

let options2 = ref([
    {
        label: '宋太宗',
        value: '1',
        desc: '一个很帅的帝王',
    },
    {
        value: '2',
        label: '唐睿宗',
        desc: '一个很聪明的帝王',
    },
    {
        value: '3',
        label: '汉献帝',
        desc: '一个很有智慧的帝王',
    },
    {
        value: '4',
        label: '齐武帝',
        desc: '一个好帝王',
    },
]);

let v = ref([]);
const get = () => {
    console.log(v.value);
};
</script>

<template>
    <div>
        <lew-form style="width: 350px" direction="x" label-width="80px">
            <lew-form-item label="小的">
                <LewSelect
                    v-model="v"
                    size="small"
                    :options="options2"
                    multiple
                    label-slot
                    @change="get"
                >
                    <template #label="{ item, checked }">
                        <div
                            class="custom-select-box"
                            :class="{ 'custom-select-checked': checked }"
                        >
                            <div class="label">{{ item.label }}</div>
                            <div class="desc">
                                {{ item.desc }}
                            </div>
                        </div>
                    </template>
                </LewSelect>
            </lew-form-item>
            <lew-form-item label="常规">
                <LewSelect
                    v-model="v"
                    :options="options"
                    multiple
                    @change="get"
                ></LewSelect
            ></lew-form-item>
            <lew-form-item label="大的">
                <LewSelect
                    v-model="v"
                    size="large"
                    :options="options"
                    multiple
                    @change="get"
                ></LewSelect
            ></lew-form-item>
        </lew-form>
    </div>
</template>

<style lang="scss">
.custom-select-box {
    border-radius: var(--lew-form-border-radius);
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
