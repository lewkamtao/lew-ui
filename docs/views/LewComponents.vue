<script setup lang="ts">
import docsLocale from "docs/locals";
import { Menu } from "lucide-vue-next";
import { useRoute } from "vue-router";
import LewRightNav from "../layout/LewRightNav.vue";
import TheSiderbar from "../layout/TheSiderbar.vue";

const isShowSider = ref(false);
const route = useRoute();

onMounted(() => {
  const isComplete: string[] = [];

  setTimeout(() => {
    const menuItems = document.getElementsByClassName("lew-menu-item");
    for (let i = 0; i < menuItems.length; i++) {
      // 寻找lew-text-trim-wrapper
      const dom = menuItems[i].querySelector(".lew-text-trim-wrapper");
      if (dom) {
        if (isComplete.includes(dom.textContent as string)) {
          (dom as HTMLElement).style.opacity = "0.2";
        }
      }
    }
  }, 500);
});

watch(route, () => {
  nextTick(() => {
    const componentMain = document.getElementById("component-main");
    if (componentMain) {
      componentMain.scrollTop = 0;
    }
  });
  isShowSider.value = false;
});

const options = computed(() => {
  return [
    {
      label: docsLocale.t("base.base"),
      value: docsLocale.t("base.base"),
      children: [
        {
          label: "Image",
          value: "/Image",
        },
        {
          label: "Avatar",
          value: "/Avatar",
        },
        {
          label: "Button",
          value: "/Button",
        },

        {
          label: "Tag",
          value: "/Tag",
        },
        {
          label: "Badge",
          value: "/Badge",
        },
        {
          label: "Title",
          value: "/Title",
        },
        {
          label: "TextTrim",
          value: "/TextTrim",
        },
        {
          label: "Flex",
          value: "/Flex",
        },
        {
          label: "Mark",
          value: "/Mark",
        },
        {
          label: "Icon",
          value: "/Icon",
        },
      ],
    },
    {
      label: docsLocale.t("base.navigation"),
      value: docsLocale.t("base.navigation"),
      children: [
        {
          label: "BackTop",
          value: "/BackTop",
        },
        {
          label: "Steps",
          value: "/Steps",
        },
        {
          label: "Menu",
          value: "/Menu",
        },
        {
          label: "MenuTree",
          value: "/MenuTree",
        },
        {
          label: "Dropdown",
          value: "/Dropdown",
        },
        {
          label: "Breadcrumb",
          value: "/Breadcrumb",
        },
        {
          label: "ContextMenu",
          value: "/ContextMenu",
          tagProps: {
            text: "New",
            type: "ghost",
            round: true,
            color: "green",
          },
        },
        {
          label: "ActionBox",
          value: "/ActionBox",
          tagProps: {
            text: "New",
            color: "green",
            type: "ghost",
            round: true,
          },
        },
      ],
    },
    {
      label: docsLocale.t("base.form"),
      value: docsLocale.t("base.form"),
      children: [
        {
          label: "Form",
          value: "/Form",
        },
        {
          label: "Input",
          value: "/Input",
        },
        {
          label: "InputNumber",
          value: "/InputNumber",
        },
        {
          label: "Textarea",
          value: "/Textarea",
        },
        {
          label: "InputTag",
          value: "/InputTag",
        },
        {
          label: "Checkbox",
          value: "/Checkbox",
        },
        {
          label: "Radio",
          value: "/Radio",
        },
        {
          label: "Tabs",
          value: "/Tabs",
        },
        {
          label: "Select",
          value: "/Select",
        },

        {
          label: "DatePicker",
          value: "/DatePicker",
        },
        {
          label: "DateRangePicker",
          value: "/DateRangePicker",
        },
        {
          label: "Cascader",
          value: "/Cascader",
        },
        {
          label: "CascaderMultiple",
          value: "/CascaderMultiple",
          tagProps: {
            text: "Beta",
            type: "ghost",
            round: true,
            color: "red",
          },
        },
        {
          label: "TreeSelect",
          value: "/TreeSelect",
        },
        // {
        //   label: 'TreeSelectMultiple',
        //   value: '/TreeSelectMultiple',
        // },
        {
          label: "InputTable",
          value: "/InputTable",
          tagProps: {
            text: "New",
            type: "ghost",
            round: true,
            color: "green",
          },
        },
        {
          label: "Switch",
          value: "/Switch",
        },

        {
          label: "Slider",
          value: "/Slider",
        },
        {
          label: "SliderRange",
          value: "/SliderRange",
        },
        {
          label: "Rate",
          value: "/Rate",
          tagProps: {
            text: "New",
            type: "ghost",
            round: true,
            color: "green",
          },
        },
        {
          label: "ColorPicker",
          value: "/ColorPicker",
        },
        {
          label: "Upload",
          value: "/Upload",
        },
      ],
    },
    {
      label: docsLocale.t("base.data"),
      value: docsLocale.t("base.data"),
      children: [
        {
          label: "Table",
          value: "/Table",
        },
        {
          label: "Pagination",
          value: "/Pagination",
        },
        {
          label: "Tree",
          value: "/Tree",
        },

        {
          label: "Collapse",
          value: "/Collapse",
        },
        {
          label: "Desc",
          value: "/Desc",
        },
      ],
    },
    {
      label: docsLocale.t("base.feedback"),
      value: docsLocale.t("base.feedback"),
      children: [
        {
          label: "Alert",
          value: "/Alert",
        },
        {
          label: "Message",
          value: "/Message",
          tagProps: {
            text: "func",
            type: "ghost",
            round: true,
          },
        },
        {
          label: "Notification",
          value: "/Notification",
          tagProps: {
            text: "func",
            type: "ghost",
            round: true,
          },
        },
        {
          label: "Drawer",
          value: "/Drawer",
        },
        {
          label: "Dialog",
          value: "/Dialog",
          tagProps: {
            text: "func",
            type: "ghost",
            round: true,
          },
        },
        {
          label: "Modal",
          value: "/Modal",
        },
        {
          label: "Popok",
          value: "/Popok",
        },
        {
          label: "Popover",
          value: "/Popover",
        },

        {
          label: "Tooltip",
          value: "/Tooltip",
        },
        {
          label: "Loading",
          value: "/Loading",
        },
        {
          label: "Empty",
          value: "/Empty",
        },
      ],
    },
  ].map((item: any) => {
    return {
      ...item,
      label: `${item.label}（${(item?.children || []).length}）`,
    };
  });
});
</script>

<template>
  <div class="container">
    <div
      class="mb-btn"
      :class="{ 'mb-btn-open': isShowSider }"
      @click="isShowSider = !isShowSider"
    >
      <Menu :size="24" />
    </div>
    <div class="sider" :class="{ 'sider-open': isShowSider }">
      <TheSiderbar :options="options" />
    </div>
    <div class="app-main lew-scrollbar">
      <div id="component-main" class="component-main lew-scrollbar">
        <router-view />
      </div>
      <div class="component-nav">
        <LewRightNav />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 60px);
  display: flex;
}

.sider {
  position: fixed;
  top: 59px;
  height: calc(100vh - 58px);
  background-color: var(--lew-bgcolor-0);
}

.app-main {
  margin-left: var(--lew-siderbar-width);
  width: calc(100% - var(--lew-siderbar-width));
  height: calc(100vh - 60px);
  background: var(--lew-bgcolor-2);
  display: flex;
  box-sizing: border-box;

  .component-main {
    width: calc(100% - var(--lew-component-nav-width));
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 50px 50px 150px 50px;
  }

  .component-nav {
    height: 100%;
    width: var(--lew-component-nav-width);
  }
}

.mb-btn {
  display: none;
}

@media (max-width: 767px) {
  .mb-btn {
    position: fixed;
    left: 0px;
    top: 59px;
    z-index: 99;
    display: inline-flex;
    align-items: center;
    background-color: var(--lew-color-primary);
    padding: 5px 7px;
    color: #fff;
    transition: all 0.85s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .mb-btn-open {
    transform: translateX(var(--lew-siderbar-width));
  }

  .sider {
    transform: translateX(-100%);
    transition: transform 0.85s cubic-bezier(0.65, 0, 0.35, 1);
    z-index: 99999;
  }

  .sider-open {
    transform: translateX(0%);
  }

  .app-main {
    width: 100%;
    margin-left: 0px;

    .component-main {
      width: 100%;
      padding: 50px 15px;
    }

    .component-nav {
      display: none;
    }
  }
}
</style>
