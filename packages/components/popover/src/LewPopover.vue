<!-- filename: Popover.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/shift-away-subtle.css';
import 'tippy.js/themes/light.css';
let triggerRef = ref(null);
let bodyRef = ref(null);
let instance: any;

const props = defineProps({
    trigger: {
        type: String,
        default: 'click',
    },
    placement: {
        type: String,
        default: 'top',
    },
});

onMounted(() => {
    let trigger = props.trigger;
    let placement = props.placement;
    if (trigger == 'hover') {
        trigger = 'mouseenter';
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance = tippy(triggerRef.value, {
        theme: 'light',
        trigger: trigger,
        content: bodyRef.value,
        animation: 'shift-away-subtle',
        interactive: true,
        placement: placement,
        appendTo: () => document.body,
        allowHTML: true,
        maxWidth: 'none',
        onShow(instance) {
            const node = document.getElementsByTagName('html')[0];
            if (node.classList.contains('lew-dark')) {
                instance.popper.children[0].setAttribute('data-theme', 'dark');
            } else {
                instance.popper.children[0].setAttribute('data-theme', 'light');
            }
        },
    });
});

let show = () => {
    instance.hide();
};

let hide = () => {
    instance.hide();
};

defineExpose({ show, hide });

onUnmounted(() => {
    if (instance) {
        instance.destroy();
    }
});
</script>

<template>
    <div class="lew-popover">
        <div ref="triggerRef"><slot name="trigger" /></div>
        <div ref="bodyRef" class="lew-popover-body">
            <slot name="popover-body" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-popover {
    display: inline-block;
}
</style>
