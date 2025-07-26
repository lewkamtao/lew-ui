<script setup lang="ts">
import type { MenuOptions } from 'lew-ui'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  options: {
    type: Array as PropType<MenuOptions[]>,
    default() {
      return []
    },
  },
})
const route = useRoute()
const router = useRouter()
const active = ref(route.path)

function toPath(item: MenuOptions) {
  router.push(item.value as string)
  active.value = item.value as string
}
</script>

<template>
  <div class="siderbar lew-scrollbar">
    <lew-menu v-model="active" :options="options" @change="toPath" />
  </div>
</template>

<style lang="scss" scoped>
.siderbar {
  width: var(--lew-siderbar-width);
  height: calc(100vh - 60px);
  min-height: calc(100vh - 60px);
  overflow-y: auto;
  border-right: var(--lew-border-1);
  user-select: none;
  padding: 30px 10px;
  box-sizing: border-box;
}
</style>
