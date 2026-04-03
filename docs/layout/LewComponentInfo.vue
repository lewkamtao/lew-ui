<script setup lang="ts">
import { renderDescription } from 'docs/lib/utils'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'

const route = useRoute()

function getComponentName() {
  const { path } = route
  return path
    .replace('/', '')
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, letter => letter.toLowerCase())
}

const componentName = computed(() => getComponentName())
</script>

<template>
  <div>
    <div class="component-title-wrapper">
      <lew-title>{{ $t(`components.${componentName}.name`) }}</lew-title>
    </div>
    <div class="sub-title">
      <RenderComponent
        :render-fn="
          renderDescription($t(`components.${componentName}.description`))
        "
      />
    </div>
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
