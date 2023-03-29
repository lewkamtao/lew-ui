<script setup lang="ts">
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
    loading: {
        type: Boolean,
        default: () => true,
    },
    triggerTarget: {
        type: Element,
        default: null,
        required: false,
    },
});

onMounted(() => {
    let trigger = props.trigger;
    let triggerTarget = props.triggerTarget;

    let placement = props.placement;
    if (trigger === 'hover') {
        trigger = 'mouseenter';
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance = tippy(triggerRef.value, {
        theme: 'light',
        trigger: trigger,
        triggerTarget: triggerTarget,
        content: bodyRef.value,
        animation: 'shift-away-subtle',
        interactive: true,
        placement: placement,
        arrow: false,
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

    instance.popper.children[0].setAttribute('data-lew', 'popover');
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
        <label ref="triggerRef" style="font-size: 0px">
            <div class="trigger"><slot name="trigger" /></div>
        </label>
        <div
            ref="bodyRef"
            class="lew-popover-body"
            v-loading="{
                isShow: loading,
            }"
        >
            <slot name="popover-body" :show="show" :hide="hide" />
        </div>
    </div>
</template>

<style lang="scss">
.lew-popover {
    display: inline-block;

    .trigger {
        > div {
            font-size: 14px;
        }
    }
}
.lew-popover-body {
    padding: 6px;
    overflow: hidden;
}
</style>
