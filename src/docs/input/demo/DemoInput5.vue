<script lang="ts" setup>
import { ref } from 'vue';

let username = ref('lew-ui');
let pwd = ref('123456');

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
const clear = () => {
    LewMessage.success('触发clear');
};
</script>

<template>
    <div style="width: 300px">
        <lew-form-item title="事件" direction="y">
            <lew-input
                clearable
                @clear="clear"
                @focus="focus"
                @change="change"
                @input="input"
                @blur="blur"
            />
        </lew-form-item>
        <lew-form-item title="只读" direction="y">
            <lew-input v-model="username" readonly />
        </lew-form-item>
        <lew-form-item title="禁用" direction="y">
            <lew-input v-model="pwd" type="password" disabled />
        </lew-form-item>
    </div>
</template>
