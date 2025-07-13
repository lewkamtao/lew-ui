<script setup lang="ts">
const leftAlignedText = ref('这是左对齐文本')
const centeredText = ref('这是居中对齐文本')
const rightAlignedText = ref('这是右对齐文本')
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input
            v-model="leftAlignedText"
            align="left"
            placeholder="左对齐输入框"
        />
        <lew-input
            v-model="centeredText"
            align="center"
            placeholder="居中对齐输入框"
        />
        <lew-input
            v-model="rightAlignedText"
            align="right"
            placeholder="右对齐输入框"
        />
    </lew-flex>
</template>
