<script setup lang="ts"></script>

<template>
  <div class="demo-wrapper">
    <lew-title>Icon</lew-title>
    <lew-alert type="error">
      <template #title>重要通知</template>
      <template #content
        >我们很抱歉地宣布，Icon组件将在<b>v2.4.0</b> 版本中被废弃。
        <br />这个决定是为了减少组件库的整体体积，除了组件本身所需的组件，将不再内置任何图标。<br /><br />我们感谢您的理解和支持。</template
      >
    </lew-alert>
  </div>
</template>
