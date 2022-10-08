<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false);

const mockFn = (v: boolean) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(v);
            resolve(true);
            LewMessage.success('发送成功');
        }, 1000);
    });
};
const change = (e: boolean) => {
    console.log(e);
};
</script>

<template>
    <lew-form>
        <lew-form-item label="常规" direction="y">
            <lew-switch v-model="value" @change="change"></lew-switch>
        </lew-form-item>
        <lew-form-item label="模拟请求" direction="y">
            <lew-switch
                v-model="value"
                :request="mockFn"
                @change="change"
            ></lew-switch>
        </lew-form-item>
    </lew-form>
</template>
