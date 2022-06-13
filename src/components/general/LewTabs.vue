<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue';

type Options = {
    label: string;
    value: string;
};
let activeIndex = ref(0);
let itemRef = ref([]);

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
    activeItemStyle.value = `width:${itemRef.value[0].offsetWidth}px;height:${itemRef.value[0].offsetHeight}px;transform: translateX(${itemRef.value[0].offsetLeft}px);`;
};

const emit = defineEmits(['change']);

const changeIndex = (item, index) => {
    activeIndex.value = index;
    let activeRef = itemRef.value[index];
    activeItemStyle.value = `width:${activeRef.offsetWidth}px;height:${activeRef.offsetHeight}px;transform: translateX(${activeRef.offsetLeft}px);`;
    emit('change', { item, index });
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
    background: #eee;
    padding: 1.5px;
    border-radius: 8px;
    overflow: hidden;
    .lew-tabs-item {
        position: relative;
        z-index: 9;
        border-radius: 4px;
        padding: 5px 25px;
        margin: 1.5px;
        cursor: pointer;
        color: #999;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        font-size: 14px;
    }
    .active {
        color: #000;
    }
    .activeItem {
        position: absolute;
        top: 3px;
        left: 0px;
        z-index: 9;
        border-radius: 5px;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        background: #fff;
        transform: translateX(4px);
        box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.05);
    }
}
</style>
