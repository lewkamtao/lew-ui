<script lang="ts" setup>
import type { ContextMenus } from 'lew-ui/directives'
import dayjs from 'dayjs'

const options = ref<ContextMenus[]>([
  {
    label: '新建文件',
    value: 'new-file'
  },
  {
    label: '保存文件',
    value: 'save-file'
  }
])

setInterval(() => {
  options.value[0] = {
    ...options.value[0],
    label: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
}, 1000)

const selectHandler = (item: ContextMenus) => {
  LewMessage.info(`你点击了：${item.value} `)
}
</script>
<template>
  <lew-flex>
    <div
      v-context-menu="{
        options,
        selectHandler
      }"
      class="box"
    >
      右键点击此处
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
