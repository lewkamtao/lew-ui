<script setup lang="ts">
// 语义颜色
const tagPrimary = ref('Primary')
const tagSuccess = ref('Success')
const tagWarning = ref('Warning')

// 不同类型
const tagLight = ref('Light')
const tagFill = ref('Fill')
const tagGhost = ref('Ghost')

// 不同尺寸
const tagSmall = ref('Small')
const tagMedium = ref('Medium')
const tagLarge = ref('Large')
</script>

<template>
  <lew-flex direction="y" gap="20px">
    <!-- 语义颜色 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>
        语义颜色
      </lew-text>
      <lew-flex gap="10px" wrap>
        <lew-tag v-model="tagPrimary" editable color="primary" />
        <lew-tag v-model="tagSuccess" editable color="success" />
        <lew-tag v-model="tagWarning" editable color="warning" />
      </lew-flex>
    </lew-flex>

    <!-- 不同类型 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>
        标签类型
      </lew-text>
      <lew-flex gap="10px" wrap>
        <lew-tag v-model="tagLight" editable color="blue" type="light" />
        <lew-tag v-model="tagFill" editable color="blue" type="fill" />
        <lew-tag v-model="tagGhost" editable color="blue" type="ghost" />
      </lew-flex>
    </lew-flex>

    <!-- 不同尺寸 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>
        标签尺寸
      </lew-text>
      <lew-flex gap="10px" wrap x="start">
        <lew-tag v-model="tagSmall" editable color="green" size="small" />
        <lew-tag v-model="tagMedium" editable color="green" size="medium" />
        <lew-tag v-model="tagLarge" editable color="green" size="large" />
      </lew-flex>
    </lew-flex>

    <lew-text type="warning" size="12px">
      点击标签进入编辑模式，按 Enter 保存，按 Escape 取消
    </lew-text>
  </lew-flex>
</template>
