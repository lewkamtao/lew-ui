<script setup lang="ts">
import docsLocale from 'docs/locals'
import { any2px, object2class } from 'lew-ui/utils'
import { throttle } from 'lodash-es'
import LewDemoBox from './LewDemoBox.vue'

const props = defineProps({
  demoGroup: {
    type: Array as PropType<any[]>,
    required: true,
  },
  codeGroup: {
    type: Array as PropType<string[]>,
    required: true,
  },
  columns: {
    type: Number,
    default: 1,
  },
  gap: {
    type: String,
    default: '30px',
  },
  width: {
    type: String,
    default: '100%',
  },
  componentName: {
    type: String,
    default: '',
  },
})

// 响应式窗口宽度
const windowWidth = ref(window.innerWidth)

// 监听窗口大小变化
onMounted(() => {
  const handleResize = throttle(() => {
    windowWidth.value = window.innerWidth
  }, 200) // 200ms 节流延迟

  window.addEventListener('resize', handleResize)

  // 清理事件监听器
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

// 根据窗口宽度动态计算列数
const dynamicColumns = computed(() => {
  return windowWidth.value < 1600 ? 1 : props.columns
})

// 计算属性
const getLayoutStyle = computed(() => {
  const { width, gap } = props
  const columns = dynamicColumns.value
  const columnWidth = `calc((100% - ${any2px(gap)} * ${
    columns - 1
  }) / ${columns})`
  return {
    'width': any2px(width),
    'gap': any2px(gap),
    '--column-width': columnWidth,
  }
})

const getLayoutClassNames = computed(() => {
  return object2class('lew-demo-box-layout', {})
})

// 将demoGroup和codeGroup按列数分组
const groupedData = computed(() => {
  const { demoGroup, codeGroup } = props
  const columns = dynamicColumns.value
  const result = []

  for (let i = 0; i < columns; i++) {
    const columnData = {
      demos: [] as any[],
      codes: [] as string[],
      indices: [] as number[],
    }

    for (let j = i; j < demoGroup.length; j += columns) {
      columnData.demos.push(demoGroup[j])
      columnData.codes.push(codeGroup[j] || '')
      columnData.indices.push(j)
    }

    result.push(columnData)
  }

  return result
})

// 获取demo项配置
function getDemoItemConfig(index: number) {
  return {
    title: props.componentName
      ? docsLocale.t(`components.${props.componentName}.demo${index + 1}.title`)
      : '',
    description: props.componentName
      ? docsLocale.t(
          `components.${props.componentName}.demo${index + 1}.description`,
        )
      : '',
    code: props.codeGroup[index] || '',
    demoIndex: index,
    componentName: props.componentName,
  }
}
</script>

<template>
  <div
    class="lew-demo-box-layout"
    :style="getLayoutStyle"
    :class="getLayoutClassNames"
  >
    <div
      v-for="(column, columnIndex) in groupedData"
      :key="columnIndex"
      class="demo-column"
    >
      <LewDemoBox
        v-for="(item, itemIndex) in column.demos"
        :key="column.indices[itemIndex]"
        :title="getDemoItemConfig(column.indices[itemIndex]).title"
        :description="getDemoItemConfig(column.indices[itemIndex]).description"
        :code="getDemoItemConfig(column.indices[itemIndex]).code"
        :demo-index="getDemoItemConfig(column.indices[itemIndex]).demoIndex"
        :component-name="
          getDemoItemConfig(column.indices[itemIndex]).componentName
        "
      >
        <component :is="item" />
      </LewDemoBox>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-demo-box-layout {
  display: flex;
  width: 100%;

  .demo-column {
    width: var(--column-width);
    flex-shrink: 0; // 防止列被压缩
    display: flex;
    flex-direction: column;
    min-width: 0; // 防止内容撑开列宽
    overflow: hidden; // 防止内容溢出

    &:not(:last-child) {
      margin-right: v-bind(gap);
    }

    // 确保每个demo-box不会撑开列宽
    :deep(.demo-box) {
      width: 100%;
      min-width: 0;
      overflow: hidden;
    }
  }
}
</style>
