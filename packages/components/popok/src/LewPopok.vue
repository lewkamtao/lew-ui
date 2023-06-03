<!-- filename: Popover.vue -->
<script setup lang="ts">
import { LewButton } from 'lew-ui'
import { _props } from './props'

const props = defineProps(_props)

const emit = defineEmits(['show', 'cancel'])

const lewPopoverRef = ref()

const okLoading = ref(false)
const cancelLoading = ref(false)

function hide() {
  lewPopoverRef.value.hide()
}

async function okHandle() {
  if (typeof props.ok === 'function') {
    okLoading.value = true
    await props.ok()
    okLoading.value = false
  }
  hide()
}

async function cancelHandle() {
  if (typeof props.cancel === 'function') {
    cancelLoading.value = true
    await props.cancel()
    cancelLoading.value = false
  }
  hide()
}
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
      <slot />
    </template>
    <template #popover-body>
      <div class="lew-popok-body" :style="`width:${width}`">
        <div class="left">
          <div :class="`icon-${type}`">
            <lew-icon
              v-if="type === `normal`"
              size="22"
              type="info"
            />
            <lew-icon
              v-if="type === `warning`"
              size="22"
              type="alert-triangle"
            />
            <lew-icon
              v-if="type === `success`"
              size="22"
              type="check"
            />
            <lew-icon
              v-if="type === `error`"
              size="22"
              type="alert-circle"
            />
            <lew-icon
              v-if="type === `info`"
              size="22"
              type="bell"
            />
          </div>
        </div>
        <div class="right">
          <div v-if="title" class="title">
            {{ title }}
          </div>
          <div v-if="content" class="content">
            {{ content }}
          </div>
          <div class="footer">
            <LewButton
              text="取消"
              size="small"
              type="blank"
              :loading="cancelLoading"
              @click="cancelHandle"
            />
            <LewButton
              text="确定"
              size="small"
              :loading="okLoading"
              @click="okHandle"
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
    padding: 10px;

    .left {
        width: 30px;
        margin-right: 5px;

        .icon-success {
            color: var(--lew-success-color-dark);
        }

        .icon-warning {
            color: var(--lew-warning-color-dark);
        }

        .icon-normal {
            color: var(--lew-normal-color-dark);
        }

        .icon-info {
            color: var(--lew-info-color-dark);
        }

        .icon-error {
            color: var(--lew-error-color-dark);
        }
    }

    .right {
        width: calc(100% - 30px);

        .title {
            width: 100%;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .content {
            width: 100%;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .footer {
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
