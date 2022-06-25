<script setup lang="ts">
import { ref } from 'vue';
const modalVisible = ref(false);
</script>

<template>
    <lew-button @click="modalVisible = true">登录</lew-button>
    <lew-modal
        :visible="modalVisible"
        width="350px"
        @mask-click="modalVisible = false"
    >
        <div class="modal-body">
            <lew-title :bold="700" style="margin-bottom: 20px"
                >登录你的账户</lew-title
            >
            <lew-form-item direction="y" title="账号">
                <lew-input
            /></lew-form-item>
            <lew-form-item
                style="margin-bottom: 30px"
                direction="y"
                title="密码"
            >
                <lew-input
            /></lew-form-item>

            <div>
                <lew-button
                    type="normal"
                    style="margin-right: 20px"
                    @click="modalVisible = false"
                    >关闭</lew-button
                >
                <lew-button @click="modalVisible = false">立即登录</lew-button>
            </div>
        </div>
    </lew-modal>
</template>

<style lang="scss" scoped>
.modal-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
}
</style>
