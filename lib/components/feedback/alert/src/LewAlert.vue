<script setup lang="ts">
import { object2class } from 'lew-ui/utils'
import LewCommonIcon from 'lew-ui/utils/LewCommonIcon.vue'
import { alertProps } from './props'

const props = defineProps(alertProps)

const emit = defineEmits(['close'])

const alertClassName = computed(() => {
  const { type } = props
  return object2class('lew-alert', { type })
})
</script>

<template>
  <div class="lew-alert" :class="alertClassName">
    <LewCommonIcon dark :size="18" :type />
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
    <LewCommonIcon
      v-if="closeable"
      class="lew-form-icon-close lew-alert-close-icon"
      type="close"
      @click="emit('close')"
    />
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
    width: calc(100% - 30px);
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
