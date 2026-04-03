<script setup lang="ts">
// 1. 类型导入
import type { LewColor } from "lew-ui";
import type { LewDialogPopokFooterButtonItem } from "lew-ui/types";

// 2. 组件导入
import { LewButton, LewFlex, LewPopover, locale } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import RenderComponent from "lew-ui/_components/RenderComponent.vue";

// 3. 工具函数导入
import { any2px } from "lew-ui/utils";

// 4. 组件配置导入
import { popokButtonProps } from "./props";

// Props
const props = defineProps(popokButtonProps);

// 响应式状态
const lewPopoverRef = ref();
const primaryButtonRef = ref<{ $el?: HTMLElement } | null>(null);

// 计算属性
const popokBodyStyle = computed(() => ({
  width: any2px(props.width),
}));

const resolvedFooterButtons = computed<LewDialogPopokFooterButtonItem[]>(() => {
  if (props.footerButtons != null) {
    return props.footerButtons;
  }
  return [
    {
      props: {
        text: locale.t("popok.confirmText"),
        type: "fill",
        size: "small",
        color: props.type as LewColor,
      },
    },
  ];
});

function bindPrimaryButtonRef(el: any, index: number) {
  if (index === resolvedFooterButtons.value.length - 1) {
    primaryButtonRef.value = el;
  }
}

function footerButtonBind(item: LewDialogPopokFooterButtonItem) {
  const { request: _r, ...rest } = item.props ?? {};
  return rest;
}

async function mergeFooterRequest(item: LewDialogPopokFooterButtonItem) {
  const fn = item.props?.request;
  if (typeof fn === "function") {
    const result = await Promise.resolve(
      (fn as () => boolean | void | Promise<boolean | void>)()
    );
    if (result === false) {
      return;
    }
  }
  hide();
}

function hide() {
  lewPopoverRef.value.hide();
}

// 生命周期
onMounted(() => {
  nextTick(() => {
    primaryButtonRef.value?.$el?.focus?.();
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
      <div class="lew-popok-body" :style="popokBodyStyle">
        <LewFlex direction="y" gap="20px" class="lew-popok-box" @click.stop>
          <LewFlex y="start">
            <div v-if="!hideIcon" class="lew-popok-box-left">
              <CommonIcon v-if="!icon" :type="type" :size="24" />
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
          <div v-if="resolvedFooterButtons.length > 0" class="lew-popok-box-footer">
            <LewButton
              v-for="(item, index) in resolvedFooterButtons"
              :key="index"
              :ref="(el) => bindPrimaryButtonRef(el, index)"
              v-bind="footerButtonBind(item)"
              :request="() => mergeFooterRequest(item)"
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
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-modal-body-bgcolor);
  font-size: 0;

  .lew-popok-box-left {
    width: 28px;
    margin-left: -2.5px;
    flex-shrink: 0;
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
