<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { tabsProps } from './props';

type Options = {
    label: string;
    value: string;
};

const props = defineProps(tabsProps);
let activeItemStyle = ref('');
let v = ref(props.modelValue);
let itemRef = ref([] as any);

const init = () => {
    let index = props.options.findIndex((e) => e.value == v.value);

    if (index < 0) index = 0;
    activeItemStyle.value = `width:${itemRef.value[index].offsetWidth}px;transform: translateX(${itemRef.value[index].offsetLeft}px);`;
};

const emit = defineEmits(['update:change', 'update:modelValue']);

const changeIndex = (item: Options, index: number) => {
    if (item.value == props.modelValue) {
        return;
    }
    v.value = props.options[index].value;
    let activeRef = itemRef.value[index];
    activeItemStyle.value = `width:${activeRef.offsetWidth}px;transform: translateX(${activeRef.offsetLeft}px);`;
    emit('update:change', {
        label: item.label,
        value: item.value,
        activeIndex: index,
    });
    emit('update:modelValue', item.value);
};

let timer: any;
const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log(1);
        init();
    }, 250);
};

onMounted(() => {
    if (props.modelValue == '') {
        v.value = props.options[0].value;
    }
    init();
    window.addEventListener('resize', debounce, false);
});

onUnmounted(() => {
    window.removeEventListener('resize', debounce);
});
</script>

<template>
    <div class="lew-tabs" :class="{ 'lew-tabs-round': round }">
        <div :style="activeItemStyle" class="activeItem"></div>
        <div
            v-for="(item, index) in options"
            :key="item.value"
            :ref="(el) => itemRef.push(el)"
            class="lew-tabs-item"
            :class="{ active: v == item.value }"
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
    width: 100%;
    background: var(--lew-form-bgcolor);
    height: 34px;
    border-radius: var(--lew-form-border-radius);
    overflow: hidden;
    transition: all 0.25s;
    .lew-tabs-item {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        z-index: 9;
        flex: 1;
        height: 28px;
        border-radius: var(--lew-form-border-radius);
        margin: 3px;
        color: var(--lew-text-color-5);
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        font-size: 14px;
    }
    .active {
        color: var(--lew-text-color-0);
    }

    .activeItem {
        position: absolute;
        top: 3px;
        left: 0px;
        z-index: 9;
        height: 28px;
        border-radius: 3px;
        transition: all 0.55s cubic-bezier(0.65, 0, 0.35, 1);
        background: var(--lew-bgcolor-0);
        transform: translateX(3px);
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.08);
    }
}

.lew-tabs-round {
    border-radius: 35px;
    .lew-tabs-item {
        border-radius: 35px;
    }
    .activeItem {
        border-radius: 35px;
    }
}
</style>
