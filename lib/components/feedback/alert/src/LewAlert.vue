<script setup lang="ts">
// 1. 组件导入
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'

// 2. 工具函数导入
import { object2class } from 'lew-ui/utils'

// 3. 组件配置导入
import { alertProps } from './props'

// Props & Emits
const props = defineProps(alertProps)

// Slots 检测
const slots = useSlots()
const hasTitle = computed(() => !!slots.title || !!props.title)
const hasContent = computed(() => !!slots.content || !!props.content)
const hasFooter = computed(() => !!slots.footer)

// 计算属性
const alertClassName = computed(() => {
  const { type } = props
  return object2class('lew-alert', { type })
})
</script>

<template>
  <div class="lew-alert" :class="alertClassName">
    <CommonIcon dark :size="18" :type="props.type" />
    <div class="lew-alert-message">
      <div v-if="hasTitle" class="lew-alert-title">
        <slot v-if="slots.title" name="title" />
        <template v-else>
          {{ props.title }}
        </template>
      </div>

      <div v-if="hasContent" class="lew-alert-content">
        <slot v-if="slots.content" name="content" />
        <template v-else>
          {{ props.content }}
        </template>
      </div>

      <div v-if="hasFooter" class="lew-alert-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-alert {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  min-height: 32px;
  padding: 12px 18px;
  overflow: hidden;
  color: var(--lew-text-color-1);
  background-color: var(--lew-bgcolor-1);
  border-radius: var(--lew-border-radius-small);

  .lew-alert-message {
    width: 100%;
    margin-left: 12px;

    .lew-alert-title {
      width: 100%;
      font-weight: bold;
      font-size: 14px;
      white-space: pre-line;
      word-wrap: break-word;
    }

    .lew-alert-content {
      width: 100%;
      margin-top: 8px;
      font-size: 14px;
      white-space: pre-line;
      word-wrap: break-word;
    }

    .lew-alert-footer {
      margin-top: 8px;
    }
  }
}

.lew-alert-type-normal {
  color: var(--lew-color-alert-normal-text);
  background-color: var(--lew-color-alert-normal-bg);
}

.lew-alert-type-success {
  color: var(--lew-color-alert-success-text);
  background-color: var(--lew-color-alert-success-bg);
}

.lew-alert-type-warning {
  color: var(--lew-color-alert-warning-text);
  background-color: var(--lew-color-alert-warning-bg);
}

.lew-alert-type-error {
  color: var(--lew-color-alert-error-text);
  background-color: var(--lew-color-alert-error-bg);
}

.lew-alert-type-info {
  color: var(--lew-color-alert-info-text);
  background-color: var(--lew-color-alert-info-bg);
}
</style>
