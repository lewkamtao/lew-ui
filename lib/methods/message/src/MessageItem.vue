<script lang="ts" setup>
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'

defineProps<{
  type: string
  content: string
}>()
</script>

<template>
  <div class="lew-message-item" :class="[`lew-message-item-${type}`]">
    <CommonIcon
      :type="type"
      :size="18"
      :stroke-width="type === 'loading' ? 2.5 : 2"
      :loading="type === 'loading'"
    />
    <div class="lew-message-content">
      {{ content }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-message-item {
  display: flex;
  align-items: center;
  padding: 12px 20px 12px 14px;
  font-size: 14px;
  white-space: nowrap;
  background-color: var(--lew-pop-bgcolor);
  border: var(--lew-pop-border);
  border-radius: 12px;
  box-shadow: var(--lew-pop-shadow);
  box-sizing: border-box;
  user-select: none;

  .lew-message-content {
    max-width: 350px;
    overflow: hidden;
    color: var(--lew-text-color-1);
    font-weight: 400;
    text-overflow: ellipsis;
  }

  :deep(.lew-icon) {
    flex-shrink: 0;
    margin-right: 10px;
  }
}

.lew-message-item-normal {
  color: var(--lew-color-normal);
}

.lew-message-item-error {
  color: var(--lew-color-error);
}

.lew-message-item-success {
  color: var(--lew-color-success);
}

.lew-message-item-info {
  color: var(--lew-color-info);
}

.lew-message-item-warning {
  color: var(--lew-color-warning);
}

.lew-message-item-loading {
  color: var(--lew-color-normal);
}
</style>
