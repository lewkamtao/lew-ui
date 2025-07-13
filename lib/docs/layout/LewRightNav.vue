<script setup lang="ts">
import { throttle } from 'lodash-es'
const initNav = (titleDoms: any = []) => {
    navMenus.value = Array.from(titleDoms).map((e: any) => {
        return {
            label: e.textContent,
            top: e.offsetTop,
        }
    })
    // @ts-ignore
    setTimeout(() => {
        init()
    }, 250)
}

const checkActive = throttle(() => {
    // 获取当前滚动条位置 判断当前激活的标题
    const mainDom: any = document.getElementById('component-main')
    const scrollTop = mainDom.scrollTop
    // 找到距离当前滚动位置最接近的标题
    let closestItem = { label: '' }
    let minDistance = Infinity

    navMenus.value.forEach((item: any) => {
        const distance = Math.abs(item.top - scrollTop)
        if (distance < minDistance) {
            minDistance = distance
            closestItem = item
        }
    })

    activeItem.value = closestItem ? closestItem.label : ''
}, 250)

const navMenus = ref([] as any)
const activeItem = ref('')

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
    activeItem.value = item.label
}

// @ts-ignore
onMounted(() => {
    const mainDom: any = document.getElementById('component-main')
    nextTick(() => {
        init()
        mainDom.addEventListener('scroll', checkActive)
        setTimeout(() => {
            checkActive()
        }, 250)
    })
})

onUnmounted(() => {
    const mainDom: any = document.getElementById('component-main')
    mainDom && mainDom.removeEventListener('scroll', checkActive)
})
</script>

<template>
    <div class="right-nav">
        <lew-title class="item title" size="14px">目录</lew-title>
        <div
            v-for="(item, index) in navMenus"
            :key="index"
            class="item"
            :class="{ active: item.label === activeItem }"
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
    display: flex;
    flex-direction: column;
    gap: 5px;

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
    .active {
        font-weight: 600;
        background-color: var(--lew-color-primary-light);
        color: var(--lew-color-primary-dark);
    }
    .active:hover {
        background-color: var(--lew-color-primary-light);
        color: var(--lew-color-primary-dark);
    }
}
</style>
