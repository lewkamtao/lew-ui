<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="code-box">
    <!-- 标题和描述区域 -->
    <div v-if="title || description" class="code-header">
      <h3 v-if="title" class="code-title">
        {{ title }}
      </h3>
      <p v-if="description" class="code-description">
        {{ description }}
      </p>
    </div>

    <!-- 代码内容区域 -->
    <div class="hl-pre lew-scrollbar">
      <div class="pre-box">
        <highlightjs autodetect :code="code" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-box {
  margin: 50px 0px 50px 0px;
  border-radius: var(--lew-border-radius-small);
  overflow: hidden;
  background-color: var(--lew-bgcolor-0);

  .code-header {
    padding: 16px;
    .code-title {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.25;
    }

    .code-description {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
      opacity: 0.7;
    }
  }

  .hl-pre {
    margin: 0;
  }
}
</style>
