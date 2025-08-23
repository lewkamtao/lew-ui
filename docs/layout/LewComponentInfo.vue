<script setup lang="ts">
import { renderDescription } from 'docs/lib/utils'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'

function getComponentName() {
  const { path } = useRoute()
  return path
    .replace('/', '')
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, letter => letter.toLowerCase())
}
</script>

<template>
  <div>
    <lew-title>{{ $t(`components.${getComponentName()}.name`) }}</lew-title>
    <div class="sub-title">
      <RenderComponent
        :render-fn="
          renderDescription($t(`components.${getComponentName()}.description`))
        "
      />
    </div>
  </div>
</template>
