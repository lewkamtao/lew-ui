<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    // 是否使用清空按钮
    clearable: {
        type: Boolean,
        default: false,
    },
});
const v = ref(props.modelValue);
watch(
    () => props.modelValue,
    () => {
        v.value = props.modelValue;
    },
);
const emit = defineEmits(['update:modelValue', 'clear']);

const input = (e: Event) => {
    let value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);
};
const clear = (): void => {
    v.value = '';
    emit('clear', v.value);
};
</script>

<template>
    <div class="lew-input-view">
        <!--  :style="{ paddingRight: clearable ? '30px' : '' }" -->
        <input
            v-model="v"
            class="lew-input"
            :disabled="disabled"
            placeholder="请输入"
            :style="{ paddingRight: clearable ? '30px' : '' }"
            @input="input"
        />
        <div v-if="v && clearable" class="close-icon-view" @click="clear">
            <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
            >
                <path
                    d="M503.466667 533.333333L384 413.866667l29.866667-29.866667 119.466666 119.466667L652.8 384l29.866667 29.866667-119.466667 119.466666 119.466667 119.466667-29.866667 29.866667-119.466667-119.466667L413.866667 682.666667l-29.866667-29.866667 119.466667-119.466667z m29.866666 362.666667C332.8 896 170.666667 733.866667 170.666667 533.333333S332.8 170.666667 533.333333 170.666667 896 332.8 896 533.333333 733.866667 896 533.333333 896z m0-42.666667c174.933333 0 320-145.066667 320-320S708.266667 213.333333 533.333333 213.333333 213.333333 358.4 213.333333 533.333333 358.4 853.333333 533.333333 853.333333z"
                    fill="#bfbfbf"
                ></path>
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$clearableWight: 30px;
.lew-input-view {
    position: relative;
    .close-icon-view {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        width: $clearableWight;
        height: 100%;
        cursor: pointer;
        user-select: none;
    }
    .close-icon-view svg path {
        transition: all 0.15s ease;
    }
    .close-icon-view svg:hover path {
        fill: #8a8a8a; // var(--lew-primary-color);
    }
}
.lew-input {
    // 这里是参考ElementUI。为了解决输入框加清除属性后的宽度不统一问题
    width: 180px; // 100%;
    height: 35px;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    border-radius: var(--lew-form-border-radius);
    background-color: var(--lew-form-bgcolor);
    color: var(--lew-text-color);
    box-sizing: border-box;
    transition: all 0.15s ease;
    outline: none;
}
.lew-input::placeholder {
    color: rgb(165, 165, 165);
}
.lew-input:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-input:active {
    background-color: var(--lew-form-bgcolor-active);
}

.lew-input:focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
}
</style>
