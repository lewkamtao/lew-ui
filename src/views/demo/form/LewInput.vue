<script setup lang="ts">
import { LewTitle, LewInput, LewFormItem } from '../../../components';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Input</lew-title>
        <div style="width: 350px">
            <div style="margin-bottom: 50px">
                <lew-title style="margin-bottom: 20px" size="16px"
                    >x 布局</lew-title
                >
                <LewFormItem title="账号">
                    <LewInput />
                </LewFormItem>
                <LewFormItem title="密码">
                    <LewInput />
                </LewFormItem>
            </div>
            <div style="margin-bottom: 50px">
                <lew-title style="margin-bottom: 20px" size="16px"
                    >y 布局</lew-title
                >
                <LewFormItem title="账号" direction="y">
                    <LewInput />
                </LewFormItem>
                <LewFormItem title="密码" direction="y">
                    <LewInput />
                </LewFormItem>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;

    > div {
        margin: 30px 0;
    }
}
</style>
