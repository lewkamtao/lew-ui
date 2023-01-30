<script lang="ts" setup name="dialog">
import { LewButton, LewIcon } from 'lew-ui';
import { _props } from './props';
import { getIconType } from '../../../utils';

const props = defineProps(_props);

let okLoading = ref<Boolean>(false);
let cancelLoading = ref<Boolean>(false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onClickOverlay = () => {
    if (props?.closeOnClickOverlay) {
        close();
    }
};

let visible = ref<Boolean>(true);
let _visible = ref<Boolean>(true);
let _visibleTimer = ref();

const close = () => {
    visible.value = false;
    emit('update:visible', false);
    // 保持动画
    clearTimeout(_visibleTimer.value);
    _visibleTimer.value = setTimeout(() => {
        _visible.value = false;
    }, 250);
};

const okHandle = async () => {
    if (typeof props.ok === 'function') {
        okLoading.value = true;
        await props.ok();
        okLoading.value = false;
    }
    close();
};

const cancelHandle = async () => {
    if (typeof props.cancel === 'function') {
        cancelLoading.value = true;
        await props.cancel();
        cancelLoading.value = false;
    }
    close();
};

const emit = defineEmits(['update:visible']);
</script>
<template>
    <div>
        <teleport to="body">
            <div
                v-if="_visible"
                class="lew-dialog"
                :style="
                    visible
                        ? 'animation: lewDialogOpen 0.25s;'
                        : 'animation: lewDialogClose 0.25s;'
                "
                @click="onClickOverlay"
            >
                <div
                    :style="
                        visible
                            ? 'animation: lewDialogBoxOpen 0.25s;'
                            : 'animation: lewDialogBoxClose 0.25s;'
                    "
                >
                    <div
                        v-if="layout === 'normal'"
                        class="lew-dialog-box lew-dialog-box-normal"
                        @click.stop
                    >
                        <div class="left">
                            <div :class="`icon-${type}`">
                                <lew-icon
                                    size="30"
                                    :type="getIconType(type)"
                                ></lew-icon>
                            </div>
                        </div>
                        <div class="right">
                            <header>
                                <slot name="title" />
                                <span
                                    class="gulu-dialog-close"
                                    @click="close"
                                ></span>
                            </header>
                            <main>
                                <slot name="content" />
                            </main>
                            <footer>
                                <lew-button
                                    :loading="cancelLoading"
                                    type="blank"
                                    @click.stop="cancelHandle"
                                    >取消
                                </lew-button>
                                <lew-button
                                    :loading="okLoading"
                                    @click.stop="okHandle"
                                    >确认</lew-button
                                >
                            </footer>
                        </div>
                    </div>

                    <div
                        v-if="layout === 'easy'"
                        class="lew-dialog-box lew-dialog-box-easy"
                    >
                        <div class="left">
                            <div :class="`icon-${type}`">
                                <lew-icon
                                    size="20"
                                    :type="getIconType(type)"
                                ></lew-icon>
                            </div>
                        </div>
                        <div class="right">
                            <main>
                                <slot name="content" />
                            </main>
                            <lew-button
                                style="margin-right: 10px"
                                type="normal"
                                size="small"
                                :loading="cancelLoading"
                                @click.stop="cancelHandle"
                                >取消
                            </lew-button>
                            <lew-button
                                :loading="okLoading"
                                @click.stop="okHandle"
                                size="small"
                                >确认
                            </lew-button>
                        </div>
                    </div>
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
    width: 100%;
    height: 100%;
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
        background-color: var(--lew-bgcolor-0);
        box-shadow: 0px 15px 50px rgba($color: #000000, $alpha: 0.05);
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
            top: 5px;
            width: 310px;
        }

        main {
            padding: 10px 0px 20px 0px;
        }
    }

    .lew-dialog-box-easy {
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
                width: 200px;
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
        transform: scale(0.2);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes lewDialogBoxClose {
    from {
        opacity: 1;
        transform: scale(1);
    }

    to {
        opacity: 0;
        transform: scale(0.2);
    }
}
</style>
