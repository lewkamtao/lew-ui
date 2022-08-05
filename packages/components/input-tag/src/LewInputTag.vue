<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { inputTagProps } from './props';
import { Icon } from '@vicons/utils';
import { Add16Regular } from '@vicons/fluent';

const props = defineProps(inputTagProps);

const inputValue = ref();
const tagsValue = ref(props.modelValue);
const isInput = ref(false);
const lewInputRef = ref();

let delDownTimer;
let delDownCheck = 0;
watch(
    () => props.modelValue,
    () => {
        tagsValue.value = props.modelValue;
    },
);

const openInput = () => {
    isInput.value = true;
    nextTick(() => {
        lewInputRef.value.focusFn();
    });

    document.onkeydown = function (event) {
        if (inputValue.value == '') {
            if (event.keyCode == 8 || event.keyCode == 46) {
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
        }
    };
};

const closeInput = (e) => {
    isInput.value = false;
    document.onkeydown = null;
    addTag(e);
};

const addTag = (value) => {
    if (!!value) {
        tagsValue.value.push(value);
        openInput();
    }

    inputValue.value = '';
};

const delTag = (index) => {
    tagsValue.value.splice(index, 1);
};
</script>

<template>
    <div class="lew-input-tag">
        <lew-tag
            closable
            v-for="(item, index) in tagsValue"
            :key="index"
            @close="delTag(index)"
            >{{ item }}</lew-tag
        >
        <label
            v-show="!isInput"
            @click="openInput"
            class="lew-input-tag-button"
        >
            <Icon size="18px"> <Add16Regular /></Icon>
        </label>
        <lew-input
            ref="lewInputRef"
            v-model="inputValue"
            v-show="isInput"
            @blur="closeInput"
            @focus="addTag"
            size="small"
            auto-width
            placeholder=""
        ></lew-input>
    </div>
</template>

<style lang="scss" scoped>
.lew-input-tag {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: -5px;
}
.lew-input-tag-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 26px;
    width: 50px;
    box-sizing: border-box;
    border-radius: var(--lew-form-border-radius);
    background-color: #fff;
    color: var(--lew-text-color-5);
    border: var(--lew-bgcolor-5) var(--lew-form-border-width) dashed;
}
.lew-input-tag-button:hover {
    color: var(--lew-primary-color-dark);
    border: var(--lew-primary-color) var(--lew-form-border-width) dashed;
}
</style>
