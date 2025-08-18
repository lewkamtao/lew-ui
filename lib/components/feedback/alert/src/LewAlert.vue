<script setup lang="ts">
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'
import { computed } from 'vue'
import { alertEmits } from './emits'
import { alertProps } from './props'

const props = defineProps(alertProps)
const emit = defineEmits(alertEmits)

// Computed
const alertClassName = computed(() => {
  const { type } = props
  return object2class('lew-alert', { type })
})

// Methods
function handleClose(): void {
  emit('close')
}
</script>

<template>
  <div class="lew-alert" :class="alertClassName">
    <CommonIcon dark :size="18" :type="props.type" />
    <div class="lew-alert-message">
      <div v-if="$slots.title" class="lew-alert-title">
        <slot name="title" />
      </div>
      <div v-else-if="props.title" class="lew-alert-title">
        {{ props.title }}
      </div>

      <div v-if="$slots.content" class="lew-alert-content">
        <slot name="content" />
      </div>
      <div v-else-if="props.content" class="lew-alert-content">
        {{ props.content }}
      </div>

      <div v-if="$slots.footer" class="lew-alert-footer">
        <slot name="footer" />
      </div>
    </div>
    <CommonIcon
      v-if="props.closeable"
      class="lew-form-icon-close lew-alert-close-icon"
      type="close"
      @click="handleClose"
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
