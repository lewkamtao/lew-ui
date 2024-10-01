<!-- filename: Popover.vue -->
<script setup lang="ts">
import { LewButton, LewPopover } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { popokProps } from './props'

const props = defineProps(popokProps)

const lewPopoverRef = ref()

const ok = () => {
  if (!props.okProps.request) {
    hide()
  }
  emit('ok')
}

const cancel = () => {
  if (!props.cancelProps.request) {
    hide()
  }
  emit('cancel')
}

const hide = () => {
  lewPopoverRef.value.hide()
}
defineExpose({ hide })

const emit = defineEmits(['show', 'ok', 'cancel'])
</script>

<template>
  <lew-popover
    ref="lewPopoverRef"
    class="lew-popok"
    :trigger="trigger"
    :placement="placement"
    @show="emit('show')"
  >
    <template #trigger>
      <slot></slot>
    </template>
    <template #popover-body>
      <div
        class="lew-popok-body"
        :style="{
          width: any2px(width)
        }"
      >
        <div class="lew-popok-left">
          <Icon :size="24" :type />
        </div>
        <div class="lew-popok-right">
          <div v-if="title" class="lew-popok-title">{{ title }}</div>
          <div v-if="content" class="lew-popok-content">{{ content }}</div>
          <div class="lew-popok-footer">
            <lew-button
              v-bind="{
                text: '取消',
                size: 'small',
                type: 'text',
                color: 'normal',
                ...(cancelProps as any)
              }"
              @click="cancel"
            />
            <lew-button
              v-bind="{
                text: '确定',
                color: type,
                size: 'small',
                ...(okProps as any)
              }"
              @click="ok"
            />
          </div>
        </div>
      </div>
    </template>
  </lew-popover>
</template>

<style lang="scss" scoped>
.lew-popok {
  display: inline-block;
}

.lew-popok-body {
  display: flex;
  padding: 15px;

  .lew-popok-left {
    width: 30px;
    margin-right: 12px;

    .lew-popok-icon-success {
      color: var(--lew-color-success);
    }

    .lew-popok-icon-warning {
      color: var(--lew-color-warning);
    }

    .lew-popok-icon-normal {
      color: var(--lew-color-normal);
    }

    .lew-popok-icon-info {
      color: var(--lew-color-info);
    }

    .lew-popok-icon-error {
      color: var(--lew-color-error);
    }
  }

  .lew-popok-right {
    width: calc(100% - 30px);

    .lew-popok-title {
      width: 100%;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .lew-popok-content {
      width: 100%;
      font-size: 14px;
      margin-bottom: 15px;
    }

    .lew-popok-footer {
      width: 100%;
      display: flex;
      justify-content: end;

      .lew-button {
        margin-left: 10px;
      }
    }
  }
}
</style>
