<script setup lang="ts">
import { LewFlex, LewEmpty } from "lew-ui/components";
import tippy from "tippy.js";
import LewContextMenu from "./LewContextMenu.vue";
import { getUniqueId } from "lew-ui/utils";
import { ContextMenus, contextMenuProps, initLewContextMenu } from "./index";
import Icon from "lew-ui/utils/Icon.vue";
const props = defineProps(contextMenuProps);

const emit = defineEmits(["select"]);

const clickItem = (item: ContextMenus, options: ContextMenus[]) => {
  emit("select", {
    item,
    parent: options,
    value: item.value,
  });
};

const uniqueId = getUniqueId();

let itemRefs = ref<(Element | globalThis.ComponentPublicInstance | null)[]>([]);
const initTippy = () => {
  itemRefs.value.forEach((el: any, index: number) => {
    const item = props.options[index];
    if (!el || item.disabled || (item.children || []).length === 0) {
      return;
    }
    const menuDom = document.createElement("div");
    createApp({
      render() {
        return h(LewContextMenu, {
          options: item.children,
          onSelect: (e: any) => {
            emit("select", e);
          },
        });
      },
    }).mount(menuDom);
    // 创建右键索引
    if (!window.LewContextMenu) {
      initLewContextMenu();
    }

    window.LewContextMenu.menuInstance[uniqueId] = tippy(el, {
      theme: "light",
      animation: "shift-away-subtle",
      trigger: "mouseenter",
      interactive: true,
      placement: "right-start",
      duration: [250, 250],
      delay: [120, 120],
      arrow: false,
      offset: [0, 0],
      allowHTML: true,
      hideOnClick: false,
      zIndex: 2001,
      content: menuDom,
    });

    window.LewContextMenu.menuInstance[uniqueId].popper.children[0].setAttribute(
      "data-lew",
      "popover"
    );
  });
};

const renderIcon = ({ renderIcon }: any) => {
  if (renderIcon) return renderIcon();
  return "";
};

onMounted(() => {
  initTippy();
});
onUnmounted(() => {
  if (window.LewContextMenu?.menuInstance[uniqueId]?.destroy) {
    window.LewContextMenu.menuInstance[uniqueId].destroy();
    delete window.LewContextMenu.menuInstance[uniqueId];
  }
});
</script>

<template>
  <lew-flex direction="y" gap="0" class="lew-context-menu">
    <template v-if="(options || []).length > 0">
      <div
        v-for="(item, index) in options"
        :key="index"
        class="lew-context-menu-box"
        :class="{
          'lew-context-menu-box-disabled': item.disabled,
          'lew-context-menu-box-divider-line': item.isDividerLine,
        }"
      >
        <div
          :ref="(el) => itemRefs.push(el)"
          @click="clickItem(item, options)"
          class="lew-context-menu-item"
          :style="{ 'animation-delay': index * 10 + 'ms' }"
          :class="{
            'lew-context-menu-item-active': item.active,
          }"
        >
          <div
            v-if="options.filter((e) => e.checkbox).length > 0"
            class="lew-context-menu-checkbox"
          >
            <Icon v-if="item.checked" :size="12" :stroke-width="2.5" type="check" />
          </div>
          <div class="lew-context-menu-label">
            <renderIcon v-if="item.renderIcon" :renderIcon="item.renderIcon" />
            <div class="lew-context-menu-label-text">
              {{ item.label }}
            </div>
          </div>
          <Icon
            v-if="options.filter((e) => e.children).length > 0"
            class="lew-context-menu-item-chevron"
            :style="{
              opacity: (item.children || []).length > 0 ? 1 : 0,
            }"
            :size="14"
            type="chevron-right"
          ></Icon>
        </div>
      </div>
    </template>
    <lew-empty
      width="120px"
      padding="5px"
      font-size="12px"
      v-else
      type="search"
      title="暂无操作"
    />
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-context-menu {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;

  .lew-context-menu-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-sizing: border-box;
    width: 100%;

    .lew-context-menu-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: var(--lew-text-color-1);
      box-sizing: border-box;
      border-radius: calc(var(--lew-border-radius-small) - 1px);
      padding: 0px 5px;
      animation: enterAni 0.3s cubic-bezier(0.3, 1.3, 0.3, 1) forwards;
      opacity: 0;
      @keyframes enterAni {
        0% {
          transform: translateX(-10px);
          opacity: 0;
        }
        100% {
          transform: translateX(0px);
          opacity: 1;
        }
      }
      .lew-context-menu-checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }
      .lew-context-menu-label {
        display: flex;
        align-items: center;
        flex: 1;
        gap: 5px;
        width: fit-content;
        user-select: none;
        font-size: 14px;
        height: 30px;
        padding: 0px 10px 0px 5px;
        line-height: 30px;
        box-sizing: border-box;
        cursor: pointer !important;
        .lew-context-menu-label-text {
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .lew-context-menu-item-chevron {
        flex-shrink: 0;
      }
    }

    .lew-context-menu-item-disabled {
      opacity: var(--lew-disabled-opacity);
      cursor: no-drop;
    }

    .lew-context-menu-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bgcolor-active);
    }
  }

  .lew-context-menu-box-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  .lew-context-menu-box-divider-line {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12px;
    overflow: hidden;
    .lew-context-menu-item {
      display: none;
    }
  }
  .lew-context-menu-box-divider-line::after {
    content: "";
    width: calc(100% - 20px);
    height: 1px;
    background-color: var(--lew-bgcolor-3);
  }
}
.lew-context-menu-item-active {
  .lew-context-menu-label-text {
    color: var(--lew-color-primary-dark);
  }
}
</style>
