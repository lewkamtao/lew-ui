<script setup lang="ts">
import { getMdcPath, renderDescription } from 'docs/lib/utils'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import LewMdcDrawer from '../components/LewMdcDrawer.vue'

const route = useRoute()

function getComponentName() {
  const { path } = route
  return path
    .replace('/', '')
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, letter => letter.toLowerCase())
}

const componentName = computed(() => getComponentName())
const mdcPath = computed(() => getMdcPath(componentName.value))
const showMdcDrawer = ref(false)
const mdcFileExists = ref(false)

// 通过 import.meta.glob 让 Vite 在构建时静态分析并打包所有 mdc 文件
const mdcModules = import.meta.glob('../../lib/**/*.mdc', { query: '?raw', import: 'default' })

// 检查 mdc 文件是否存在（直接查映射表，无需异步）
function checkMdcFileExists() {
  mdcFileExists.value = !!mdcPath.value && (mdcPath.value in mdcModules)
}

// 监听路由变化，重新检查文件
watch(
  () => route.path,
  () => {
    checkMdcFileExists()
  },
  { immediate: true },
)

function openMdcDrawer() {
  if (mdcPath.value && mdcFileExists.value) {
    showMdcDrawer.value = true
  }
}
</script>

<template>
  <div>
    <div class="component-title-wrapper">
      <lew-title>{{ $t(`components.${componentName}.name`) }}</lew-title>
      <lew-tag
        v-if="mdcPath && mdcFileExists"
        type="light"
        color="blue"
        style="margin-left: 8px; cursor: pointer"
        @click="openMdcDrawer"
      >
        MDC
      </lew-tag>
    </div>
    <div class="sub-title">
      <RenderComponent
        :render-fn="
          renderDescription($t(`components.${componentName}.description`))
        "
      />
    </div>
    <LewMdcDrawer
      v-if="mdcPath && mdcFileExists"
      v-model:visible="showMdcDrawer"
      :mdc-path="mdcPath"
    />
  </div>
</template>

<style lang="scss" scoped>
.component-title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 0;

  :deep(.lew-title) {
    margin-bottom: 0;
  }
}
</style>
