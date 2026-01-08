<script setup lang="ts">
// 1. 类型导入
import type { LewDescOption } from 'lew-ui/types'

// 2. 组件导入（外部）
import LewGetLabelWidth from 'lew-ui/components/form/form/src/LewGetLabelWidth.vue'

// 3. 工具函数导入
import { any2px, object2class } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'

// 4. 组件导入（同级）
import LewDescItem from './LewDescItem.vue'

// 5. 组件配置导入
import { descProps, lewDescSizePaddingMap } from './props'

// Props
const props = defineProps(descProps)

// 响应式状态
const descLabelRef = ref<InstanceType<typeof LewGetLabelWidth>>()
const autoLabelWidth = ref(0)

// 计算属性
const componentOptions = computed<LewDescOption[]>(
  () => cloneDeep(props.options) || [],
)

const getDescClassNames = computed(() => {
  const { bordered } = props
  return object2class('lew-desc', { bordered })
})

const getDescStyle = computed(() => {
  const { width, gap, bordered, columns } = props
  const columnsCount = Number(columns)

  return {
    width: any2px(width),
    minWidth: '320px',
    gap: bordered ? '0px' : any2px(gap),
    gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
  }
})

const getBind = computed(() => (item: LewDescOption) => {
  const { direction, size, labelX, valueX, bordered, labelWidth } = props
  return {
    direction,
    size,
    labelX,
    valueX,
    bordered,
    labelWidth: any2px(
      labelWidth === 'auto' ? autoLabelWidth.value || labelWidth : labelWidth,
    ),
    ...item,
  }
})

// 方法
function calculateLabelWidth() {
  autoLabelWidth.value
    = (descLabelRef.value?.getWidth() || 0)
      + (props.bordered ? lewDescSizePaddingMap[props.size] * 2 : 0)
}

// 生命周期
onMounted(() => {
  calculateLabelWidth()
})

// 监听器
watch(
  () => props.size,
  () => {
    nextTick(() => {
      calculateLabelWidth()
    })
  },
)
</script>

<template>
  <div class="lew-desc" :style="getDescStyle" :class="getDescClassNames">
    <LewGetLabelWidth
      ref="descLabelRef"
      :size="size"
      :options="componentOptions"
    />
    <LewDescItem
      v-for="item in componentOptions"
      :key="item.field"
      :data-source="dataSource"
      v-bind="getBind(item)"
    >
      <template v-if="$slots[item.field]" #default="slotProps">
        <slot :name="item.field" v-bind="slotProps" />
      </template>
    </LewDescItem>
  </div>
</template>

<style lang="scss" scoped>
.lew-desc {
  width: 100%;
  display: grid;
  flex-shrink: 0;
}

.lew-desc-bordered {
  border: var(--lew-desc-border);
}
</style>
