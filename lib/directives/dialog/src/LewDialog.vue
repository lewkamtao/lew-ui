<script lang="ts" setup name="dialog">
    import { LewButton, LewIcon, LewFlex } from 'lew-ui';
    import { useMagicKeys } from '@vueuse/core';
    import { dialogProps } from './props';
    import { getIconType } from '../../../utils';
    import { useDOMCreate } from '../../../hooks';

    const { Escape } = useMagicKeys();
    useDOMCreate('lew-dialog');
    const props = defineProps(dialogProps);
    const emit = defineEmits(['close', 'show']);
    const visible = ref<boolean>(false);
    const okLoading = ref<boolean>(false);
    const cancelLoading = ref<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const maskClick = () => {
        if (props?.closeOnClickOverlay) {
            visible.value = false;
        }
    };

    onMounted(() => {
        visible.value = true;
    });

    watch(
        () => visible.value,
        (newVal) => {
            if (newVal) {
                emit('show');
            } else {
                setTimeout(() => {
                    emit('close');
                }, 500);
            }
        }
    );

    const ok = async () => {
        if (typeof props.ok === 'function') {
            okLoading.value = true;
            const isOk = await props.ok();
            if (isOk !== false) {
                visible.value = false;
            }
            okLoading.value = false;
        }
    };

    const cancel = async () => {
        if (typeof props.cancel === 'function') {
            cancelLoading.value = true;
            const isCancel = await props.cancel();
            if (isCancel !== false) {
                visible.value = false;
            }
            cancelLoading.value = false;
        }
    };

    if (props.closeByEsc) {
        watch(Escape, (v) => {
            if (v && visible.value) {
                visible.value = false;
            }
        });
    }
</script>
<template>
    <teleport to="#lew-dialog">
        <div
            class="lew-dialog-container"
            :style="{
                '--lew-dialog-transform-origin': transformOrigin
            }"
        >
            <transition name="lew-dialog-mask">
                <div v-if="visible" class="lew-dialog-mask" />
            </transition>
            <transition name="lew-dialog">
                <div v-if="visible" class="lew-dialog" @click="maskClick">
                    <div
                        v-if="layout === 'normal'"
                        class="lew-dialog-box lew-dialog-box-normal"
                        @click.stop
                    >
                        <div class="left">
                            <div :class="`icon-${type}`">
                                <lew-icon size="24" :type="getIconType(type)" />
                            </div>
                        </div>
                        <div class="right">
                            <header>
                                <slot name="title" />
                                <span class="gulu-dialog-close" @click="visible = false"></span>
                            </header>
                            <main>
                                <slot name="content" />
                            </main>
                            <footer>
                                <lew-button
                                    v-if="cancelText"
                                    :text="cancelText"
                                    type="text"
                                    color="gray"
                                    round
                                    :loading="cancelLoading"
                                    @click.stop="cancel"
                                />
                                <lew-button
                                    v-if="okText"
                                    :text="okText"
                                    type="fill"
                                    round
                                    :color="type"
                                    :loading="okLoading"
                                    @click.stop="ok"
                                />
                            </footer>
                        </div>
                    </div>

                    <div
                        v-if="layout === 'mini'"
                        class="lew-dialog-box lew-dialog-box-mini"
                        @click.stop
                    >
                        <div class="left">
                            <div :class="`icon-${type}`">
                                <lew-icon size="20" :type="getIconType(type)" />
                            </div>
                        </div>
                        <lew-flex class="right" y="start">
                            <main>
                                <slot name="content" />
                            </main>
                            <lew-flex x="end">
                                <lew-button
                                    v-if="cancelText"
                                    :text="cancelText"
                                    type="text"
                                    size="small"
                                    color="gray"
                                    round
                                    :loading="cancelLoading"
                                    @click.stop="cancel"
                                />
                                <lew-button
                                    v-if="okText"
                                    :text="okText"
                                    type="fill"
                                    size="small"
                                    round
                                    :color="type"
                                    :loading="okLoading"
                                    @click.stop="ok"
                                />
                            </lew-flex>
                        </lew-flex>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
    .lew-dialog-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--lew-modal-bgcolor);
        z-index: 2002;
    }

    .lew-dialog {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2002;

        .lew-dialog-box {
            position: relative;
            display: flex;
            width: 350px;
            height: auto;
            padding: 20px;
            border-radius: var(--lew-border-radius);
            background-color: var(--lew-modal-box-bgcolor);
            border: var(--lew-dialog-box-border);
            box-shadow: var(--lew-dialog-box-shadow);

            .icon-success {
                color: var(--lew-color-success-dark);
            }

            .icon-warning {
                color: var(--lew-color-warning-dark);
            }

            .icon-normal {
                color: var(--lew-color-normal-dark);
            }

            .icon-info {
                color: var(--lew-color-info-dark);
            }

            .icon-error {
                color: var(--lew-color-error-dark);
            }

            header {
                width: 100%;
                font-size: 16px;
                font-weight: 600;
            }

            main {
                height: auto;
                font-size: 14px;
                color: var(--lew-text-color-5);
            }

            footer {
                display: flex;
                justify-content: end;
                width: 100%;

                .lew-button {
                    margin-left: 10px;
                }
            }

            .btn-close {
                position: absolute;
                top: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 25px;
                height: 25px;
                right: 10px;
                border-radius: var(--lew-border-radius);
                box-sizing: border-box;
                cursor: pointer;
                user-select: none;
                z-index: 2051;
                color: var(--lew-text-color-5);
            }

            .btn-close:hover {
                background: rgba($color: #000000, $alpha: 0.05);
                color: var(--lew-text-color-3);
            }

            .btn-close:active {
                background: rgba($color: #000000, $alpha: 0.15);
                color: var(--lew-text-color-0);
            }
        }

        .lew-dialog-box-normal {
            .left {
                margin-right: 10px;
                width: 30px;
            }

            .right {
                position: relative;
                top: 1px;
                width: 310px;
            }

            main {
                padding: 10px 0px 20px 0px;
            }
        }

        .lew-dialog-box-mini {
            padding: 15px 24px;
            border-radius: 50px;
            max-width: 650px;
            width: auto;
            align-items: center;

            .left {
                margin-top: 6px;
                margin-right: 10px;
                display: flex;
            }

            .right {
                position: relative;
                top: 1px;
            }

            .right {
                display: flex;
                justify-content: space-between;
                align-items: center;

                main {
                    flex-shrink: 0;
                    margin-right: 20px;
                    max-width: calc(650px - 180px);
                }

                footer {
                    width: 80px;
                }
            }
        }
    }

    .lew-dialog-mask-enter-active,
    .lew-dialog-mask-leave-active {
        transition: all 0.25s;
    }

    .lew-dialog-mask-enter-from,
    .lew-dialog-mask-leave-to {
        opacity: 0;
    }

    .lew-dialog-enter-active,
    .lew-dialog-leave-active {
        transition: opacity 0.4s cubic-bezier(0.3, 1.3, 0.3, 1),
            transform 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
        transform-origin: var(--lew-dialog-transform-origin);
    }

    .lew-dialog-leave-to,
    .lew-dialog-enter-from {
        opacity: 0;
        transform: scale(0.2);
    }
</style>
