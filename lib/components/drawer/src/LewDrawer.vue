<script lang="ts" setup>
import { ref, watch } from "vue";
import { object2class, any2px, getUniqueId } from "lew-ui/utils";
import { useDOMCreate } from "lew-ui/hooks";
import { LewButton, LewFlex } from "lew-ui";
import { drawerProps } from "./props";
import { useMagicKeys, onClickOutside } from "@vueuse/core";
import Icon from "lew-ui/utils/Icon.vue";
import { locale } from "lew-ui";
const { Escape } = useMagicKeys();

useDOMCreate("lew-drawer");

const emit = defineEmits(["close"]);

const visible: Ref<boolean | undefined> = defineModel("visible");

const props = defineProps(drawerProps);
const drawerBodyRef = ref(null);
const drawerId = `lew-drawer-${getUniqueId()}`;

onClickOutside(drawerBodyRef, (e) => {
  if (visible.value && props.closeOnClickOverlay) {
    const { parentElement } = e?.target as Element;
    if (parentElement?.id === drawerId) {
      visible.value = false;
    }
  }
});

if (props.closeByEsc) {
  watch(Escape, (v) => {
    if (!visible.value || !v) {
      return;
    }

    const dialogEl = document.getElementById("lew-dialog");
    const drawerEl = document.getElementById(drawerId);
    const hasDialog = dialogEl && dialogEl.children.length > 0;

    const isOpenDrawer = Array.from(drawerEl?.parentElement?.childNodes ?? [])
      .filter((e): e is Element => e instanceof Element)
      .filter((e) => e.children.length > 0);

    const topDrawer =
      isOpenDrawer[isOpenDrawer.length - 1]?.id === drawerId && drawerEl;

    if (!hasDialog && topDrawer) {
      visible.value = false;
    }
  });
}

const getStyle = (
  position: string,
  width: number | string,
  height: number | string
) => {
  switch (true) {
    case !position:
      return "width:30%;height:100%";

    case position === "left":
      return `width:${any2px(width)};height:100vh`;

    case position === "right":
      return `width:${any2px(width)};height:100vh`;

    case position === "top":
      return `width:100vw;height:${any2px(height)}`;

    case position === "bottom":
      return `width:100vw;height:${any2px(height)}`;

    default:
      break;
  }
};

const getIconSize = computed(() => {
  const sizeMap = {
    small: 14,
    medium: 16,
    large: 18,
  };
  return sizeMap[props.size as keyof typeof sizeMap];
});

const close = () => {
  visible.value = false;
  emit("close");
};

const getTitleSize = computed(() => {
  const sizeMap = {
    small: 14,
    medium: 16,
    large: 18,
  };
  return sizeMap[props.size as keyof typeof sizeMap];
});
</script>
<template>
  <teleport to="#lew-drawer">
    <div class="lew-modal-container" :id="drawerId">
      <transition name="lew-drawer-mask">
        <div :style="{ zIndex }" v-if="visible" class="lew-drawer-mask"></div>
      </transition>
      <div
        ref="drawerBodyRef"
        :style="`${getStyle(position, width, height)}; z-index:${zIndex}`"
        class="lew-drawer-body"
        :class="`${object2class('lew-drawer-body', { position })} ${
          visible ? 'lew-drawer-body-show' : ''
        }`"
      >
        <div v-if="$slots.header" class="lew-drawer-header-slot">
          <slot name="header"></slot>
        </div>
        <lew-flex
          v-else-if="title"
          mode="between"
          y="center"
          class="lew-drawer-header"
        >
          <lew-text-trim
            class="lew-drawer-title"
            :text="title"
            :style="{ fontSize: getTitleSize + 'px' }"
          />
          <lew-button
            type="light"
            color="gray"
            round
            single-icon
            size="small"
            class="lew-drawer-icon-close"
            @click="close"
          >
            <Icon :size="getIconSize" type="close" />
          </lew-button>
        </lew-flex>
        <div class="lew-drawer-body-slot">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="lew-drawer-footer-slot">
          <slot name="footer"></slot>
        </div>
        <lew-flex
          v-else-if="!hideFooter"
          x="end"
          y="center"
          class="lew-drawer-footer"
        >
          <lew-button
            v-bind="{
              type: 'text',
              text: locale.t('drawer.close'),
              color: 'normal',
              request: close,
              ...(closeButtonProps as any)
            }"
          />
          <lew-button
            v-bind="{
              text: locale.t('drawer.ok'),
              color: 'primary',
              ...(okButtonProps as any)
            }"
          />
        </lew-flex>
      </div>
    </div>
  </teleport>
</template>
<style lang="scss">
.lew-drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--lew-modal-bgcolor);
}

.lew-drawer-body {
  position: fixed;
  transition: all 0.25s ease;
  background: var(--lew-modal-body-bgcolor);
  display: flex;
  flex-direction: column;
  .lew-drawer-header {
    position: relative;
    padding: 15px 20px;
    flex: 0;

    .lew-drawer-title {
      font-size: 16px;
      font-weight: bold;
    }

    .lew-drawer-icon-close {
      position: absolute;
      width: auto;
      height: auto;
      padding: 5px;
      top: 10px;
      right: 10px;
    }
  }
}

.lew-drawer-body-slot {
  flex: 1;
  overflow: hidden;
}

.lew-drawer-footer {
  padding: 20px;
  flex: 0;
}

.lew-drawer-header-slot {
  background-color: var(--lew-bgcolor-1);
  flex: 0;
}

.lew-drawer-footer-slot {
  background-color: var(--lew-bgcolor-1);
  flex: 0;
}

.lew-drawer-body-position-right {
  right: 0;
  top: 0;
  transform: translateX(100%);
}

.lew-drawer-body-position-top {
  left: 0;
  top: 0;
  transform: translateY(-100%);
}

.lew-drawer-body-position-left {
  left: 0;
  top: 0;
  transform: translateX(-100%);
}

.lew-drawer-body-position-bottom {
  left: 0;
  bottom: 0;
  transform: translateY(100%);
}

.lew-drawer-body-show {
  transform: translate(0, 0);
}

.lew-drawer-mask-enter-active,
.lew-drawer-mask-leave-active {
  transition: all var(--lew-form-transition-ease);
}

.lew-drawer-mask-enter-from,
.lew-drawer-mask-leave-to {
  opacity: 0;
}
</style>
