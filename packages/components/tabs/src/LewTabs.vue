<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { tabsProps } from './props';

type Options = {
    label: string;
    value: string;
};

const props = defineProps(tabsProps);
let activeItemStyle = ref('');
let v = ref(props.modelValue);
let itemRef = ref([] as any);

watch(
    () => props.modelValue,
    () => {
        v.value = props.modelValue;
        setStyle(v.value);
    }
);

const init = () => {
    let index = props.options.findIndex((e) => e.value == v.value);
    if (index < 0) index = 0;
    activeItemStyle.value = `width:${itemRef.value[index].offsetWidth}px;transform: translateX(${itemRef.value[index].offsetLeft}px);`;
};

const emit = defineEmits(['change', 'update:modelValue']);
let curIndex = props.options.findIndex((e) => v.value == e.value);
const setStyle = (value: string) => {
    let index = props.options.findIndex((e) => value == e.value);
    if (curIndex != index) {
        let _item = props.options[index];

        if (v.value != _item.value) {
            v.value = _item.value;
        }

        let activeRef = itemRef.value[index];
        activeItemStyle.value = `width:${activeRef.offsetWidth}px;transform: translate(${activeRef.offsetLeft}px);`;

        if (v.value != props.modelValue) {
            emit('change', {
                label: _item.label,
                value: _item.value,
                activeIndex: index,
            });
            emit('update:modelValue', v.value);
        }
        curIndex = index;
    }
};

let timer: ReturnType<typeof setTimeout> | undefined;
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
    <div
        class="lew-tabs"
        :class="`
               ${type ? 'lew-tabs-' + type : ''}     
               ${round ? 'lew-tabs-round' : ''}
        `"
        :style="`width:${width}`"
    >
        <div
            :style="activeItemStyle"
            class="lew-tabs-item-animation-active"
        ></div>
        <div
            v-for="item in options"
            :key="item.value"
            :ref="(el) => itemRef.push(el)"
            class="lew-tabs-item"
            :style="`width:${itemWidth}`"
            :class="{ 'lew-tabs-item-active': v == item.value }"
            @click="setStyle(item.value)"
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
    width: auto;
    background: var(--lew-form-bgcolor);
    border-radius: var(--lew-form-border-radius);
    overflow: hidden;
    user-select: none;
    .lew-tabs-item {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        z-index: 9;
        height: 28px;
        padding: 0px 12px;
        box-sizing: border-box;
        border-radius: var(--lew-form-border-radius);
        margin: 3px;
        color: var(--lew-text-color-5);
        white-space: nowrap;
        cursor: pointer;
        font-size: 14px;
    }
    .lew-tabs-item-active {
        color: var(--lew-primary-color-dark);
    }

    .lew-tabs-item-animation-active {
        position: absolute;
        top: 3px;
        left: 0px;
        z-index: 9;
        height: 28px;
        border-radius: 3px;
        transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
        background: var(--lew-bgcolor-0);
        transform: translateX(3px);
        box-shadow: 0px 0px 30px rgba($color: #000000, $alpha: 0.15);
    }
}

.lew-tabs-line {
    background: none;
    border-bottom: var(--lew-form-border-width) var(--lew-form-border-color)
        solid;
    padding-bottom: 5px;
    .lew-tabs-item:hover {
        background: var(--lew-bgcolor-2);
    }
    .lew-tabs-item-active {
        background: none;
    }
    .lew-tabs-item-active:hover {
        transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
        background: none;
    }
    .lew-tabs-item-animation-active {
        position: absolute;
        top: auto;
        bottom: 0px;
        left: 0px;
        z-index: 9;
        height: 2px;
        border-radius: 2px;
        transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
        background: var(--lew-primary-color);
        transform: translateX(3px);
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.08);
    }
}

.lew-tabs-round {
    border-radius: 35px;
    .lew-tabs-item {
        border-radius: 35px;
    }
    .lew-tabs-item-animation-active {
        border-radius: 35px;
    }
}
</style>
