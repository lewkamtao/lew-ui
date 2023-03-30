<script setup lang="ts">
const options = ref([
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

const value = ref('');
</script>

<template>
    <div>
        <lew-form style="width: 420px" label-width="120px">
            <lew-form-item label="支持插槽">
                <lew-select v-model="value" :options="options" label-slot>
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
                </lew-select>
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
