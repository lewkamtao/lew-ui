<script setup lang="ts">
import DocHeading from '../layout/DocHeading.vue'
</script>

<template>
  <DocHeading>更新日志</DocHeading>
  <br>
  <br>
  <DocHeading size="18px">
    1.0.24 Beta
    <lew-mark style="margin-left: 20px">
      2022-07
    </lew-mark>
  </DocHeading>
  <br>
  <div>
    <DocHeading :size="14">
      毁灭性的变化
    </DocHeading>
    <ul>
      <li>
        曾计划用<lew-mark>LewInput</lew-mark>的 type 承载多行（如 type="textarea"），但未在后续版本中落地；
        多行文本请使用<lew-mark>LewTextarea</lew-mark>。
      </li>
    </ul>
    <DocHeading :size="14">
      新特性
    </DocHeading>
    <ul>
      <li>
        新增<lew-mark>Table</lew-mark>、
        <lew-mark>DatePicker</lew-mark>、 <lew-mark>InputPro</lew-mark>、
        <lew-mark>Notification</lew-mark>、 <lew-mark>Pagination</lew-mark>、
        <lew-mark>Drawer</lew-mark>、 <lew-mark>BackTop</lew-mark>。
      </li>
      <li>
        新增<lew-mark>Input</lew-mark>的长度限制、清空、密码可见、尺寸、显示字数。
      </li>
      <li>新增<lew-mark>Checkbox</lew-mark>的纯 tag 样式。</li>
    </ul>
    <DocHeading :size="14">
      修复
    </DocHeading>
    <ul>
      <li>修复若干不为人知的 Bug</li>
    </ul>
    <DocHeading :size="14">
      优化
    </DocHeading>
    <ul>
      <li>优化气泡的性能</li>
      <li>优化组件的引入方式</li>
    </ul>
    <DocHeading :size="14">
      文档
    </DocHeading>
    <ul>
      <li>去除多余的动画，回归本质。</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  padding-left: 20px;
  line-height: 35px;
}
</style>
