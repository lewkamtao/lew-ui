<script lang="ts" setup>
import { getUniqueId } from 'lew-ui/utils'
import MessageItem from './MessageItem.vue'

type MessageState = 'entering' | 'visible' | 'leaving'

interface MessageItemType {
  id: string
  customId?: string
  type: string
  content: string
  duration: number
  remainingDuration: number
  startedAt: number
  state: MessageState
}

// 46px = 12 padding-top + ~20 line-height + 12 padding-bottom + 2 border
const ITEM_HEIGHT = 46
const GAP = 8
const STACK_PEEKS = [0, 10, 16, 20, 24]
const MAX_VISIBLE_STACKED = 4
const TRANSITION_MS = 500

const messages = ref<MessageItemType[]>([])
const isHovered = ref(false)
const isVisible = ref(false)

const timers = new Map<string, ReturnType<typeof setTimeout>>()
const savedYMap = new Map<string, number>()
let hideTimer: ReturnType<typeof setTimeout> | null = null

const visibleItems = computed(() =>
  messages.value.filter(m => m.state !== 'leaving'),
)

const positions = computed(() => {
  const map = new Map<string, { y: number, scale: number, opacity: number, zIndex: number }>()
  const items = visibleItems.value
  const count = items.length

  if (isHovered.value || count <= 1) {
    for (let i = 0; i < count; i++) {
      map.set(items[i].id, {
        y: i * (ITEM_HEIGHT + GAP),
        scale: 1,
        opacity: 1,
        zIndex: count - i,
      })
    }
  }
  else {
    for (let i = 0; i < count; i++) {
      const hidden = i >= MAX_VISIBLE_STACKED
      map.set(items[i].id, {
        y: STACK_PEEKS[Math.min(i, STACK_PEEKS.length - 1)],
        scale: Math.max(0.88, 1 - i * 0.04),
        opacity: hidden ? 0 : Math.max(0, 1 - i * 0.25),
        zIndex: count - i,
      })
    }
  }

  for (const [id, p] of map) savedYMap.set(id, p.y)
  return map
})

const stackHeight = computed(() => {
  const count = visibleItems.value.length
  if (count === 0)
    return 0
  if (isHovered.value || count <= 1) {
    return count * ITEM_HEIGHT + (count - 1) * GAP
  }
  return ITEM_HEIGHT + STACK_PEEKS[Math.min(count - 1, STACK_PEEKS.length - 1)]
})

function getCardStyle(item: MessageItemType) {
  const total = visibleItems.value.length

  if (item.state === 'entering') {
    const pos = positions.value.get(item.id)
    return {
      transform: `translateY(${(pos?.y ?? 0) - ITEM_HEIGHT}px)`,
      opacity: 0,
      zIndex: total + 1,
      pointerEvents: 'none' as const,
    }
  }

  if (item.state === 'leaving') {
    const y = savedYMap.get(item.id) ?? 0
    return {
      transform: `translateY(${y + 30}px) scale(0.88)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none' as const,
    }
  }

  const pos = positions.value.get(item.id)
  if (!pos)
    return {}

  const vi = visibleItems.value.findIndex(m => m.id === item.id)
  return {
    transform: `translateY(${pos.y}px) scale(${pos.scale})`,
    opacity: pos.opacity,
    zIndex: pos.zIndex,
    pointerEvents: (!isHovered.value && total > 1 && vi > 0 ? 'none' : 'auto') as 'none' | 'auto',
  }
}

// ==================== Timer 管理 ====================

function clearHideTimer(): void {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function startTimer(id: string, ms: number): void {
  if (ms <= 0)
    return
  timers.set(id, setTimeout(() => remove(id), ms))
}

function pauseAllTimers(): void {
  const now = Date.now()
  messages.value.forEach((item) => {
    const timer = timers.get(item.id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(item.id)
      item.remainingDuration = Math.max(0, item.remainingDuration - (now - item.startedAt))
    }
  })
}

function resumeAllTimers(): void {
  const now = Date.now()
  messages.value.forEach((item) => {
    if (item.state !== 'leaving' && item.duration > 0 && item.remainingDuration > 0 && !timers.has(item.id)) {
      item.startedAt = now
      startTimer(item.id, item.remainingDuration)
    }
  })
}

function handleMouseEnter(): void {
  isHovered.value = true
  pauseAllTimers()
}

function handleMouseLeave(): void {
  isHovered.value = false
  resumeAllTimers()
}

// ==================== 公共方法 ====================

function add(type: string, content: string, duration: number, customId?: string): string {
  clearHideTimer()
  isVisible.value = true

  if (customId) {
    const existing = messages.value.find(m => m.customId === customId && m.state !== 'leaving')
    if (existing) {
      const t = timers.get(existing.id)
      if (t) {
        clearTimeout(t)
        timers.delete(existing.id)
      }
      existing.type = type
      existing.content = content
      existing.duration = duration
      existing.remainingDuration = duration
      existing.startedAt = Date.now()
      if (!isHovered.value && duration > 0)
        startTimer(existing.id, duration)
      return existing.id
    }
  }

  const id = getUniqueId()
  messages.value.unshift({
    id,
    customId,
    type,
    content,
    duration,
    remainingDuration: duration,
    startedAt: Date.now(),
    state: 'entering',
  })

  nextTick(() => {
    requestAnimationFrame(() => {
      const found = messages.value.find(m => m.id === id)
      if (found)
        found.state = 'visible'
    })
  })

  if (!isHovered.value && duration > 0)
    startTimer(id, duration)
  return id
}

function remove(id: string): void {
  const t = timers.get(id)
  if (t) {
    clearTimeout(t)
    timers.delete(id)
  }

  // 读取当前位置（state 改变前 computed 仍是旧值）
  const pos = positions.value.get(id)
  if (pos)
    savedYMap.set(id, pos.y)

  const item = messages.value.find(m => m.id === id)
  if (!item || item.state === 'leaving')
    return
  item.state = 'leaving'

  setTimeout(() => {
    const idx = messages.value.findIndex(m => m.id === id)
    if (idx !== -1)
      messages.value.splice(idx, 1)
    savedYMap.delete(id)

    if (messages.value.length === 0) {
      hideTimer = setTimeout(() => {
        isVisible.value = false
      }, 100)
    }
  }, TRANSITION_MS)
}

function closeByCustomId(customId: string): void {
  const item = messages.value.find(m => m.customId === customId && m.state !== 'leaving')
  if (item)
    remove(item.id)
}

onUnmounted(() => {
  timers.forEach(t => clearTimeout(t))
  timers.clear()
  clearHideTimer()
})

defineExpose({ add, remove, closeByCustomId })
</script>

<template>
  <div
    v-show="isVisible || messages.length > 0"
    class="lew-message-root"
  >
    <div
      class="lew-message-stack"
      :style="{ height: `${stackHeight}px` }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        v-for="item in messages"
        :key="item.id"
        class="lew-message-card"
        :class="{ 'is-leaving': item.state === 'leaving' }"
        :style="getCardStyle(item)"
      >
        <MessageItem :type="item.type" :content="item.content" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$ease: cubic-bezier(0.25, 0.1, 0.25, 1);
$duration: 0.25s;

.lew-message-root {
  position: fixed;
  top: -60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding-top: 100px;
  -webkit-mask-image: linear-gradient(to bottom, transparent 10px, black 90px);
  mask-image: linear-gradient(to bottom, transparent 10px, black 90px);
}

.lew-message-stack {
  position: relative;
  pointer-events: auto;
  padding: 0 20px;
  transition: height $duration $ease;
}

.lew-message-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  will-change: transform, opacity;
  transition:
    transform $duration $ease,
    opacity $duration $ease;

  &.is-leaving {
    transition:
      transform 0.45s cubic-bezier(0.4, 0, 0.6, 1),
      opacity 0.45s cubic-bezier(0.4, 0, 0.6, 1);
  }
}
</style>
