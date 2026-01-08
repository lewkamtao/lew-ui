<script setup lang="ts">
// 不同颜色
const tagPrimary = ref('Primary')
const tagSuccess = ref('Success')
const tagWarning = ref('Warning')
const tagError = ref('Error')
const tagInfo = ref('Info')

// 更多颜色
const tagBlue = ref('Blue')
const tagGreen = ref('Green')
const tagRed = ref('Red')
const tagOrange = ref('Orange')
const tagPurple = ref('Purple')
const tagCyan = ref('Cyan')
const tagPink = ref('Pink')

// 不同类型
const tagLight = ref('Light 类型')
const tagFill = ref('Fill 类型')
const tagGhost = ref('Ghost 类型')

// 不同尺寸
const tagSmall = ref('Small')
const tagMedium = ref('Medium')
const tagLarge = ref('Large')

// 圆角和加大
const tagRound = ref('圆角标签')
const tagOversize = ref('加大内边距')
const tagRoundOversize = ref('圆角加大')

// 空内容
const tagEmpty = ref('')
</script>

<template>
  <lew-flex direction="y" gap="20px">
    <!-- 语义颜色 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>语义颜色</lew-text>
      <lew-flex gap="10px" wrap>
        <lew-tag v-model="tagPrimary" editable color="primary" />
        <lew-tag v-model="tagSuccess" editable color="success" />
        <lew-tag v-model="tagWarning" editable color="warning" />
        <lew-tag v-model="tagError" editable color="error" />
        <lew-tag v-model="tagInfo" editable color="info" />
      </lew-flex>
    </lew-flex>

    <!-- 更多颜色 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>更多颜色</lew-text>
      <lew-flex gap="10px" wrap>
        <lew-tag v-model="tagBlue" editable color="blue" />
        <lew-tag v-model="tagGreen" editable color="green" />
        <lew-tag v-model="tagRed" editable color="red" />
        <lew-tag v-model="tagOrange" editable color="orange" />
        <lew-tag v-model="tagPurple" editable color="purple" />
        <lew-tag v-model="tagCyan" editable color="cyan" />
        <lew-tag v-model="tagPink" editable color="pink" />
      </lew-flex>
    </lew-flex>

    <!-- 不同类型 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>标签类型 (Light / Fill / Ghost)</lew-text>
      <lew-flex gap="10px" wrap>
        <lew-tag v-model="tagLight" editable color="primary" type="light" />
        <lew-tag v-model="tagFill" editable color="primary" type="fill" />
        <lew-tag v-model="tagGhost" editable color="primary" type="ghost" />
      </lew-flex>
      <lew-flex gap="10px" wrap>
        <lew-tag v-model="tagLight" editable color="success" type="light" />
        <lew-tag v-model="tagFill" editable color="success" type="fill" />
        <lew-tag v-model="tagGhost" editable color="success" type="ghost" />
      </lew-flex>
      <lew-flex gap="10px" wrap>
        <lew-tag v-model="tagLight" editable color="warning" type="light" />
        <lew-tag v-model="tagFill" editable color="warning" type="fill" />
        <lew-tag v-model="tagGhost" editable color="warning" type="ghost" />
      </lew-flex>
    </lew-flex>

    <!-- 不同尺寸 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>标签尺寸</lew-text>
      <lew-flex gap="10px" wrap x="start">
        <lew-tag v-model="tagSmall" editable color="primary" size="small" />
        <lew-tag v-model="tagMedium" editable color="primary" size="medium" />
        <lew-tag v-model="tagLarge" editable color="primary" size="large" />
      </lew-flex>
    </lew-flex>

    <!-- 圆角和加大 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>圆角 / 加大内边距</lew-text>
      <lew-flex gap="10px" wrap x="start">
        <lew-tag v-model="tagRound" editable color="blue" round />
        <lew-tag v-model="tagOversize" editable color="green" oversize />
        <lew-tag v-model="tagRoundOversize" editable color="purple" round oversize />
      </lew-flex>
    </lew-flex>

    <!-- 空内容占位 -->
    <lew-flex direction="y" gap="8px">
      <lew-text size="13px" bold>空内容占位</lew-text>
      <lew-flex gap="10px" wrap>
        <lew-tag v-model="tagEmpty" editable color="primary" placeholder="输入内容..." />
        <lew-tag v-model="tagEmpty" editable color="success" type="fill" placeholder="Fill 类型" />
        <lew-tag v-model="tagEmpty" editable color="warning" type="ghost" placeholder="Ghost 类型" />
      </lew-flex>
    </lew-flex>

    <lew-text type="warning" size="12px">
      点击标签进入编辑模式，按 Enter 保存，按 Escape 取消
    </lew-text>
  </lew-flex>
</template>
