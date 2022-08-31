<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import tippy from 'tippy.js';

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
    arrow: {
        type: Boolean,
        default: true,
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
        arrow: props.arrow,
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
            emit('onShow');
        },
        onHide() {
            emit('onHide');
        },
    });

    instance.popper.children[0].setAttribute(
        'data-lew',
        props.arrow ? 'popover' : 'custom',
    );
});

const emit = defineEmits(['onShow', 'onHide']);

const show = () => {
    instance.show();
};

const hide = () => {
    instance.hide();
};

defineExpose({ show, hide });
</script>

<template>
    <div class="lew-popover">
        <div ref="triggerRef">
            <div class="trigger"><slot name="trigger" /></div>
        </div>
        <div ref="bodyRef" class="lew-popover-body">
            <slot name="popover-body" :show="show" :hide="hide" />
        </div>
    </div>
</template>

<style lang="scss">
.lew-popover {
    display: inline-block;

    .trigger {
        font-size: 0px;
        > div {
            font-size: 14px;
        }
    }
}
</style>
