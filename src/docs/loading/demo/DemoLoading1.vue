<script setup lang="ts">
import { ref } from 'vue';
let isShow = ref(false);
let title = ref('加载中');
</script>

<template>
    <div style="width: 300px">
        <lew-title size="14px">常规</lew-title>
        <lew-flex
            v-loading="{ isShow: true }"
            direction="column"
            style="padding: 20px"
        >
            <lew-title :bold="700" style="margin-bottom: 20px"
                >登录你的账户
            </lew-title>
            <lew-form-item direction="y" title="账号">
                <lew-input />
            </lew-form-item>
            <lew-form-item
                style="margin-bottom: 30px"
                direction="y"
                title="密码"
            >
                <lew-input />
            </lew-form-item>

            <lew-flex x="end">
                <lew-button type="normal">关闭 </lew-button>
                <lew-button>立即登录</lew-button>
            </lew-flex>
        </lew-flex>
        <br />
        <br />
        <br />
        <lew-title size="14px">自定义文字</lew-title>

        <lew-flex
            v-loading="{ isShow: isShow, title: title }"
            direction="column"
            style="margin-bottom: 20px; padding: 20px"
        >
            <lew-title :bold="700" style="margin-bottom: 20px"
                >登录你的账户
            </lew-title>
            <lew-form-item direction="y" title="账号">
                <lew-input />
            </lew-form-item>
            <lew-form-item
                style="margin-bottom: 30px"
                direction="y"
                title="密码"
            >
                <lew-input />
            </lew-form-item>

            <lew-flex x="end">
                <lew-button type="normal">关闭 </lew-button>
                <lew-button>立即登录</lew-button>
            </lew-flex>
        </lew-flex>

        <lew-form-item direction="y" title="输入加载标题">
            <lew-input v-model="title" show-count :max-length="10" />
        </lew-form-item>
        <lew-button @click="isShow = !isShow">触发</lew-button>
    </div>
</template>
