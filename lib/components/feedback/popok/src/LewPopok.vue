<script setup lang="ts">
import type { LewColor } from 'lew-ui'
import { LewButton, LewPopover, locale } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { popokButtonProps } from './props'

const props = defineProps(popokButtonProps)

const lewPopoverRef = ref()
const okLoading = ref(false)
const cancelLoading = ref(false)
const okRef = ref()

async function handleAction(action: 'ok' | 'cancel') {
  const actionFunction = props[action]
  const loadingRef = action === 'ok' ? okLoading : cancelLoading

  if (typeof actionFunction === 'function') {
    loadingRef.value = true
    const result = await actionFunction()
    if (result !== false) {
      hide()
    }
    loadingRef.value = false
  }
}

const ok = () => handleAction('ok')
const cancel = () => handleAction('cancel')

function hide() {
  lewPopoverRef.value.hide()
}

onMounted(() => {
  nextTick(() => {
    if (okRef.value)
      okRef.value.focus()
  })
})
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    class="lew-popok"
    :trigger="trigger"
    :placement="placement"
  >
    <template #trigger>
      <slot />
    </template>
    <template #popover-body>
      <div
        class="lew-popok-body"
        :style="{
          width: any2px(width),
        }"
      >
        <div class="lew-popok-left">
          <CommonIcon :size="24" :type />
        </div>
        <div class="lew-popok-right">
          <div v-if="title" class="lew-popok-title">
            {{ title }}
          </div>
          <div v-if="content" class="lew-popok-content">
            {{ content }}
          </div>
          <div class="lew-popok-footer">
            <LewButton
              :text="cancelText || locale.t('popok.cancelText')"
              color="gray"
              type="light"
              size="small"
              :loading="cancelLoading"
              @click.stop="cancel"
            />
            <LewButton
              ref="okRef"
              :text="okText || locale.t('popok.okText')"
              type="fill"
              :color="type as LewColor"
              size="small"
              :loading="okLoading"
              @click.stop="ok"
            />
          </div>
        </div>
      </div>
    </template>
  </LewPopover>
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
    margin-right: 5px;

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
