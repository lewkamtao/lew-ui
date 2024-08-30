<script setup lang="ts">
import type { PropType } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { MenuOptions } from 'lew-ui'

const route = useRoute()
const router = useRouter()

defineProps({
  options: {
    type: Array as PropType<MenuOptions[]>,
    default() {
      return []
    }
  }
})

const toPath = (item: MenuOptions) => {
  if (item.tagText === 'Coming soon') {
    LewMessage.info('敬请期待！')
    return
  }
  router.push(item.value as string)
  active.value = item.value as string
}

let active = ref(route.path)
</script>

<template>
  <div class="siderbar lew-scrollbar">
    <lew-menu :options="options" :active="active" @change="toPath" />
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
