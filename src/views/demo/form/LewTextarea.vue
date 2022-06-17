<script setup lang="ts">
import { LewTitle, LewFormItem, LewTextarea } from '../../../components';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Textera</lew-title>
        <div style="width: 350px">
            <div style="margin-bottom: 50px">
                <lew-title style="margin-bottom: 20px" size="16px"
                    >Y 布局</lew-title
                >
                <LewFormItem title="账号">
                    <LewTextarea></LewTextarea>
                </LewFormItem>
            </div>
            <div style="margin-bottom: 50px">
                <lew-title style="margin-bottom: 20px" size="16px"
                    >X 布局</lew-title
                >
                <LewFormItem direction="y" title="账号">
                    <LewTextarea></LewTextarea>
                </LewFormItem>
            </div>
            <div style="margin-bottom: 50px">
                <lew-title style="margin-bottom: 20px" size="16px"
                    >禁止缩放大小</lew-title
                >
                <LewFormItem direction="y" title="账号">
                    <LewTextarea resize="none"></LewTextarea>
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
