<template>
  <lew-title size="18px">
    1.0.35 Beta
    <lew-mark style="margin-left: 20px" type="primary">
      2022-08
    </lew-mark>
  </lew-title>
  <br>
  <div>
    <lew-title :size="14">
      新特性
    </lew-title>
    <ul>
      <li>新增<lew-mark>Button</lew-mark>的 Icon 模式。</li>
      <li>新增<lew-mark>InputTag</lew-mark></li>
      <li>新增<lew-mark>Comment</lew-mark></li>
      <li>
        新增<lew-mark>Notification</lew-mark>关闭按钮，自定义关闭时间。
      </li>
    </ul>
    <lew-title :size="14">
      修复
    </lew-title>
    <ul>
      <li>修复若干不为人知的 Bug</li>
      <li>修复<lew-mark>Table</lew-mark>的滚动条出现时机以及样式</li>
      <li>修复多处类型错误</li>
      <li>修复分页器的输入校验错误、以及双向绑定的页大小失效。</li>
    </ul>
    <lew-title :size="14">
      优化
    </lew-title>
    <ul>
      <li>优化<lew-mark>Button</lew-mark>的 loading 效果</li>
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
