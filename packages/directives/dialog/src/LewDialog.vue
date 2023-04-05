<script lang="ts" setup name="dialog">
import { LewButton, LewIcon } from 'lew-ui';
import { _props } from './props';
import { getIconType } from '../../../utils';

const props = defineProps(_props);
const emit = defineEmits(['close']);

let timer: any;
let okLoading = ref<Boolean>(false);
let cancelLoading = ref<Boolean>(false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const maskClick = () => {
    if (props?.closeOnClickOverlay) {
        close();
    }
};

let visibleMask = ref<Boolean>(true);
let _visible = ref<Boolean>(true);

const close = () => {
    clearTimeout(timer);
    visibleMask.value = false;
    timer = setTimeout(() => {
        _visible.value = false;
        emit('close');
    }, 400);
};

const ok = async () => {
    if (typeof props.ok === 'function') {
        okLoading.value = true;
        const isOk = await props.ok();
        if (isOk !== false) {
            close();
        }
        okLoading.value = false;
    }
};

const cancel = async () => {
    if (typeof props.cancel === 'function') {
        cancelLoading.value = true;
        const isCancel = await props.cancel();
        if (isCancel !== false) {
            close();
        }
        cancelLoading.value = false;
    }
};
</script>
<template>
    <div>
        <teleport to="body">
            <div
                v-if="_visible"
                class="lew-dialog"
                :style="
                    visibleMask
                        ? 'animation: lewDialogOpen 0.4s ease;'
                        : 'animation: lewDialogClose 0.4s ease;'
                "
                @click="maskClick"
            >
                <div
                    v-if="layout === 'normal'"
                    class="lew-dialog-box lew-dialog-box-normal"
                    :style="
                        visibleMask
                            ? 'animation: lewDialogBoxOpen 0.35s ease;  '
                            : 'animation: lewDialogBoxClose 0.35s ease; '
                    "
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
                            <span
                                class="gulu-dialog-close"
                                @click="close()"
                            ></span>
                        </header>
                        <main>
                            <slot name="content" />
                        </main>
                        <footer>
                            <lew-button
                                v-if="cancelText"
                                :text="cancelText"
                                type="blank"
                                :loading="cancelLoading"
                                @click.stop="cancel"
                            />
                            <lew-button
                                v-if="okText"
                                :text="okText"
                                :type="type"
                                :loading="okLoading"
                                @click.stop="ok"
                            />
                        </footer>
                    </div>
                </div>

                <div
                    v-if="layout === 'mini'"
                    class="lew-dialog-box lew-dialog-box-mini"
                    :style="
                        visibleMask
                            ? 'animation: lewDialogBoxOpen 0.35s ease;'
                            : 'animation: lewDialogBoxClose 0.35s ease;'
                    "
                    @click.stop
                >
                    <div class="left">
                        <div :class="`icon-${type}`">
                            <lew-icon size="20" :type="getIconType(type)" />
                        </div>
                    </div>
                    <lew-flex class="right">
                        <main>
                            <slot name="content" />
                        </main>
                        <lew-flex x="end">
                            <lew-button
                                v-if="cancelText"
                                :text="cancelText"
                                type="blank"
                                size="small"
                                style="margin-right: 10px"
                                :loading="cancelLoading"
                                @click.stop="cancel"
                            />
                            <lew-button
                                v-if="okText"
                                :text="okText"
                                :type="type"
                                size="small"
                                :loading="okLoading"
                                @click.stop="ok"
                            />
                        </lew-flex>
                    </lew-flex>
                </div>
            </div>
        </teleport>
    </div>
</template>

<style lang="scss" scoped>
.lew-dialog {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: var(--lew-modal-bgcolor);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2050;
    animation-fill-mode: forwards;

    .lew-dialog-box {
        position: relative;
        display: flex;
        width: 350px;
        height: auto;
        padding: 20px;
        border-radius: var(--lew-border-radius);
        background-color: var(--lew-modal-box-bgcolor);
        border: var(--lew-modal-box-border);
        box-shadow: var(--lew-modal-box-shadow);
        animation-fill-mode: forwards;
        .icon-success {
            color: var(--lew-success-color-dark);
        }

        .icon-warning {
            color: var(--lew-warning-color-dark);
        }

        .icon-normal {
            color: var(--lew-normal-color-dark);
        }

        .icon-info {
            color: var(--lew-info-color-dark);
        }

        .icon-error {
            color: var(--lew-error-color-dark);
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
        .left {
            margin-right: 10px;
            display: flex;
        }

        .right {
            position: relative;
            top: 1px;
            width: 320px;
        }

        .right {
            display: flex;
            justify-content: space-between;

            main {
                margin-right: 10px;
            }

            footer {
                width: 80px;
            }
        }
    }
}
</style>

<style>
@keyframes lewDialogOpen {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes lewDialogClose {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes lewDialogBoxOpen {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0%);
    }
}

@keyframes lewDialogBoxClose {
    from {
        opacity: 1;
        transform: translateY(0%);
    }

    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}
</style>
