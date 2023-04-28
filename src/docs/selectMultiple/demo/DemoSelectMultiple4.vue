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

const value = ref([]);
</script>

<template>
    <lew-flex style="width: 320px" direction="y">
        <lew-select-multiple
            v-model="value"
            :item-height="48"
            :options="options"
            placeholder="支持插槽"
            label-slot
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
        </lew-select-multiple>
    </lew-flex>
</template>

<style lang="scss">
.custom-select-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: var(--lew-border-radius);
    height: 48px;
    user-select: none;
    padding: 0px 8px;
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
