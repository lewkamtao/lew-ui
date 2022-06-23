<!-- filename: Popover.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
});

onMounted(() => {
    let trigger = props.trigger;
    if (trigger == 'hover') {
        trigger = 'mouseenter';
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance = tippy(triggerRef.value, {
        theme: 'light',
        trigger: trigger || 'click',
        content: bodyRef.value,
        animation: 'shift-away-subtle',
        interactive: true,
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
</script>

<template>
    <div class="lew-popover">
        <div ref="triggerRef"><slot name="trigger" /></div>
        <div ref="bodyRef" class="popover-body">
            <slot name="popover-body" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-popover {
    display: inline-block;
}
</style>
<style lang="scss">
.lew-popover {
    .tippy-content {
        padding: 0px;
    }
}
</style>
