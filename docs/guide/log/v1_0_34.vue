<script setup lang="ts">
import DocHeading from '../../layout/DocHeading.vue'
</script>

<template>
  <DocHeading size="18px">
    1.0.35 Beta
    <code style="margin-left: 20px">
      2022-08
    </code>
  </DocHeading>
  <br>
  <div>
    <DocHeading :size="14">
      新特性
    </DocHeading>
    <ul>
      <li>新增<code>Button</code>的 Icon 模式。</li>
      <li>新增<code>InputTag</code></li>
      <li>新增<code>Comment</code></li>
      <li>新增<code>Notification</code>关闭按钮，自定义关闭时间。</li>
    </ul>
    <DocHeading :size="14">
      修复
    </DocHeading>
    <ul>
      <li>修复若干不为人知的 Bug</li>
      <li>修复<code>Table</code>的滚动条出现时机以及样式</li>
      <li>修复多处类型错误</li>
      <li>修复分页器的输入校验错误、以及双向绑定的页大小失效。</li>
    </ul>
    <DocHeading :size="14">
      优化
    </DocHeading>
    <ul>
      <li>优化<code>Button</code>的 loading 效果</li>
      <li>优化全局颜色的显示问题</li>
      <li>优化 Alert 的图标对齐问题</li>
      <li>优化多处文档的规范</li>
      <li>优化标签输入框</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  padding-left: 20px;
  line-height: 35px;
}
</style>
