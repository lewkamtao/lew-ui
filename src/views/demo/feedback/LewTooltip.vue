<script setup lang="ts">
import { LewTitle, LewTooltip, LewButton, LewBadge } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle>Result</LewTitle>
        <div>
            <LewTitle style="margin-bottom: 20px" size="16px"
                >悬浮
                <LewBadge type="success" style="margin-left: 5px"
                    >推荐</LewBadge
                ></LewTitle
            >
            <LewTooltip
                placement="top"
                style="margin-right: 50px"
                tips="哈士奇是北方地区雪橇型狗的总称"
            >
                <LewButton>上方</LewButton>
            </LewTooltip>
            <LewTooltip
                placement="right"
                style="margin-right: 50px"
                tips="哈士奇是北方地区雪橇型狗的总称，他们的快速拉动的风格与其他雪橇犬不同。 他们是由速度最快的雪橇犬不断交配的品种。"
            >
                <LewButton>右方</LewButton>
            </LewTooltip>
            <LewTooltip
                placement="bottom"
                style="margin-right: 50px"
                tips="哈士奇是北方地区雪橇型狗的总称，他们的快速拉动的风格与其他雪橇犬不同。 他们是由速度最快的雪橇犬不断交配的品种。"
            >
                <LewButton>下方</LewButton>
            </LewTooltip>
            <LewTooltip
                placement="left"
                style="margin-right: 50px"
                tips="哈士奇是北方地区雪橇型狗的总称，他们的快速拉动的风格与其他雪橇犬不同。 他们是由速度最快的雪橇犬不断交配的品种。"
            >
                <LewButton>左方</LewButton>
            </LewTooltip>
        </div>

        <div>
            <LewTitle style="margin-bottom: 20px" size="16px">点击 </LewTitle>
            <LewTooltip
                placement="top"
                trigger="click"
                style="margin-right: 50px"
                tips="哈士奇是北方地区雪橇型狗的总称，他们的快速拉动的风格与其他雪橇犬不同。 他们是由速度最快的雪橇犬不断交配的品种。"
            >
                <LewButton>上方</LewButton>
            </LewTooltip>
            <LewTooltip
                placement="right"
                trigger="click"
                style="margin-right: 50px"
                tips="哈士奇是北方地区雪橇型狗的总称，他们的快速拉动的风格与其他雪橇犬不同。 他们是由速度最快的雪橇犬不断交配的品种。"
            >
                <LewButton>右方</LewButton>
            </LewTooltip>
            <LewTooltip
                placement="bottom"
                trigger="click"
                style="margin-right: 50px"
                tips="哈士奇是北方地区雪橇型狗的总称，他们的快速拉动的风格与其他雪橇犬不同。 他们是由速度最快的雪橇犬不断交配的品种。"
            >
                <LewButton>下方</LewButton>
            </LewTooltip>
            <LewTooltip
                placement="left"
                trigger="click"
                style="margin-right: 50px"
                tips="哈士奇是北方地区雪橇型狗的总称，他们的快速拉动的风格与其他雪橇犬不同。 他们是由速度最快的雪橇犬不断交配的品种。"
            >
                <LewButton>左方</LewButton>
            </LewTooltip>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
    }
}
</style>
