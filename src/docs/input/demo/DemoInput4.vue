<script lang="ts" setup>
import { ref } from 'vue';
let username = ref('lew-ui');
let pwd = ref('123456');
</script>

<template>
    <div style="width: 300px">
        <lew-form-item title="账号">
            <lew-input v-model="username" readonly />
        </lew-form-item>
        <lew-form-item title="密码">
            <lew-input type="password" v-model="pwd" readonly />
        </lew-form-item>
    </div>
</template>
