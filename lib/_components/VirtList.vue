<script lang="ts" setup generic="T extends Record<string, any> = Record<string, any>">
import type { PropType } from 'vue'
import { useVirtualScroll } from 'lew-ui/hooks/useVirtualScroll'
import { computed, toRef } from 'vue'

const props = defineProps({
  list: {
    type: Array as PropType<T[]>,
    default: () => [] as T[],
  },
  /**
   * 固定行高（px）。兼容 vue-virt-list 的 minSize 命名。
   */
  minSize: {
    type: Number,
    required: true,
  },
  /** 视口外预渲染条数 */
  buffer: {
    type: Number,
    default: 5,
  },
  /**
   * 列表项 key：字段名，或 (item, index) => key
   */
  itemKey: {
    type: [String, Function] as PropType<
      string | ((item: T, index: number) => string | number)
    >,
    default: 'id',
  },
})

const listRef = toRef(props, 'list')
const itemSizeRef = toRef(props, 'minSize')
const bufferRef = toRef(props, 'buffer')

const {
  containerRef,
  visibleItems,
  offsetY,
  totalHeight,
  scrollToIndex,
  reset,
  update,
} = useVirtualScroll<T>(listRef, {
  itemSize: itemSizeRef,
  buffer: bufferRef,
})

const wrapperStyle = computed(() => ({
  height: `${totalHeight.value}px`,
}))

const contentStyle = computed(() => ({
  transform: `translate3d(0, ${offsetY.value}px, 0)`,
}))

function getItemKey(item: T, index: number) {
  const key = props.itemKey
  if (typeof key === 'function')
    return key(item, index)
  const value = (item as Record<string, unknown>)?.[key]
  return value == null ? index : (value as string | number)
}

defineExpose({
  scrollToIndex,
  reset,
  update,
  getContainer: () => containerRef.value,
})
</script>

<template>
  <div
    ref="containerRef"
    class="lew-virt-list"
  >
    <div
      class="lew-virt-list__wrapper"
      :style="wrapperStyle"
    >
      <div
        class="lew-virt-list__content"
        :style="contentStyle"
      >
        <div
          v-for="entry in visibleItems"
          :key="getItemKey(entry.data, entry.index)"
          class="lew-virt-list__item"
        >
          <slot
            :item-data="entry.data"
            :index="entry.index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lew-virt-list {
  position: relative;
  height: 100%;
  overflow: auto;
}

.lew-virt-list__wrapper {
  position: relative;
  width: 100%;
}

.lew-virt-list__content {
  will-change: transform;
  backface-visibility: hidden;
}

.lew-virt-list__item {
  box-sizing: border-box;
}
</style>
