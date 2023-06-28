<script lang="ts" setup name="Modal">
import { useVModel } from '@vueuse/core';
import { useDOMCreate } from '../../../hooks';
import { any2px } from 'lew-ui/utils';

useDOMCreate('lew-modal');

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '',
    },
    visible: {
        type: Boolean,
        default: false,
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:visible', 'confirm']);

const visible = useVModel(props, 'visible', emit);

const maskClick = () => {
    if (props.closeOnClickOverlay) {
        visible.value = false;
    }
};
const getModalStyle = computed(() => {
    return {
        width: any2px(props.width),
        height: any2px(props.height),
    };
});
</script>

<template>
    <teleport to="#lew-modal">
        <div v-if="visible" class="lew-modal" @click="maskClick">
            <div :style="getModalStyle" class="lew-modal-box" @click.stop>
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
.lew-modal {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: var(--lew-modal-bgcolor);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2001;
    animation: LewModal 0.25s;
    animation-fill-mode: forwards;

    .lew-modal-box {
        border-radius: var(--lew-border-radius);
        background-color: var(--lew-modal-box-bgcolor);
        border: var(--lew-modal-border);
        box-shadow: var(--lew-modal-box-shadow);
        animation-fill-mode: forwards;
        animation: LewModalBox 0.35s;
        animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
}
</style>

<style>
@keyframes LewModalBox {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes LewModal {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
