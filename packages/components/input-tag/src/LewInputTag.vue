<script setup lang="ts">
import { inputTagProps } from './props';
import { useVModel } from '@vueuse/core';

const emit = defineEmits([
    'update:modelValue',
    'close',
    'blur',
    'focus',
    'change',
    'input',
]);

const props = defineProps(inputTagProps);
const tagsValue = useVModel(props, 'modelValue', emit);
const inputValue = ref();
const isInput = ref(false);
const lewInputRef = ref();
let isEnter = false;

let delDownTimer: any;
let delDownCheck = 0;
watch(
    () => props.modelValue,
    () => {
        tagsValue.value = props.modelValue;
    }
);

const openInput = () => {
    isInput.value = true;
    nextTick(() => {
        lewInputRef.value.toFocus();
    });
    document.onkeydown = function (event) {
        if (inputValue.value === '') {
            if (event.keyCode === 8 || event.keyCode === 46) {
                clearTimeout(delDownTimer);
                delDownTimer = setTimeout(() => {
                    delDownCheck = 0;
                }, 500);
                delDownCheck += 1;
                if (delDownCheck >= 2) {
                    tagsValue.value.splice(tagsValue.value.length - 1, 1);
                    delDownCheck = 0;
                }
            }
        } else if (event.keyCode === 13) {
            isEnter = true;
        }
    };
};

const blurFn = (e: any) => {
    isInput.value = false;
    document.onkeydown = null;
    addTag();
    if (isEnter) {
        openInput();
    }
    isEnter = false;
};

const addTag = () => {
    let _value = tagsValue.value || [];
    if (inputValue.value) {
        _value.push(inputValue.value);
    }
    inputValue.value = '';
    tagsValue.value = _value;
};

const delTag = (index: number) => {
    tagsValue.value.splice(index, 1);
};
</script>

<template>
    <div class="lew-input-tag-view">
        <div style="margin-left: -10px; height: 26px"></div>
        <TransitionGroup name="list">
            <lew-tag
                v-for="(item, index) in tagsValue"
                :key="index"
                closable
                :type="type"
                @close="delTag(index)"
                >{{ item }}
            </lew-tag>
        </TransitionGroup>

        <label v-if="!isInput" class="lew-input-tag-button" @click="openInput">
            <lew-icon :size="16" type="plus" />
        </label>
        <lew-input
            v-else
            ref="lewInputRef"
            v-model="inputValue"
            class="lew-input-tag"
            size="small"
            auto-width
            placeholder=""
            @blur="blurFn"
            @focus="addTag"
        />
    </div>
</template>

<style lang="scss" scoped>
.lew-input-tag-view {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    border: var(--lew-form-border-width solid rgba(0, 0, 0, 0));

    .lew-input-tag {
        height: 26px;
        flex-shrink: 1;
        ::v-deep input {
            height: 26px;
        }
    }
}

.lew-input-tag-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 26px;
    width: 65px;
    box-sizing: border-box;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-bgcolor-0);
    color: var(--lew-text-color-8);
    border: var(--lew-text-color-8) var(--lew-form-border-width) dashed;
}

.lew-input-tag-button:hover {
    color: var(--lew-primary-color);
    border: var(--lew-primary-color) var(--lew-form-border-width) dashed;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.25s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
