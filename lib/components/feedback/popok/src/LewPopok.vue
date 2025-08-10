<script setup lang="ts">
import type { LewColor } from "lew-ui";
import { LewButton, LewPopover, locale } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import RenderComponent from "lew-ui/_components/RenderComponent.vue";

import { any2px } from "lew-ui/utils";
import { popokButtonProps } from "./props";

const props = defineProps(popokButtonProps);

const lewPopoverRef = ref();
const okLoading = ref(false);
const cancelLoading = ref(false);
const okRef = ref();

async function handleAction(action: "ok" | "cancel") {
  const actionFunction = props[action];
  const loadingRef = action === "ok" ? okLoading : cancelLoading;

  if (typeof actionFunction === "function") {
    loadingRef.value = true;
    const result = await actionFunction();
    if (result !== false) {
      hide();
    }
    loadingRef.value = false;
  }
}

const ok = () => handleAction("ok");
const cancel = () => handleAction("cancel");

function hide() {
  lewPopoverRef.value.hide();
}

onMounted(() => {
  nextTick(() => {
    if (okRef.value) okRef.value.focus();
  });
});
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
        <LewFlex direction="y" gap="20px" class="lew-popok-box" @click.stop>
          <LewFlex y="start">
            <div v-if="!hideIcon" class="lew-popok-box-left">
              <CommonIcon v-if="!icon" :type :size="24" />
              <RenderComponent v-else :render-fn="icon" />
            </div>
            <div class="lew-popok-box-right">
              <div class="lew-popok-box-right-header">
                <RenderComponent :render-fn="title" />
              </div>
              <div class="lew-popok-box-right-main">
                <RenderComponent :render-fn="content" />
              </div>
            </div>
          </LewFlex>
          <div class="lew-popok-box-footer">
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
              size="small"
              :color="type as LewColor"
              :loading="okLoading"
              @click.stop="ok"
            />
          </div>
        </LewFlex>
      </div>
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-popok {
  display: inline-block;
}

.lew-popok-box {
  position: relative;
  display: flex;
  width: 450px;
  height: auto;
  padding: 20px;
  border-radius: var(--lew-border-radius-large);
  background-color: var(--lew-modal-body-bgcolor);
  font-size: 0;
  .lew-popok-box-left {
    width: 28px;
    margin-left: -2.5px;
  }

  .lew-popok-box-right {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: calc(450px - 15px - 30px);

    .lew-popok-box-right-header {
      width: 100%;
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
    }

    .lew-popok-box-right-main {
      height: auto;
      font-size: 14px;
      color: var(--lew-text-color-5);
    }
  }

  .lew-popok-box-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
  }
}
</style>
