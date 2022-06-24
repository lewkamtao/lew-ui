<template>
    <lew-button
        v-tooltip="{
            content: '西伯利亚雪橇犬',
            placement: 'top',
            trigger: 'mouseenter',
        }"
        >上方</lew-button
    >
    <lew-button
        v-tooltip="{
            content: '西伯利亚雪橇犬',
            placement: 'bottom',
            trigger: 'mouseenter',
        }"
        >下方</lew-button
    >
    <lew-button
        v-tooltip="{
            content: '西伯利亚雪橇犬',
            placement: 'left',
            trigger: 'mouseenter',
        }"
        >左方</lew-button
    >
    <lew-button
        v-tooltip="{
            content: '西伯利亚雪橇犬',
            placement: 'right',
            trigger: 'mouseenter',
        }"
        >右方</lew-button
    >
</template>

<style lang="scss" scoped>
.lew-button {
    margin-right: 20px;
}
</style>
