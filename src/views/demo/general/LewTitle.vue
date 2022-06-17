<script setup lang="ts">
import { LewTitle } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle>标题</LewTitle>
        <div>
            <div style="margin-bottom: 50px">
                <LewTitle :bold="false" style="margin-bottom: 20px" size="14px"
                    >14px 常规</LewTitle
                >
                <LewTitle :bold="false" style="margin-bottom: 20px" size="16px"
                    >16px 常规</LewTitle
                >
                <LewTitle :bold="false" style="margin-bottom: 20px" size="18px"
                    >18px 常规</LewTitle
                >
                <LewTitle :bold="false" style="margin-bottom: 20px" size="22px"
                    >22px 常规</LewTitle
                >
                <LewTitle :bold="false" style="margin-bottom: 20px" size="26px"
                    >26px 常规</LewTitle
                >
            </div>
            <div style="margin-bottom: 50px">
                <LewTitle style="margin-bottom: 20px" size="14px" bold
                    >14px 粗体</LewTitle
                ><LewTitle style="margin-bottom: 20px" size="16px" bold
                    >16px 粗体</LewTitle
                >
                <LewTitle style="margin-bottom: 20px" size="18px" bold
                    >18px 粗体</LewTitle
                >
                <LewTitle style="margin-bottom: 20px" size="22px" bold
                    >22px 粗体</LewTitle
                >
                <LewTitle style="margin-bottom: 20px" size="26px" bold
                    >26px 粗体</LewTitle
                >
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
