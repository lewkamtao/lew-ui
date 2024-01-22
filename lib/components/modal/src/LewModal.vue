<script lang="ts" setup name="Modal">
import { useVModel, useMagicKeys, useMouse } from '@vueuse/core';
import { any2px } from 'lew-ui/utils';
import { LewFlex, LewButton, LewIcon } from 'lew-ui';
import { useDOMCreate } from '../../../hooks';
import { LewTextTrim } from '../../text-trim';
import { modalProps } from './props';

const { x, y } = useMouse();
const { Escape } = useMagicKeys();
useDOMCreate('lew-modal');

const props = defineProps(modalProps);

const emit = defineEmits(['update:visible', 'ok', 'cancel', 'show', 'close']);

const visible = useVModel(props, 'visible', emit);
const transformOrigin = ref('0 0');

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

const ok = () => {
    emit('ok');
};

const cancel = () => {
    emit('cancel');
};

watch(
    () => visible.value,
    (newVal) => {
        if (newVal) {
            transformOrigin.value = `${x.value}px ${y.value}px`;
            emit('show');
        } else {
            emit('close');
        }
    }
);
if (props.closeByEsc) {
    watch(Escape, (v) => {
        if (v && visible.value) {
            visible.value = false;
        }
    });
}
</script>

<template>
    <teleport to="#lew-modal">
        <div
            :style="{
                '--lew-modal-transform-origin': transformOrigin,
            }"
            class="lew-modal-container"
        >
            <transition name="lew-modal-mask">
                <div v-if="visible" class="lew-modal-mask" />
            </transition>
            <transition name="lew-modal">
                <div v-if="visible" class="lew-modal" @click="maskClick">
                    <div
                        :style="getModalStyle"
                        class="lew-modal-box"
                        @click.stop
                    >
                        <lew-flex
                            v-if="title"
                            mode="between"
                            y="center"
                            class="header"
                        >
                            <lew-text-trim class="title" :text="title" />
                            <lew-icon
                                size="18"
                                class="close-btn"
                                type="x"
                                @click="visible = false"
                            />
                        </lew-flex>
                        <div v-else class="header-slot">
                            <slot name="header"></slot>
                        </div>
                        <slot />
                        <lew-flex
                            v-if="!hideFooter"
                            x="end"
                            y="center"
                            class="footer"
                        >
                            <lew-button
                                v-bind="{ 
                                type: 'text', 
                                text: '取消',
								round: true,
								color: 'normal',
                                ...cancelProps as any,
                            }"
                                @click="cancel"
                            />
                            <lew-button
                                v-bind="{ 
                                text: '确定',   
                                color: 'primary',  
								round: true,
                                ...okProps as any, 
                            }"
                                @click="ok"
                            />
                        </lew-flex>
                        <div v-else class="footer-slot">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
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
    z-index: 2001;

    .lew-modal-box {
        border-radius: var(--lew-border-radius);
        background-color: var(--lew-modal-box-bgcolor);
        border: var(--lew-modal-border);
        box-shadow: var(--lew-modal-box-shadow);
        overflow: hidden;

        .header {
            height: 50px;
            background-color: var(--lew-bgcolor-2);
            padding: 10px 20px;

            .title {
                font-size: 16px;
                font-weight: bold;
            }

            .close-btn {
                cursor: pointer;
                transition: all 0.25s;
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
            background-color: var(--lew-bgcolor-1);
            padding: 10px 20px;
        }

        .header-slot {
            background-color: var(--lew-bgcolor-1);
        }

        .footer-slot {
            background-color: var(--lew-bgcolor-1);
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
    transition: opacity 0.4s cubic-bezier(0.3, 1.3, 0.3, 1),
        transform 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
    transform-origin: var(--lew-modal-transform-origin);
}

.lew-modal-leave-to,
.lew-modal-enter-from {
    opacity: 0;
    transform: scale(0.2);
}
</style>
