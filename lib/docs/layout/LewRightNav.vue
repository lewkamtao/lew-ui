<script setup lang="ts">
const initNav = (titleDoms: any = []) => {
  navMenus.value = Array.from(titleDoms).map((e: any) => {
    return {
      label: e.textContent,
      top: e.offsetTop
    }
  })
  // @ts-ignore
  window.LewRightNavTimer = setTimeout(() => {
    init()
  }, 500)
}

const navMenus = ref([] as any)

const init = () => {
  // 选取需要监听的DOM元素
  const titleDoms = document.getElementsByClassName('demo-docs-title')
  if (titleDoms.length > 0) {
    initNav(titleDoms)
  }
}

const toScroll = (item: any) => {
  const mainDom: any = document.getElementById('component-main')
  if (mainDom) {
    mainDom.scrollTop = item.top - 100
  }
}
// @ts-ignore
clearTimeout(window.LewRightNavTimer)

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<template>
  <div class="right-nav">
    <lew-title class="item title" size="14px">目录</lew-title>
    <div
      v-for="(item, index) in navMenus"
      :key="index"
      class="item"
      @click="toScroll(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss">
.right-nav {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--lew-bgcolor-1);

  .item {
    display: block;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: var(--lew-border-radius-small);
  }
  .title {
    border-bottom: 1px var(--lew-bgcolor-2) solid;
    border-radius: 0px;
  }
  .item:hover {
    background-color: var(--lew-bgcolor-2);
  }
  .title:hover {
    background: none;
  }
}
</style>
