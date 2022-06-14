<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue';

type Options = {
    label: string;
    value: string;
};
let activeIndex = ref(0);
let itemRef: any = ref([]);

let activeItemStyle = ref('');
defineProps({
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
});

const init = () => {
    activeItemStyle.value = `width:${itemRef.value[0].offsetWidth}px;transform: translateX(${itemRef.value[0].offsetLeft}px);`;
};

const emit = defineEmits(['update:change']);

const changeIndex = (item: Options, index: number) => {
    activeIndex.value = index;
    let activeRef = itemRef.value[index];
    activeItemStyle.value = `width:${activeRef.offsetWidth}px;transform: translateX(${activeRef.offsetLeft}px);`;
    emit('update:change', { item, index });
};

onMounted(() => {
    init();
});
</script>

<template>
    <div class="lew-tabs">
        <div :style="activeItemStyle" class="activeItem"></div>
        <div
            v-for="(item, index) in options"
            :key="item.value"
            :ref="(el) => itemRef.push(el)"
            class="lew-tabs-item"
            :class="{ active: activeIndex == index }"
            @click="changeIndex(item, index)"
        >
            {{ item.label }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-tabs {
    position: relative;
    display: inline-flex;
    align-items: center;
    background: rgb(239, 239, 239);
    height: 34px;
    border-radius: 10px;
    overflow: hidden;

    .lew-tabs-item {
        position: relative;
        z-index: 9;
        height: 28px;
        line-height: 28px;
        border-radius: 6px;
        padding: 0px 25px;
        margin: 3px;
        color: #000;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        font-size: 14px;
        color: #999;
    }
    .active {
        color: #000;
    }
    .activeItem {
        position: absolute;
        top: 3px;
        left: 0px;
        z-index: 9;
        height: 28px;
        border-radius: 7px;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        background: #fff;
        transform: translateX(3px);
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.08);
    }
}
</style>
