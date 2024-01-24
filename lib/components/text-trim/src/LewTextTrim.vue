<script setup lang="ts">
import tippy from 'tippy.js';
import { watchDebounced } from '@vueuse/core';
import { object2class } from 'lew-ui/utils';
import { textTrimProps } from './props';

const props = defineProps(textTrimProps);

const textTrimRef = ref();
let instance: any;

const watchOptions = { debounce: 250, maxWait: 1000 };

const init = () => {
    const element = textTrimRef.value;
    if (!element) {
        return;
    }
    if (instance) {
        instance.destroy();
        instance = null;
    }
    let isEllipsis = false;
    const { placement, allowHtml, text, offset }: any = props;

    if (props.lineClamp) {
        isEllipsis = element.offsetHeight < element.scrollHeight;
    } else {
        isEllipsis = element.offsetWidth < element.scrollWidth;
    }
    if (isEllipsis && !instance) {
        element.style.cursor = 'pointer';
        instance = tippy(element, {
            theme: 'light',
            delay: [120, 120],
            duration: [120, 120],
            content: text,
            animation: 'shift-away-subtle',
            hideOnClick: false,
            interactive: true,
            appendTo: () => document.body,
            placement,
            offset,
            allowHTML: allowHtml,
            arrow: false,
            maxWidth: 250,
        });
        instance.popper.children[0].setAttribute('data-lew', 'tooltip');
    } else if (instance) instance.setContent(props.text);
};
// 监听变化 清除初始化
watchDebounced(
    () => props.text,
    () => init(),
    watchOptions
);
watchDebounced(
    () => props.allowHtml,
    () => init(),
    watchOptions
);
watchDebounced(
    () => props.placement,
    () => init(),
    watchOptions
);
watchDebounced(
    () => props.allowHtml,
    () => init(),
    watchOptions
);
watchDebounced(
    () => props.offset,
    () => init(),
    watchOptions
);

const getTextTrimStyleObject = computed(() => {
    if (props.lineClamp) {
        return `display: -webkit-box;-webkit-line-clamp: ${props.lineClamp};-webkit-box-orient: vertical;`;
    }
    return `white-space: nowrap;`;
});

const getClassNames = computed(() => {
    const { x } = props;
    return object2class('lew-text-trim', { x });
});

let width = 0;
const check = () => {
    if (!instance) {
        return;
    }
    const element = textTrimRef.value;
    if (width === element.offsetWidth) {
        return;
    }
    let isEllipsis = false;
    if (props.lineClamp) {
        isEllipsis = element.offsetHeight < element.scrollHeight;
    } else {
        isEllipsis = element.offsetWidth < element.scrollWidth;
    }
    if (isEllipsis) {
        instance.enable();
    } else {
        instance.disable();
    }
    width = element.offsetWidth;
};

onMounted(() => {
    init();
});
</script>

<template>
    <div
        ref="textTrimRef"
        class="lew-text-trim-wrapper"
        :class="getClassNames"
        :style="getTextTrimStyleObject"
        @mouseenter="check"
        v-html="text"
    />
</template>

<style lang="scss" scoped>
.lew-text-trim-wrapper {
    overflow: hidden;
    text-overflow: ellipsis; //文本溢出显示省略号
}

.lew-text-trim-x-start {
    text-align: left;
}

.lew-text-trim-x-center {
    text-align: center;
}

.lew-text-trim-x-end {
    text-align: right;
}
</style>
