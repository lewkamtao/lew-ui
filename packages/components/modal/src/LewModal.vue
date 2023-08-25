<script lang="ts" setup name="Modal">
import { useVModel } from '@vueuse/core';
import { useDOMCreate } from '../../../hooks';
import { any2px } from 'lew-ui/utils';
import { LewTextTrim } from '../../text-trim';

useDOMCreate('lew-modal');

const props = defineProps({
    title: {
        type: String,
        default: '这是一个标题',
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
        <transition name="lew-modal-mask">
            <div v-if="visible" class="lew-modal-mask" />
        </transition>
        <transition name="lew-modal">
            <div v-if="visible" class="lew-modal" @click="maskClick">
                <div :style="getModalStyle" class="lew-modal-box" @click.stop>
                    <lew-flex mode="between" y="center" class="header">
                        <lew-text-trim class="title" :text="title" />
                        <lew-icon size="18" class="close-btn" @click="visible = false" type="x" />
                    </lew-flex>
                    <slot></slot>
                    <lew-flex x="end" y="center" class="footer">
                        <lew-button type="text" round color="normal">取消</lew-button>
                        <lew-button round>确定</lew-button>
                    </lew-flex>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
.lew-modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--lew-modal-bgcolor);
    z-index: 2001;
}

.lew-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2002;

    .lew-modal-box {
        border-radius: var(--lew-border-radius);
        background-color: var(--lew-modal-box-bgcolor);
        border: var(--lew-modal-border);
        box-shadow: var(--lew-modal-box-shadow);
        overflow: hidden;

        .header {
            height: 50px;
            background-color: var(--lew-backdrop-bg) !important;
            backdrop-filter: blur(20px);
            padding: 10px 20px;
            border-bottom: var(--lew-border-1);

            .title {
                font-size: 16px;
                font-weight: bold;
            }

            .close-btn {
                cursor: pointer;
                transition: all .25s;
                border-radius: var(--lew-border-radius);
                color: var(--lew-text-color-5);
                padding: 2px;
            }

            .close-btn:hover {
                transform: scale(1.05);
                background-color: var(--lew-bgcolor-3);
            }

            .close-btn:active {
                transform: scale(1);
            }
        }

        .footer {
            height: 50px;
            background-color: var(--lew-backdrop-bg) !important;
            backdrop-filter: blur(20px);
            padding: 10px 20px;
            border-top: var(--lew-border-1);
        }

    }
}

.lew-modal-mask-enter-active,
.lew-modal-mask-leave-active {
    transition: all 0.25s;
}

.lew-modal-mask-enter-from,
.lew-modal-mask-leave-to {
    opacity: 0;
}

.lew-modal-enter-active,
.lew-modal-leave-active {
    transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.lew-modal-leave-to,
.lew-modal-enter-from {
    opacity: 0;
    transform: translateY(30px)
}
</style>
