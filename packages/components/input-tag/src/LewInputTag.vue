<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { inputTagProps } from './props';

const props = defineProps(inputTagProps);

const inputValue = ref();
const tagsValue = ref(props.modelValue);
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
        lewInputRef.value.focusFn();
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
    if (inputValue.value) {
        tagsValue.value.push(inputValue.value);
    }

    inputValue.value = '';
};

const delTag = (index: number) => {
    tagsValue.value.splice(index, 1);
};
</script>

<template>
    <div class="lew-input-tag-view">
        <div style="margin-left: -10px; height: 26px"></div>
        <lew-tag
            v-for="(item, index) in tagsValue"
            :key="index"
            closable
            :type="type"
            @close="delTag(index)"
            >{{ item }}
        </lew-tag>

        <label
            v-show="!isInput"
            class="lew-input-tag-button"
            @click="openInput"
        >
            <lew-icon :size="16" type="plus" />
        </label>

        <lew-input
            v-show="isInput"
            ref="lewInputRef"
            v-model="inputValue"
            class="lew-input-tag"
            size="small"
            auto-width
            placeholder=""
            @blur="blurFn"
            @focus="addTag"
        ></lew-input>
    </div>
</template>

<style lang="scss" scoped>
.lew-input-tag-view {
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 5px 0px;
    box-sizing: border-box;

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
</style>
