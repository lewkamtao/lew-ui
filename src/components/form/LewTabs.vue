<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue';

type Options = {
    label: string;
    value: string;
};

const props = defineProps({
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
    },
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
});
let activeItemStyle = ref('');
let v = ref(props.modelValue);
let itemRef: Element = ref([]);

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
    background: rgb(239, 239, 239);
    height: 34px;
    border-radius: 10px;
    overflow: hidden;
    .lew-tabs-item {
        position: relative;
        z-index: 9;
        flex: 1;
        text-align: center;
        height: 28px;
        line-height: 28px;
        border-radius: 6px;
        margin: 3px;
        color: var(--text-color);
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        font-size: 14px;
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
