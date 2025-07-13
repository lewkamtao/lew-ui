<script setup lang="ts">
import { object2class } from 'lew-ui/utils'
import { alertProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'

const props = defineProps(alertProps)

const emit = defineEmits(['close'])

const alertClassName = computed(() => {
  const { type } = props
  return object2class('lew-alert', { type })
})
</script>

<template>
  <div class="lew-alert" :class="alertClassName">
    <Icon dark :size="18" :type></Icon>
    <div class="lew-alert-message">
      <div v-if="$slots.title" class="lew-alert-title">
        <slot name="title" />
      </div>
      <div v-else class="lew-alert-title">
        {{ title }}
      </div>

      <div v-if="$slots.content" class="lew-alert-content">
        <slot name="content" />
      </div>
      <div v-else-if="content" class="lew-alert-content">
        {{ content }}
      </div>

      <div v-if="$slots.footer" class="lew-alert-footer">
        <slot name="footer" />
      </div>
    </div>
    <Icon
      v-if="closeable"
      @click="emit('close')"
      class="lew-form-icon-close lew-alert-close-icon"
      type="close"
    ></Icon>
  </div>
</template>

<style lang="scss" scoped>
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

  .lew-alert-message {
    width: calc(100% - 30px);
    margin-left: 12px;
    .lew-alert-title {
      font-size: 14px;
      width: 100%;
      word-wrap: break-word;
      white-space: pre-line;
      font-weight: bold;
    }

    .lew-alert-content {
      margin-top: 8px;
      font-size: 14px;
      width: 100%;
      word-wrap: break-word;
      white-space: pre-line;
    }
    .lew-alert-footer {
      margin-top: 8px;
    }
  }

  .lew-alert-close-icon {
    top: 11px;
    right: 11px;
    transform: none;
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
</style>
