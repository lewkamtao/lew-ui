<script setup lang="ts">
import { object2class } from 'lew-ui/utils'
import type { AlertItem } from './props'
import { alertProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'

defineProps(alertProps)

const emit = defineEmits(['close'])

const alertClassName = (item: AlertItem) => {
  return object2class('lew-alert', { type: item.type })
}
</script>

<template>
  <div class="lew-alert-group">
    <div
      v-for="(item, i) in options"
      :key="i"
      class="lew-alert"
      :class="alertClassName(item)"
    >
      <Icon dark :size="18" :type="item.type"></Icon>
      <div class="message">
        <div class="title">{{ item.title }}</div>
        <div v-show="item.content" class="content">
          {{ item.content }}
        </div>
      </div>

      <Icon
        v-if="item.closeable"
        @click="emit('close', i)"
        class="lew-form-icon-clear"
        type="close"
      ></Icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-alert-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .lew-alert {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    width: 100%;
    min-height: 32px;
    background-color: var(--lew-color-normal);
    border-radius: var(--lew-border-radius-small);
    padding: 12px 18px;
    box-sizing: border-box;
    color: var(--lew-text-color-1);
    background-color: var(--lew-bgcolor-1);
    overflow: hidden;

    .alert-icon {
      width: 18px;
      height: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .lew-form-icon-clear {
      top: 11px;
      right: 11px;
      transform: none;
    }

    .message {
      width: calc(100% - 30px);
      margin-left: 12px;
      margin-top: -1px;
      .title {
        font-size: 14px;
        width: 100%;
        word-wrap: break-word;
        white-space: pre-line;
        font-weight: 400;
      }

      .content {
        margin-top: 8px;
        font-size: 14px;
        width: 100%;
        font-weight: 300;
        word-wrap: break-word;
        white-space: pre-line;
      }
    }
  }

  .lew-alert-type-normal {
    color: var(--lew-color-normal-dark);
    background-color: var(--lew-color-normal-light);
  }

  .lew-alert-type-success {
    color: var(--lew-color-success-dark);
    background-color: var(--lew-color-success-light);
  }

  .lew-alert-type-warning {
    color: var(--lew-color-warning-dark);
    background-color: var(--lew-color-warning-light);
  }

  .lew-alert-type-error {
    color: var(--lew-color-error-dark);
    background-color: var(--lew-color-error-light);
  }

  .lew-alert-type-info {
    color: var(--lew-color-info-dark);
    background-color: var(--lew-color-info-light);
  }
}
</style>
