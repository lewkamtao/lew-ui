<script setup lang="ts">
import { tabsProps } from './props'
import type { TabsOptions } from './props'
import { object2class, any2px } from 'lew-ui/utils'

const emit = defineEmits(['change'])
const props = defineProps(tabsProps)
const tabsValue: Ref<string | number | undefined> = defineModel({
  required: true,
})

const tabsRef = ref()
const itemRef = ref([] as any)

const state = reactive({
  activeItemStyle: {} as any,
  curIndex: (props.options || []).findIndex(
    (e: TabsOptions) => tabsValue.value === e.value,
  ),
  hidLine: 'all',
  isInit: false,
})

watch(
  () => tabsValue.value,
  (v: string | number | undefined) => {
    nextTick(() => {
      selectItem(v, 'watch')
      init()
    })
  },
  { deep: true },
)

const initActiveItemStyle = (index: number) => {
  const activeRef = itemRef.value[index]

  // 确保 tabsRef 存在，避免访问 null 的属性
  if (!tabsRef.value || !activeRef) {
    return
  }

  if (
    tabsRef.value.scrollWidth > tabsRef.value.clientWidth &&
    activeRef?.offsetLeft >= 0
  ) {
    tabsRef.value.scrollLeft =
      activeRef?.offsetLeft -
      tabsRef.value.clientWidth / 2 +
      activeRef?.offsetWidth / 2
  }

  state.activeItemStyle = {
    width: `${activeRef?.offsetWidth}px`,
    height: props.type === 'line' ? '' : `${activeRef?.offsetHeight}px`,
    transform: `translate(${activeRef?.offsetLeft}px,-50%)`,
  }
}

watch(
  () => props.size,
  () => {
    nextTick(() => {
      setTimeout(() => {
        const index = props.options.findIndex(
          (e) => tabsValue.value === e.value,
        )
        initActiveItemStyle(index)
      }, 250)
    })
  },
)

const init = () => {
  let index = props.options.findIndex((e) => e.value === tabsValue.value)
  if (index >= 0) {
    initActiveItemStyle(index)
  }
  tabsScroll()
  setTimeout(() => {
    state.isInit = true
  }, 100)
}

const selectItem = (value: string | number | undefined, type?: string) => {
  let index = props.options.findIndex((e) => value === e.value)
  if (index >= 0) {
    const _item = props.options[index]
    if (tabsValue.value != _item.value) {
      tabsValue.value = _item.value
    }
    initActiveItemStyle(index)
    if (type !== 'watch' && value !== tabsValue.value) {
      emit('change', {
        label: _item.label,
        value: _item.value,
      })
    }
    state.curIndex = index
  }
}

let timer: ReturnType<typeof setTimeout> | undefined

const debounce = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    init()
  }, 250)
}

const getTabsWrapperClassName = computed(() => {
  const { type, round, disabled, readonly } = props
  return object2class('lew-tabs-wrapper', {
    type,
    round,
    hidLine: state.hidLine || !state.isInit,
    disabled,
    readonly,
  })
})

const getTabsClassName = computed(() => {
  const { type, round, size } = props
  return object2class('lew-tabs', {
    type,
    round,
    size,
  })
})

const tabsScroll = () => {
  // 确保 tabsRef 存在，避免访问 null 的属性
  if (!tabsRef.value) {
    return
  }

  if (tabsRef.value.scrollWidth > tabsRef.value.clientWidth) {
    if (tabsRef.value.scrollLeft > 5) {
      if (
        tabsRef.value.scrollLeft >=
        tabsRef.value.scrollWidth - tabsRef.value.clientWidth - 5
      ) {
        state.hidLine = 'right'
      } else {
        state.hidLine = ''
      }
    } else {
      state.hidLine = 'left'
    }
  } else {
    state.hidLine = 'all'
  }
}

onMounted(() => {
  nextTick(() => {
    init()
  })
  window.addEventListener('resize', debounce, false)
})

const getItemStyle = computed(() => {
  let width = any2px(props.itemWidth)
  if (props.itemWidth === 'auto') {
    return 'flex:1'
  }
  return `width:${width}`
})

const getTabsStyle = computed(() => {
  let width = any2px(props.width)
  return `width:${width}`
})

onUnmounted(() => {
  window.removeEventListener('resize', debounce)
})
</script>

<template>
  <div
    :style="getTabsStyle"
    class="lew-tabs-wrapper"
    :class="getTabsWrapperClassName"
  >
    <div :style="getTabsStyle" class="lew-tabs" :class="getTabsClassName">
      <div
        ref="tabsRef"
        @scroll="tabsScroll"
        class="lew-tabs-main hidden-scrollbar"
      >
        <div
          v-if="tabsValue || tabsValue === 0"
          :style="state.activeItemStyle"
          class="lew-tabs-item-animation-active"
          :class="{ 'lew-tabs-item-isInit': state.isInit }"
        ></div>
        <div
          v-for="item in props.options"
          :key="String(item.value)"
          :ref="(el) => itemRef.push(el)"
          class="lew-tabs-item"
          :style="getItemStyle"
          :class="{
            'lew-tabs-item-active': tabsValue === item.value,
          }"
          @click="selectItem(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-tabs-wrapper {
  display: inline-flex;
  position: relative;
  width: auto;
  max-width: 100%;
  border-radius: var(--lew-border-radius-small);
  box-shadow: var(--lew-form-box-shadow);
  overflow: hidden;
}

.lew-tabs-wrapper-round {
  border-radius: 35px;
}

.lew-tabs-wrapper::after {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  width: 10px;
  z-index: 9;
  content: '';
  opacity: 1;
  transition: opacity 0.2s;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
}

.lew-tabs-wrapper::before {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 12px;
  content: '';
  z-index: 9;
  opacity: 1;
  transition: opacity 0.2s;
  background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
}

.lew-tabs-wrapper-type-line {
  border-radius: 0px;
}

.lew-tabs-wrapper-type-line::before,
.lew-tabs-wrapper-type-line::after {
  display: none;
}

.lew-tabs-wrapper-hidLine-left::before,
.lew-tabs-wrapper-hidLine-all::after,
.lew-tabs-wrapper-hidLine-all::before,
.lew-tabs-wrapper-hidLine-right::after {
  opacity: 0;
}

.lew-tabs {
  display: inline-flex;
  align-items: center;
  position: relative;
  background: var(--lew-form-bgcolor);
  border-radius: var(--lew-border-radius-small);
  user-select: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  .lew-tabs-main {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 3px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    padding: 0px 3px;
  }
  .lew-tabs-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    box-sizing: border-box;
    border-radius: 6px;
    color: var(--lew-text-color-1);
    white-space: nowrap;
    cursor: pointer;
    flex-shrink: 0;
    height: calc(100% - 6px);
    transition: all var(--lew-form-transition-ease);
  }

  .lew-tabs-item:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }
  .lew-tabs-item-active {
    background-color: rgba(0, 0, 0, 0);
  }
  .lew-tabs-item-active:hover {
    background-color: rgba(0, 0, 0, 0);
  }
  .lew-tabs-item-active:hover {
    opacity: 1;
  }

  .lew-tabs-item-animation-active {
    position: absolute;
    top: 50%;
    left: 0px;
    z-index: 7;
    border-radius: 6px;
    background: var(--lew-tabs-active-color);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
    transform: translateX(5px);
    box-sizing: border-box;
  }

  .lew-tabs-item-isInit {
    transition: all var(--lew-form-transition-bezier);
  }
}

.lew-tabs-size-small {
  height: var(--lew-form-item-height-small);

  .lew-tabs-item {
    padding: var(--lew-form-input-padding-small);
    min-width: var(--lew-form-item-height-small);
    font-size: var(--lew-form-font-size-small);
  }
}
.lew-tabs-size-medium {
  height: var(--lew-form-item-height-medium);

  .lew-tabs-item {
    padding: var(--lew-form-input-padding-medium);
    min-width: var(--lew-form-item-height-medium);
    font-size: 14px;
  }
}
.lew-tabs-size-large {
  height: var(--lew-form-item-height-large);

  .lew-tabs-item {
    padding: var(--lew-form-input-padding-large);
    min-width: var(--lew-form-item-height-large);
    font-size: 15px;
  }
}

.lew-tabs-wrapper-type-line {
  box-shadow: none;
  .lew-tabs-type-line {
    position: relative;
    background: none;
    border: none;
    border-radius: 0px;
    .lew-tabs-main {
      padding-bottom: 5px;
    }
    .lew-tabs-item:hover {
      background: var(--lew-bgcolor-2);
    }

    .lew-tabs-item-active {
      background: transparent;
    }

    .lew-tabs-item-active:hover {
      transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
      background: transparent;
    }

    .lew-tabs-item-animation-active {
      position: absolute;
      top: auto;
      bottom: 1px;
      left: 0px;
      z-index: 9;
      height: 2.5px;
      border-radius: 0px;
      background: var(--lew-color-primary);
      transform: translateX(3px);
    }
  }
}
.lew-tabs-type-line:after {
  position: absolute;
  content: '';
  bottom: 0px;
  left: 3px;
  height: 2px;
  background-color: var(--lew-form-bgcolor);
  width: calc(100% - 6px);
}
.lew-tabs-round {
  border-radius: 35px;

  .lew-tabs-item {
    border-radius: 35px;
  }

  .lew-tabs-item-animation-active {
    border-radius: 35px;
  }
}

.lew-tabs-wrapper-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}

.lew-tabs-wrapper-readonly {
  pointer-events: none; //鼠标点击不可修改
}
</style>
