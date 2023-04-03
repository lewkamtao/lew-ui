<script setup lang="ts">
import tippy from 'tippy.js';
import { textTrimProps } from './text-trim';
const props = defineProps(textTrimProps);

let textTrimRef = ref();
let instance: any;

const showPop = () => {
    var element = textTrimRef.value;
    const isEllipsis = element.offsetWidth < element.scrollWidth;

    if (isEllipsis && !instance) {
        element.style.cursor = 'pointer';
        instance = tippy(element, {
            theme: 'light',
            delay: [150, 150],
            content: props.text,
            animation: 'shift-away-subtle',
            interactive: true,
            appendTo: () => document.body,
            allowHTML: props.allowHTML,
            arrow: props.arrow,
            maxWidth: 250,
        });
        instance.popper.children[0].setAttribute('data-lew', 'tooltip');
    } else {
        instance.setContent(props.text);
    }
};
</script>

<template>
    <div
        @mouseover="showPop"
        ref="textTrimRef"
        class="lew-text-trim-wrapper"
        v-html="text"
    />
</template>

<style lang="scss" scoped>
.lew-text-trim-wrapper {
    overflow: hidden;
    text-overflow: ellipsis; //文本溢出显示省略号
    white-space: nowrap;
    width: 100px;
}
</style>
