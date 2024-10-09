<script setup lang="ts">
import { useRoute } from 'vue-router'
import TheSiderbar from '../layout/TheSiderbar.vue'
import LewRightNav from '../layout/LewRightNav.vue'
import type { MenuOptions } from 'lew-ui'
import { Menu } from 'lucide-vue-next'

const isShowSider = ref(false)
const route = useRoute()
const mainRef = ref()

onMounted(() => {
  const isInfo = localStorage.getItem('isInfo')
  if (!isInfo) {
    LewDialog.info({
      title: '温馨提示',
      content:
        '当前组件库仍处于开发测试状态，请勿用于生产环境，当前文档仍有很多地方未完善，持续更New中，敬请期待。',
      cancelText: '',
      okText: '知道了',
      ok: () => {
        localStorage.setItem('isInfo', '1')
      }
    })
  }
})

watch(route, () => {
  nextTick(() => {
    const componentMain = document.getElementById('component-main')
    if (componentMain) {
      componentMain.style.scrollBehavior = ''
      componentMain.scrollTop = 0
      componentMain.style.scrollBehavior = 'smooth'
    }
  })
  isShowSider.value = false
})

const options: MenuOptions[] = [
  {
    label: '基础',
    value: '基础',
    children: [
      {
        label: 'Image',
        value: '/Image'
      },
      {
        label: 'Avatar',
        value: '/Avatar'
      },
      {
        label: 'Button',
        value: '/Button'
      },

      {
        label: 'Tag',
        value: '/Tag'
      },
      {
        label: 'Badge',
        value: '/Badge'
      },
      {
        label: 'Title',
        value: '/Title'
      },
      {
        label: 'TextTrim',
        value: '/TextTrim'
      },
      {
        label: 'Flex',
        value: '/Flex'
      },
      {
        label: 'Mark',
        value: '/Mark'
      },
      {
        label: 'Icon',
        value: '/icon'
      }
    ]
  },

  {
    label: '导航',
    value: '导航',
    children: [
      {
        label: 'BackTop',
        value: '/BackTop'
      },
      {
        label: 'Steps',
        value: '/Steps'
      },
      {
        label: 'Menu',
        value: '/Menu'
      },
      {
        label: 'Dropdown',
        value: '/Dropdown'
      },
      {
        label: 'Breadcrumb',
        value: '/Breadcrumb'
      },
      {
        label: 'ContextMenu',
        value: '/ContextMenu',
        tagText: 'Beta',
        tagColor: 'green'
      }
    ]
  },
  {
    label: '表单',
    value: '表单',
    children: [
      {
        label: 'Form',
        value: '/Form'
      },
      {
        label: 'Input',
        value: '/Input'
      },
      {
        label: 'InputNumber',
        value: '/InputNumber'
      },
      {
        label: 'Textarea',
        value: '/Textarea'
      },
      {
        label: 'InputTag',
        value: '/InputTag'
      },
      {
        label: 'Checkbox',
        value: '/Checkbox'
      },
      {
        label: 'Radio',
        value: '/Radio'
      },
      {
        label: 'Tabs',
        value: '/Tabs'
      },
      {
        label: 'Select',
        value: '/Select'
      },
      {
        label: 'SelectMultiple',
        value: '/SelectMultiple'
      },
      {
        label: 'DatePicker',
        value: '/DatePicker'
      },
      {
        label: 'DateRangePicker',
        value: '/DateRangePicker'
      },
      {
        label: 'Cascader',
        value: '/Cascader'
      },
      {
        label: 'TreeSelect',
        value: '/TreeSelect'
      },
      {
        label: 'InputTable',
        value: '/InputTable',
        tagText: 'Dev',
        tagColor: 'blue'
      },
      {
        label: 'Switch',
        value: '/Switch'
      },

      {
        label: 'Slider',
        value: '/Slider'
      },

      {
        label: 'Upload',
        value: '/Upload'
      }
    ]
  },
  {
    label: '数据展示',
    value: '数据展示',
    children: [
      {
        label: 'Table',
        value: '/Table'
      },
      {
        label: 'Pagination',
        value: '/Pagination'
      },
      {
        label: 'MagicNumber',
        value: '/MagicNumber'
      },
      {
        label: 'Tree',
        value: '/Tree'
      },
      {
        label: 'Collapse',
        value: '/Collapse'
      }
    ]
  },
  {
    label: '反馈',
    value: '反馈',
    children: [
      {
        label: 'Alert',
        value: '/Alert'
      },
      {
        label: 'Message',
        value: '/Message'
      },
      {
        label: 'Notification',
        value: '/Notification'
      },
      {
        label: 'Drawer',
        value: '/Drawer'
      },
      {
        label: 'Dialog',
        value: '/Dialog'
      },
      {
        label: 'Modal',
        value: '/Modal'
      },
      {
        label: 'Popok',
        value: '/Popok'
      },
      {
        label: 'Popover',
        value: '/Popover'
      },

      {
        label: 'Tooltip',
        value: '/Tooltip'
      },
      {
        label: 'Loading',
        value: '/Loading'
      },
      {
        label: 'Result',
        value: '/Result'
      },
      {
        label: 'Empty',
        value: '/Empty'
      }
    ]
  }
].map((item: any) => {
  return {
    ...item,
    label: item.label + '（' + (item?.children || []).length + '）'
  }
})
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
      <the-siderbar :options="options" />
    </div>
    <div class="app-main lew-scrollbar">
      <div id="component-main" class="component-main lew-scrollbar">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <Component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
      <div class="component-nav"><lew-right-nav /></div>
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
    width: calc(100% - 280px);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 50px 50px 150px 50px;
  }

  .component-nav {
    height: 100%;
    width: 280px;
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
