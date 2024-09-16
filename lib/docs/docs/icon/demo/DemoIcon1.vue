<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { icons } from './icon'

const { copy, isSupported } = useClipboard()
const handleCopy = (text: string) => {
  if (!isSupported) {
    LewMessage.error('您的浏览器不支持Clipboard API')
    return
  }
  const htmlText = text
  copy(htmlText)
  LewMessage.success('复制成功')
}
</script>

<template>
  <lew-flex wrap gap="20">
    <lew-flex
      v-for="(item, index) in icons.splice(0, 50)"
      :key="index"
      direction="y"
      class="icon-box"
      @click="handleCopy(item.name)"
    >
      <lew-icon :type="item.name" />
      <div class="name">
        {{ item.name }}
      </div>
    </lew-flex>
  </lew-flex>
</template>

<style lang="scss" scoped>
.icon-box {
  margin-top: 40px;
  width: 140px;
  border-radius: var(--lew-border-radius-small);
  transition: all 0.15s;
  cursor: pointer;

  .name {
    white-space: nowrap;
    color: #999;
  }
}

.icon-box:hover {
  transform: translateY(-3px);
}
</style>
