<script setup lang="ts">
import { getIconType, object2class } from 'lew-ui/utils'
import type { AlertItem } from './alert'
import { alertProps } from './alert'

defineProps(alertProps)

const emit = defineEmits(['close'])

function alertClassName(item: AlertItem) {
  return object2class('lew-alert', { type: item.type })
}
</script>

<template>
  <div class="lew-alert-group">
    <div
      v-for="(item, i) in list"
      :key="i"
      class="lew-alert"
      :class="alertClassName(item)"
    >
      <div class="alert-icon">
        <lew-icon :size="16" :type="getIconType(item.type)" />
      </div>
      <div class="message">
        <div class="title">
          {{ item.title }}
        </div>
        <div v-show="item.content" class="content">
          {{ item.content }}
        </div>
      </div>
      <div v-if="item.closeable">
        <lew-icon
          :size="16"
          class="btn-close"
          type="x"
          @click="emit('close', i)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-alert-group {
    width: 100%;
    display: flex;
    flex-direction: column;

    .lew-alert {
        position: relative;
        display: inline-flex;
        align-items: flex-start;
        width: 100%;
        min-height: 32px;
        background-color: var(--lew-normal-color);
        border-radius: var(--lew-border-radius);
        margin-bottom: 10px;
        padding: 12px 18px;
        box-sizing: border-box;

        .alert-icon {
            margin: 2px 5px 0px 0px;
            display: inline-flex;
            align-items: center;
        }

        .btn-close {
            position: absolute;
            top: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 8px;
            border-radius: var(--lew-border-radius);
            box-sizing: border-box;
            cursor: pointer;
            user-select: none;
        }

        .btn-close:hover {
            background: rgba($color: #000000, $alpha: 0.05);
        }

        .btn-close:active {
            background: rgba($color: #000000, $alpha: 0.15);
        }

        .message {
            width: calc(100% - 80px);
            margin-left: 5px;

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
        color: var(--lew-text-color-2);
        background-color: var(--lew-normal-color-light);
    }

    .lew-alert-type-success {
        color: var(--lew-success-color-dark);
        background-color: var(--lew-success-color-light);
    }

    .lew-alert-type-warning {
        color: var(--lew-warning-color-dark);
        background-color: var(--lew-warning-color-light);
    }

    .lew-alert-type-error {
        color: var(--lew-error-color-dark);
        background-color: var(--lew-error-color-light);
    }

    .lew-alert-type-info {
        color: var(--lew-info-color-dark);
        background-color: var(--lew-info-color-light);
    }
}
</style>
