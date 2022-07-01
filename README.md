![471656552467_.pic_i9uhs1_.jpeg](https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/471656552467_.pic_i9uhs1_.jpeg)

# Lew-UI

A Component Library for Vue3.js.
Doc address: https://lew.kamtao.com

## Install

```bash
npm install lew-ui --save
```

## How to use

引入 css

```js
// main.ts
import 'lew-ui/dist/style.css';
```

页面

```vue
<script setup lang="ts">
import { LewButton } from 'lew-ui';
</script>

<template>
    <lew-button> 发送 </lew-button>
</template>
```

## TodoList

计划新增：
+ Table 简易表格
+ Tag 新增标签功能收到
+ InputNumber 数字输入框
+ BackTop 回到顶部
+ Notification 通知
+ Rate 评分
+ DatePicker 日期选择器

计划迭代：
+ Select
  + 多选功能
  + 多级选择

## Thanks

- https://github.com/TuSimple/naive-ui
- https://github.com/atomiks/tippyjs
- https://github.com/fancyapps/ui
- https://github.com/sampotts/plyr
