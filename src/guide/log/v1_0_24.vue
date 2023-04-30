<template>
    <lew-title size="18px">
        1.0.24 Beta
        <lew-mark style="margin-left: 20px" type="primary">2022-07</lew-mark>
    </lew-title>
    <br />
    <div>
        <lew-title :size="14"> 毁灭性的变化 </lew-title>
        <ul>
            <li>
                废弃<lew-mark>LewTextarea</lew-mark>，改为使用<lew-mark>LewInput</lew-mark>的
                type 控制多行文本框，如 type="textarea"
            </li>
        </ul>
        <lew-title :size="14"> 新特性 </lew-title>
        <ul>
            <li>
                新增<lew-mark>Table</lew-mark>、
                <lew-mark>DatePicker</lew-mark>、
                <lew-mark>InputPro</lew-mark>、
                <lew-mark>Notification</lew-mark>、
                <lew-mark>Pagination</lew-mark>、 <lew-mark>Drawer</lew-mark>、
                <lew-mark>BackTop</lew-mark>。
            </li>
            <li>
                新增<lew-mark>Input</lew-mark>的长度限制、清空、密码可见、尺寸、显示字数。
            </li>
            <li>新增<lew-mark>Checkbox</lew-mark>的纯 tag 样式。</li>
        </ul>
        <lew-title :size="14"> 修复 </lew-title>
        <ul>
            <li>修复若干不为人知的 Bug</li>
        </ul>
        <lew-title :size="14"> 优化 </lew-title>
        <ul>
            <li>优化气泡的性能</li>
            <li>优化组件的引入方式</li>
        </ul>
        <lew-title :size="14"> 文档 </lew-title>
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
