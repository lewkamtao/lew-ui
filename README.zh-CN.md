# Lew UI

一个用于 Vue3 的组件库。文档地址：https://lew.kamtao.com

[英文](./README.md) | 中文

## 安装

```bash
npm install lew-ui
```

## 如何使用

main.ts

```js
// main.ts
import 'lew-ui/style'
```

```vue
<script setup lang="ts">
// page.vue
import { LewButton } from 'lew-ui'
</script>

<template>
  <lew-button text="提交" />
</template>
```

## 开源库声明

Lew UI 使用了以下开源库：

- [tippy.js](https://atomiks.github.io/tippyjs/): 用于创建工具提示和弹出框
- [Lucide](https://github.com/lucide-icons/lucide): 提供简洁美观的图标集
- [fancyapps](https://fancyapps.com/): 用于创建图片画廊和轮播
- [VueUse](https://vueuse.org/): Vue Composition API 实用工具集合
- [Day.js](https://day.js.org/): 轻量级日期处理库
- [Yup](https://github.com/jquense/yup): 对象模式验证库

我们感谢这些优秀的开源项目为 Lew UI 提供的支持。

## 许可证

Lew UI 是根据 MIT 许可证的开源软件。
