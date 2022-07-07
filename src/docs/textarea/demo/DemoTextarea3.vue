<script lang="ts" setup>

const blur = () => {
    LewMessage.info('触发blur');
};
const focus = () => {
    LewMessage.warning('触发focus');
};
const change = () => {
    LewMessage.error('触发change');
};
const input = () => {
    LewMessage.success('触发input');
};
</script>

<template>
    <div style="width: 300px">
        <lew-form-item title="事件" direction="y">
            <lew-textarea
                @focus="focus"
                @change="change"
                @input="input"
                @blur="blur"
            />
        </lew-form-item>
        <lew-form-item title="禁止缩放" direction="y">
            <lew-textarea resize="none" />
        </lew-form-item>
        <lew-form-item title="禁用" direction="y">
            <lew-textarea resize="none" disabled />
        </lew-form-item>
        <lew-form-item title="只读" direction="y">
            <lew-textarea resize="none" readonly />
        </lew-form-item>
    </div>
</template>
