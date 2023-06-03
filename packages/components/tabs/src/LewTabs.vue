<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { any2px, object2class } from 'lew-ui/utils'
import { tabsProps } from './tabs'

const props = defineProps(tabsProps)
const emit = defineEmits(['change', 'update:modelValue'])
const tabsValue = useVModel(props, 'modelValue', emit)

const tabsRef = ref()
const itemRef = ref([] as any)

const state = reactive({
  activeItemStyle: {} as any,
  curIndex: props.options.findIndex(e => tabsValue.value === e.value),
  hidLine: '',
  isInit: false,
})

watch(
  () => tabsValue.value,
  (v) => {
    selectItem(v, 'watch')
  },
)

function init() {
  let index = props.options.findIndex(e => e.value === tabsValue.value)
  if (index < 0)
    index = 0

  state.activeItemStyle = `width:${itemRef.value[index].offsetWidth}px;transform: translateX(${itemRef.value[index].offsetLeft}px);`
  tabsScroll()
  setTimeout(() => {
    state.isInit = true
  }, 100)
}

function selectItem(value: [String, Number], type?: string) {
  const index = props.options.findIndex(e => value === e.value)
  if (state.curIndex != index) {
    const _item = props.options[index]

    if (tabsValue.value != _item.value)
      tabsValue.value = _item.value

    const activeRef = itemRef.value[index]

    if (tabsRef.value.scrollWidth > tabsRef.value.clientWidth) {
      tabsRef.value.scrollLeft
                = activeRef.offsetLeft
                - tabsRef.value.clientWidth / 2
                + activeRef.offsetWidth / 2
    }

    state.activeItemStyle = {
      width: `${activeRef.offsetWidth}px`,
      transform: `translate(${activeRef.offsetLeft}px)`,
    }
    if (type !== 'watch') {
      emit('change', {
        label: _item.label,
        value: _item.value,
        activeIndex: index,
      })
    }

    state.curIndex = index
  }
}

let timer: ReturnType<typeof setTimeout> | undefined
function debounce() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    init()
  }, 250)
}

const getTabsWrapperClassName = computed(() => {
  const { type, round } = props
  return object2class('lew-tabs-wrapper', {
    type,
    round,
    hidLine: state.hidLine,
  })
})

const getTabsClassName = computed(() => {
  const { type, round } = props
  return object2class('lew-tabs', {
    type,
    round,
  })
})

function tabsScroll() {
  if (tabsRef.value.scrollWidth > tabsRef.value.clientWidth) {
    if (tabsRef.value.scrollLeft > 0) {
      if (
        tabsRef.value.scrollLeft
                >= tabsRef.value.scrollWidth - tabsRef.value.clientWidth - 10
      )
        state.hidLine = 'right'
      else
        state.hidLine = ''
    }
    else {
      state.hidLine = 'left'
    }
  }
  else {
    state.hidLine = 'all'
  }
}

onMounted(() => {
  if (!props.modelValue)
    tabsValue.value = props.options[0].value

  init()
  window.addEventListener('resize', debounce, false)
})

const getItemStyle = computed(() => {
  const width = any2px(props.itemWidth)
  if (props.itemWidth === 'auto')
    return 'flex:1'
  else
    return `width:${width}`
})

const getTabsStyle = computed(() => {
  const width = any2px(props.width)
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
    <div
      ref="tabsRef"
      :style="getTabsStyle"
      class="lew-tabs hidden-scrollbar"
      :class="getTabsClassName"
      @scroll="tabsScroll"
    >
      <div
        :style="state.activeItemStyle"
        class="lew-tabs-item-animation-active"
        :class="{ 'lew-tabs-item-isInit': state.isInit }"
      />
      <div
        v-for="item in options"
        :key="String(item.value)"
        :ref="(el) => itemRef.push(el)"
        class="lew-tabs-item"
        :style="getItemStyle"
        :class="{ 'lew-tabs-item-active': tabsValue === item.value }"
        @click="selectItem(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-tabs-wrapper {
    display: inline-flex;
    position: relative;
    width: auto;
    border-radius: var(--lew-border-radius);
    overflow: hidden;
    box-shadow: var(--lew-form-box-shadow);
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
    background: linear-gradient(
        to right,

        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.1)
    );
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
    background: linear-gradient(
        to left,

        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.1)
    );
}
.lew-tabs-wrapper-type-line {
    box-shadow: none;
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
    position: relative;
    display: inline-flex;
    align-items: center;
    background: var(--lew-form-bgcolor);
    border-radius: var(--lew-border-radius);
    overflow-x: auto;
    overflow-y: hidden;
    user-select: none;
    scroll-behavior: smooth;
    width: 100%;
    box-sizing: border-box;
    .lew-tabs-item {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        z-index: 9;
        height: 28px;
        padding: 0px 12px;
        box-sizing: border-box;
        border-radius: var(--lew-border-radius);
        margin: 3px;
        color: var(--lew-text-color-2);
        white-space: nowrap;
        cursor: pointer;
        font-size: 14px;
        flex-shrink: 0;
    }
    .lew-tabs-item-active {
        color: var(--lew-primary-color-dark);
    }

    .lew-tabs-item-animation-active {
        position: absolute;
        top: 3px;
        left: 0px;
        z-index: 9;
        height: 28px;
        border-radius: 4px;
        background: var(--lew-tabs-active-color);
        transform: translateX(3px);
        box-shadow: 0px 0px 12px rgba($color: #000000, $alpha: 0.15);
        box-sizing: border-box;
    }
    .lew-tabs-item-isInit {
        transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
    }
}

.lew-tabs-type-line {
    background: none;
    border: none;
    border-bottom: var(--lew-form-border-width) var(--lew-form-border-color)
        solid;
    padding-bottom: 5px;
    border-radius: 0px;

    .lew-tabs-item:hover {
        background: var(--lew-bgcolor-2);
    }
    .lew-tabs-item-active {
        background: none;
    }
    .lew-tabs-item-active:hover {
        transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
        background: none;
    }
    .lew-tabs-item-animation-active {
        position: absolute;
        top: auto;
        bottom: 1px;
        left: 0px;
        z-index: 9;
        height: 2px;

        background: var(--lew-primary-color-dark);
        transform: translateX(3px);
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.08);
    }
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
</style>
