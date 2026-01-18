<script setup lang="ts">
import { throttle } from 'lodash-es'
import { useRoute } from 'vue-router'

const route = useRoute()
const navMenus = ref([] as any)
const activeItem = ref('')

// 轮询相关配置
const POLL_INTERVAL = 50 // 轮询间隔 50ms
const NO_CHANGE_TIMEOUT = 1000 // 2秒没有变化就结束轮询

// 使用 ref 确保响应式和组件隔离
const pollTimer = ref<ReturnType<typeof setInterval> | null>(null)
const lastCount = ref(0)
const noChangeTime = ref(0)
const isPolling = ref(false)

// 更新导航菜单数据
function updateNavMenus(): number {
  const titleDoms = document.getElementsByClassName('demo-title')
  navMenus.value = Array.from(titleDoms).map((e: any) => {
    return {
      label: e.textContent,
      top: e.offsetTop,
    }
  })
  return titleDoms.length
}

// 清理定时器
function clearPollTimer() {
  if (pollTimer.value) {
    clearInterval(pollTimer.value)
    pollTimer.value = null
  }
  isPolling.value = false
}

const checkActive = throttle(() => {
  // 获取当前滚动条位置 判断当前激活的标题
  const mainDom: any = document.getElementById('component-main')
  if (!mainDom)
    return
  const scrollTop = mainDom.scrollTop
  // 找到距离当前滚动位置最接近的标题
  let closestItem = { label: '' }
  let minDistance = Infinity

  navMenus.value.forEach((item: any) => {
    const distance = Math.abs(item.top - scrollTop)
    if (distance < minDistance) {
      minDistance = distance
      closestItem = item
    }
  })

  activeItem.value = closestItem ? closestItem.label : ''
}, 250)

// 完成轮询（正常结束）
function finishPolling() {
  clearPollTimer()
  // 最后更新一次位置并检查激活状态
  nextTick(() => {
    updateNavMenus()
    checkActive()
  })
}

// 开始轮询
function startPolling() {
  // 先清理可能存在的旧定时器
  clearPollTimer()

  // 重置所有状态
  lastCount.value = 0
  noChangeTime.value = 0
  navMenus.value = []
  activeItem.value = ''

  // 先执行一次
  lastCount.value = updateNavMenus()
  isPolling.value = true

  pollTimer.value = setInterval(() => {
    // 如果已经停止轮询，直接返回
    if (!isPolling.value) {
      clearPollTimer()
      return
    }

    const currentCount = updateNavMenus()

    if (currentCount === lastCount.value) {
      // 数量没变，累加无变化时间
      noChangeTime.value += POLL_INTERVAL
      if (noChangeTime.value >= NO_CHANGE_TIMEOUT) {
        // 1秒没变化，停止轮询
        finishPolling()
      }
    }
    else {
      // 有新增元素，重置计时
      lastCount.value = currentCount
      noChangeTime.value = 0
    }
  }, POLL_INTERVAL)
}

function toScroll(item: any) {
  const mainDom: any = document.getElementById('component-main')
  if (mainDom) {
    mainDom.scrollTop = item.top - 100
  }
  activeItem.value = item.label
}

// 监听路由变化，重新开始轮询
watch(() => route.path, () => {
  // 路由变化时，重新开始轮询
  nextTick(() => {
    startPolling()
  })
}, { immediate: false })

onMounted(() => {
  const mainDom: any = document.getElementById('component-main')
  nextTick(() => {
    // 开始轮询获取导航菜单
    startPolling()
    mainDom?.addEventListener('scroll', checkActive)
  })
})

onUnmounted(() => {
  // 只清理定时器，不做其他操作
  clearPollTimer()
  const mainDom: any = document.getElementById('component-main')
  mainDom && mainDom.removeEventListener('scroll', checkActive)
})
</script>

<template>
  <div class="right-nav">
    <lew-title class="item title" size="14px">
      目录
    </lew-title>
    <!-- 轮询中显示骨架图 -->
    <template v-if="isPolling">
      <div
        v-for="i in 5"
        :key="`skeleton-${i}`"
        class="skeleton-item"
      >
        <div class="skeleton-bar" :style="{ width: `${60 + Math.random() * 30}%` }" />
      </div>
    </template>
    <!-- 轮询结束显示真实内容 -->
    <template v-else>
      <div
        v-for="(item, index) in navMenus"
        :key="index"
        class="item"
        :class="{ active: item.label === activeItem }"
        @click="toScroll(item)"
      >
        {{ item.label }}
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.right-nav {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--lew-bgcolor-1);
  display: flex;
  flex-direction: column;
  gap: 5px;

  .item {
    display: block;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: var(--lew-border-radius-small);
  }
  .title {
    border-bottom: 1px var(--lew-bgcolor-2) solid;
    border-radius: 0px;
  }
  .item:hover {
    background-color: var(--lew-bgcolor-2);
  }
  .title:hover {
    background: none;
  }
  .active {
    font-weight: 600;
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
  }
  .active:hover {
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
  }

  // 骨架图样式
  .skeleton-item {
    padding: 5px 10px;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .skeleton-bar {
    height: 14px;
    background: linear-gradient(90deg, var(--lew-bgcolor-3) 25%, var(--lew-bgcolor-2) 50%, var(--lew-bgcolor-3) 75%);
    background-size: 200% 100%;
    border-radius: var(--lew-border-radius-small);
    animation: skeleton-loading 1.5s infinite;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
}
</style>
