<script setup lang="ts">
import tippy from 'tippy.js';
import { textTrimProps } from './text-trim';
import { watchDebounced } from '@vueuse/core';

const props = defineProps(textTrimProps);

let textTrimRef = ref();
let instance: any;

let watchOptions = { debounce: 250, maxWait: 1000 };

// 监听变化 清除初始化
watchDebounced(
    () => props.text,
    () => clear(),
    watchOptions
);
watchDebounced(
    () => props.allowHTML,
    () => clear(),
    watchOptions
);
watchDebounced(
    () => props.placement,
    () => clear(),
    watchOptions
);
watchDebounced(
    () => props.arrow,
    () => clear(),
    watchOptions
);
watchDebounced(
    () => props.allowHTML,
    () => clear(),
    watchOptions
);

const clear = () => {
    if (instance) {
        instance.destroy();
        instance = null;
    }
};

const showPop = () => {
    var element = textTrimRef.value;
    let isEllipsis = false;
    const { placement, allowHTML, text, arrow }: any = props;
    if (props.lineClamp) {
        isEllipsis = element.offsetHeight < element.scrollHeight;
    } else {
        isEllipsis = element.offsetWidth < element.scrollWidth;
    }
    if (isEllipsis && !instance) {
        element.style.cursor = 'pointer';
        instance = tippy(element, {
            theme: 'light',
            delay: [150, 150],
            content: text,
            animation: 'shift-away-subtle',
            interactive: true,
            appendTo: () => document.body,
            placement: placement,
            allowHTML: allowHTML,
            arrow: arrow,
            maxWidth: 250,
        });
        instance.popper.children[0].setAttribute('data-lew', 'tooltip');
    } else {
        if (instance) instance.setContent(props.text);
    }
};

const getTextTrimStyleObject = computed(() => {
    if (props.lineClamp) {
        return `display: -webkit-box;-webkit-line-clamp: ${props.lineClamp};-webkit-box-orient: vertical;`;
    } else {
        return `white-space: nowrap;`;
    }
});
</script>

<template>
    <div
        @mouseover="showPop"
        ref="textTrimRef"
        class="lew-text-trim-wrapper"
        :style="getTextTrimStyleObject"
        v-html="text"
    />
</template>

<style lang="scss" scoped>
.lew-text-trim-wrapper {
    overflow: hidden;
    text-overflow: ellipsis; //文本溢出显示省略号
    width: 100px;
}
</style>
