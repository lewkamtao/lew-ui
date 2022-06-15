<script setup lang="ts">
import LewInput from './LewInput.vue';
import { ref, PropType, onMounted } from 'vue';

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

const v = ref<string | undefined>('');
const label = ref<string | undefined>('');

onMounted(() => {
    label.value = props.options.find((e) => e.value == props.modelValue)?.label;
});

let isShowOptions = ref(false);

const focusFn = () => {
    isShowOptions.value = true;
};

const blurFn = () => {
    setTimeout(() => {
        isShowOptions.value = false;
    }, 150);
};

const changeFn = (item: Options) => {
    label.value = item.label;
    v.value == item.value;
    emit('update:modelValue', item.value);
};

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="lew-select">
        <LewInput
            v-model="label"
            placeholder="请选择"
            @focus="focusFn"
            @blur="blurFn"
        ></LewInput>
        <div class="options-box" :class="{ isShowOptions: isShowOptions }">
            <div
                v-for="item in options"
                :key="item.value"
                class="item"
                @click="changeFn(item)"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-select {
    position: relative;
    width: 250px;
    display: flex;
    flex-direction: column;
    .lew-input {
        width: 100%;
    }
    .options-box {
        position: absolute;
        overflow-y: auto;
        overflow-x: hidden;
        height: 300px;
        width: 100%;
        border: var(--form-border);
        border-radius: var(--form-border-radius);
        background-color: #fff;
        box-shadow: 0px 10px 20px rgba($color: #000000, $alpha: 0.1);
        box-sizing: border-box;
        transition: all 0.25s ease;
        transform: translateY(60px);
        z-index: -9;
        opacity: 0;
        padding: 4px;
        .item {
            width: 100%;
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            color: #666;
            box-sizing: border-box;
            border-radius: 6px;
            padding-left: 15px;
        }
        .item:hover {
            color: #000;
            background-color: var(--form-bgcolor-hover);
        }
    }
    .isShowOptions {
        width: 100%;
        z-index: 9;
        opacity: 1;
        transform: translateY(45px);
    }
    .options-box::-webkit-scrollbar {
        background-color: rgb(126, 126, 126, 0);
        width: 5px;
        height: 5px;
    }

    .options-box::-webkit-scrollbar-thumb:hover {
        background-color: rgb(126, 126, 126);
    }
    .options-box::-webkit-scrollbar-thumb {
        background-color: rgb(209 213 219 / 0);
        border-radius: 5px;
    }
    .options-box:hover::-webkit-scrollbar-thumb {
        background-color: rgb(209 213 219 / 1);
        border-radius: 5px;
    }
}
</style>
