<script setup lang="ts">
import type { VNode } from 'vue'
import { any2px } from 'lew-ui/utils'
import { Comment, Fragment, cloneVNode, isVNode } from 'vue'
import { AVATAR_GROUP_KEY } from './context'
import { avatarGroupProps } from './groupProps'
import LewAvatar from './LewAvatar.vue'

const props = defineProps(avatarGroupProps)
const slots = useSlots()

provide(
  AVATAR_GROUP_KEY,
  computed(() => ({
    size: props.size,
    shape: props.shape,
  })),
)

function flattenNodes(nodes: VNode[] | undefined): VNode[] {
  const result: VNode[] = []
  if (!nodes)
    return result

  nodes.forEach((node) => {
    if (!node || node.type === Comment)
      return

    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenNodes(node.children as VNode[]))
      return
    }

    if (isVNode(node) && typeof node.type !== 'symbol')
      result.push(node)
  })

  return result
}

function isAvatarNode(node: VNode): boolean {
  const type = node.type as { name?: string, __name?: string } | string
  if (type === LewAvatar)
    return true
  if (typeof type === 'object' && type) {
    return type.name === 'LewAvatar' || type.__name === 'LewAvatar'
  }
  return false
}

function hasOwnProp(node: VNode, key: string): boolean {
  return Boolean(node.props && Object.prototype.hasOwnProperty.call(node.props, key))
}

function resolveAvatarNode(node: VNode): VNode {
  const merged: Record<string, unknown> = {}

  if (props.size !== undefined && !hasOwnProp(node, 'size'))
    merged.size = props.size

  if (props.shape !== undefined && !hasOwnProp(node, 'shape'))
    merged.shape = props.shape

  return Object.keys(merged).length ? cloneVNode(node, merged) : node
}

const avatarNodes = computed(() =>
  flattenNodes(slots.default?.() as VNode[] | undefined).filter(isAvatarNode),
)

const visibleNodes = computed(() => {
  const nodes = avatarNodes.value
  const { max } = props
  if (max === undefined || max <= 0 || nodes.length <= max)
    return nodes.map(resolveAvatarNode)

  // 留出 1 个位置给剩余计数头像
  return nodes.slice(0, Math.max(max - 1, 0)).map(resolveAvatarNode)
})

const restCount = computed(() => {
  const { max } = props
  const total = avatarNodes.value.length
  if (max === undefined || max <= 0 || total <= max)
    return 0
  return total - Math.max(max - 1, 0)
})

const restSize = computed(() => {
  if (props.size !== undefined)
    return props.size
  const first = avatarNodes.value[0]
  return first?.props?.size ?? '40px'
})

const restShape = computed(() => {
  if (props.shape !== undefined)
    return props.shape
  const first = avatarNodes.value[0]
  return first?.props?.shape ?? 'circle'
})

const restTextStyle = computed(() => {
  const size
    = typeof restSize.value === 'number'
      ? restSize.value
      : Number.parseFloat(String(restSize.value)) || 40
  return {
    fontSize: `${Math.max(size * 0.32, 10)}px`,
    fontWeight: 600,
    color: 'var(--lew-color-text-2)',
    userSelect: 'none' as const,
  }
})

const groupStyle = computed(() => ({
  '--lew-avatar-group-overlap': any2px(props.overlap),
}))
</script>

<template>
  <div
    class="lew-avatar-group"
    role="group"
    :style="groupStyle"
  >
    <div
      v-for="(node, index) in visibleNodes"
      :key="node.key ?? index"
      class="lew-avatar-group-item"
    >
      <component :is="node" />
    </div>
    <div
      v-if="restCount > 0"
      class="lew-avatar-group-item lew-avatar-group-item--rest"
    >
      <slot name="rest" :rest="restCount">
        <LewAvatar :size="restSize" :shape="restShape">
          <span class="lew-avatar-group-rest-text" :style="restTextStyle">
            +{{ restCount }}
          </span>
        </LewAvatar>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar-group {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  .lew-avatar-group-item {
    position: relative;
    z-index: 1;
    transition: transform 0.22s ease, z-index 0s linear 0.22s;

    & + .lew-avatar-group-item {
      margin-left: calc(var(--lew-avatar-group-overlap, 10px) * -1);
    }

    &:hover {
      z-index: 10;
      // 悬停时立即置顶，离开时等缩放结束后再降层，避免被邻项盖住
      transition: transform 0.22s ease, z-index 0s;
      transform: scale(1.08);
    }

    :deep(.lew-avatar-box) {
      box-shadow: 0 0 0 2px var(--lew-bgcolor-0);
      transition: box-shadow 0.22s ease;
    }

    &:hover :deep(.lew-avatar-box) {
      box-shadow:
        0 0 0 2px var(--lew-bgcolor-0),
        0 4px 12px rgb(0 0 0 / 12%);
    }
  }

  .lew-avatar-group-rest-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
