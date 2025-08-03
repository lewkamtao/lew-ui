<script lang="ts" setup>
import type { LewContextMenusOption } from 'lew-ui/directives'
import dayjs from 'dayjs'

const options = ref<LewContextMenusOption[]>([
  {
    label: 'New File',
    value: 'new-file',
  },
  {
    label: 'Save File',
    value: 'save-file',
  },
])

setInterval(() => {
  options.value[0] = {
    ...options.value[0],
    label: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
}, 1000)
</script>

<template>
  <lew-flex>
    <div
      v-context-menu="{
        options,
      }"
      class="box"
    >
      Right click here
    </div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: var(--lew-bgcolor-2);
  border-radius: var(--lew-border-radius-small);
  font-size: 16px;
  color: var(--lew-text-color-5);
}
</style>
