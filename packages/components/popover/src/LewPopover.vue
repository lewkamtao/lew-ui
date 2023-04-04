<script setup lang="ts">
import tippy from 'tippy.js';
import { popoverProps } from './popover';
import { watchDebounced } from '@vueuse/core';

const props = defineProps(popoverProps);
let triggerRef = ref();
let bodyRef = ref();
let instance: any;
let watchOptions = { debounce: 250, maxWait: 1000 };

// 方向
watchDebounced(
    () => props.placement,
    (value: any) => {
        instance.setProps({
            placement: value,
        });
    },
    watchOptions
);

// 禁用
watchDebounced(
    () => props.disabled,
    (value: any) => {
        if (value) {
            instance.disable();
        } else {
            instance.enable();
        }
    },
    watchOptions
);

// trigger
watchDebounced(
    () => props.trigger,
    (value: any) => {
        if (instance) {
            instance.setProps({
                trigger: value,
            });
        }
    },
    watchOptions
);

// trigger
watchDebounced(
    () => props.triggerTarget,
    (value: any) => {
        if (instance) {
            instance.setProps({
                triggerTarget: value,
            });
        }
    },
    watchOptions
);

const initTippy = () => {
    let { placement, triggerTarget, trigger, disabled }: any = props;

    if (trigger === 'hover') {
        trigger = 'mouseenter';
    }

    instance = tippy(triggerRef.value, {
        theme: 'light',
        trigger: trigger,
        triggerTarget: triggerTarget,
        content: bodyRef.value,
        animation: 'shift-away-subtle',
        interactive: true,
        placement: placement,
        arrow: false,
        delay: trigger === 'mouseenter' ? [150, 150] : undefined,
        appendTo: () => document.body,
        allowHTML: true,
        maxWidth: 'none',
        onShow() {
            emit('onShow');
        },
        onHide() {
            emit('onHide');
        },
    });
    instance.popper.children[0].setAttribute('data-lew', 'popover');

    // 判断入参
    if (disabled && instance) {
        instance.disable();
    }
};

onMounted(() => {
    initTippy();
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
                visible: loading,
                iconSize: 16,
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
