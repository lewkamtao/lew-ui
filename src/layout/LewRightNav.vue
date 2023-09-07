<script setup lang="ts">
const initNav = () => {
    const titleDoms = document.getElementsByClassName('demo-docs-title');
    navMenus.value = Array.from(titleDoms).map((e: any) => {
        return {
            label: e.textContent,
            top: e.offsetTop,
        };
    });
};

const navMenus = ref([] as any);

const init = () => {
    // 选取需要监听的DOM元素
    const targetNode: any = document.getElementById('component-main');

    // 实例化MutationObserver对象，传入回调函数
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                targetNode.scrollTop = 0;
                initNav();
            }
        }
    });

    // 调用MutationObserver实例对象的observe方法，传入需要监听的DOM元素和需要监听的选项
    const config = { attributes: true, childList: true, characterData: true };
    observer.observe(targetNode, config);
};

const toScroll = (item: any) => {
    const mainDom: any = document.getElementById('component-main');
    if (mainDom) {
        mainDom.scrollTop = item.top - 100;
    }
};

onMounted(() => {
    init();
    initNav();
});
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
        border-radius: var(--lew-border-radius);
    }
    .title {
        border-bottom: 1px var(--lew-bgcolor-2) solid;
        border-radius: 0px;
    }
    .item:hover {
        background-color: var(--lew-bgcolor-2);
    }
}
</style>
