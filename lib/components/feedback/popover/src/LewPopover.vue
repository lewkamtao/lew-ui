<script setup lang="ts">
// 1. 第三方库导入
import { watchDebounced } from "@vueuse/core";
// 2. 组件导入
import { LewLoading } from "lew-ui";

// 3. 工具函数导入
import { any2px } from "lew-ui/utils";

import tippy from "tippy.js";

// 4. 组件配置导入
import { popoverEmits } from "./emits";
import { popoverProps } from "./props";

// Props & Emits
const props = defineProps(popoverProps);
const emit = defineEmits(popoverEmits);

// Composables
const app = getCurrentInstance()?.appContext.app;
if (app && !app.directive("loading")) {
  app.use(LewLoading);
}

// 响应式状态
const triggerRef = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);
let instance: any = null;

// 常量
const watchOptions = { debounce: 250, maxWait: 1000 };

// Slots 检测
const slots = useSlots();
const hasTrigger = computed(() => !!slots.trigger);

// 计算属性
const triggerStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.triggerWidth) {
    style.width = any2px(props.triggerWidth);
  }
  if (hasTrigger.value) {
    style.display = "inline-block";
  }
  return style;
});

const popoverBodyStyle = computed(() => ({
  borderRadius: "var(--lew-border-radius-small)",
  overflow: props.loading ? "hidden" : "",
}));

// 方法
function initTippy() {
  if (instance || !triggerRef.value || !bodyRef.value) {
    return;
  }

  const { placement, offset, trigger, disabled } = props;
  let tippyTrigger: string = trigger;

  // 转换 trigger 值
  if (tippyTrigger === "hover") {
    tippyTrigger = "mouseenter";
  }
  if (!tippyTrigger) {
    tippyTrigger = "mouseenter";
  }

  instance = tippy(triggerRef.value as Element, {
    theme: "light",
    trigger: tippyTrigger,
    content: bodyRef.value as Element,
    animation: "shift-away-subtle",
    interactive: true,
    hideOnClick: tippyTrigger !== "mouseenter" ? props.hideOnClick : false,
    placement,
    duration: [250, 250],
    arrow: false,
    offset,
    delay: tippyTrigger === "mouseenter" ? props.delay : undefined,
    appendTo: () => document.body,
    allowHTML: true,
    maxWidth: "none",
    onShow() {
      emit("show");
    },
    onHide() {
      emit("hide");
    },
    onClickOutside() {
      if (props.clickOutsideToHide) {
        instance?.hide();
      }
    },
  });

  instance?.popper.children[0].setAttribute("data-lew", "popover");

  // 判断入参
  if (disabled && instance) {
    instance?.disable();
  }
}

function show() {
  instance?.show();
}

function hide() {
  instance?.hide();
}

function refresh() {
  instance?.setProps({});
}

// 监听器
watchDebounced(
  () => props.placement,
  (value: string) => {
    instance?.setProps({
      placement: value,
    });
  },
  watchOptions
);

watchDebounced(
  () => props.disabled,
  (value: boolean) => {
    if (value) {
      instance?.disable();
    } else {
      instance?.enable();
    }
  },
  watchOptions
);

watchDebounced(
  () => props.trigger,
  (value: string) => {
    instance?.setProps({
      trigger: value,
    });
  },
  watchOptions
);

watchDebounced(
  () => props.offset,
  (value: number[]) => {
    instance?.setProps({
      offset: value,
    });
  },
  watchOptions
);

// 生命周期
onActivated(() => {
  initTippy();
});

onMounted(() => {
  initTippy();
});

onDeactivated(() => {
  instance?.hide();
  instance?.destroy();
  instance = null;
});

onUnmounted(() => {
  instance?.hide();
  instance?.destroy();
});

// 暴露方法
defineExpose({ show, hide, refresh });
</script>

<template>
  <div class="lew-popover">
    <div ref="triggerRef" class="lew-popover-trigger" :style="triggerStyle">
      <slot name="trigger" />
    </div>
    <div
      ref="bodyRef"
      v-loading="{
        visible: loading,
        iconSize: 16,
      }"
      class="lew-popover-body"
      :class="popoverBodyClassName"
      :style="popoverBodyStyle"
    >
      <slot name="popover-body" :show="show" :hide="hide" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-popover {
  font-size: 0;

  .lew-popover-trigger {
    font-size: 0;

    > * {
      font-size: 14px;
    }
  }
}

.lew-popover-body {
  border-radius: var(--lew-border-radius-small);
}
</style>
