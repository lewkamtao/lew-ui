# Lew UI
一个用于 Vue3 的组件库。文档地址：https://lew.kamtao.com
英文 | [中文](./README.zh-CN.md)

## 安装

```bash
npm install lew-ui --save
```

## 如何使用

main.ts

```js
// main.ts
import 'lew-ui/style'
```

page.vue

```vue
<script setup lang="ts">
import { LewButton } from 'lew-ui'
</script>

<template>
  <lew-button text="提交" />
</template>
```

## 许可证

Lew UI 是根据 MIT 许可证的开源软件。
