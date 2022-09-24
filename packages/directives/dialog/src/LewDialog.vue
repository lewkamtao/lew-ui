<script lang="ts" setup name="dialog">
import { ref } from 'vue';
import { LewButton } from 'lew-ui';
import {
    Info24Regular,
    Warning24Regular,
    CheckmarkCircle24Regular,
    ErrorCircle24Regular,
    Alert24Regular,
    Dismiss24Filled,
} from '@vicons/fluent';
import { Icon } from '@vicons/utils';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    closeonClickOverlay: {
        type: Boolean,
        default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    type: {
        type: String,
        default: '',
    },
    // eslint-disable-next-line vue/require-default-prop
    ok: {
        type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    cancel: {
        type: Function,
    },
    layout: {
        type: String,
        default: 'normal',
    },
});

let loading = ref<Boolean>(false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onClickOverlay = () => {
    if (props?.closeonClickOverlay) {
        close();
    }
};

let isShowDialog = ref(true);

const close = () => {
    isShowDialog.value = false;
    setTimeout(() => {
        emit('update:visible', false);
    }, 245);
};

const okFn = async () => {
    if (typeof props.ok === 'function') {
        loading.value = true;
        await props.ok();
        loading.value = false;
    }
    close();
};

const cancelFn = () => {
    if (typeof props.cancel === 'function') {
        props.cancel();
    }
    close();
};

const emit = defineEmits(['update:visible']);
</script>
<template>
    <div>
        <teleport to="body">
            <div
                v-if="visible"
                class="lew-dialog"
                :style="
                    isShowDialog
                        ? 'animation: lewDialogOpen 0.25s;'
                        : 'animation: lewDialogClose 0.25s;'
                "
                @click="onClickOverlay"
            >
                <div
                    v-if="layout == 'normal'"
                    class="lew-dialog-box lew-dialog-box-normal"
                    @click.stop
                >
                    <div class="btn-close" @click="cancelFn">
                        <Icon size="18"> <Dismiss24Filled /></Icon>
                    </div>
                    <div class="left">
                        <Icon size="32" :class="`icon-${type}`">
                            <Info24Regular v-if="type == `normal`" />
                            <Warning24Regular v-if="type == `warning`" />
                            <CheckmarkCircle24Regular
                                v-if="type == `success`"
                            />
                            <ErrorCircle24Regular v-if="type == `error`" />
                            <Alert24Regular v-if="type == `info`" />
                        </Icon>
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
                            <lew-Button
                                size="small"
                                type="blank"
                                @click="cancelFn"
                                >取消</lew-Button
                            >
                            <lew-button
                                size="small"
                                :loading="loading"
                                @click="okFn"
                                >确认</lew-button
                            >
                        </footer>
                    </div>
                </div>

                <div
                    v-if="layout == 'easy'"
                    class="lew-dialog-box lew-dialog-box-easy"
                >
                    <div class="left">
                        <Icon size="22" :class="`icon-${type}`">
                            <Info24Regular v-if="type == `normal`" />
                            <Warning24Regular v-if="type == `warning`" />
                            <CheckmarkCircle24Regular
                                v-if="type == `success`"
                            />
                            <ErrorCircle24Regular v-if="type == `error`" />
                            <Alert24Regular v-if="type == `info`" />
                        </Icon>
                    </div>
                    <div class="right">
                        <main>
                            <slot name="content" />
                        </main>
                        <lew-Button
                            style="margin-right: 10px"
                            type="normal"
                            size="small"
                            @click="cancelFn"
                            >取消</lew-Button
                        >
                        <lew-button
                            size="small"
                            :loading="loading"
                            @click="okFn"
                            >确认</lew-button
                        >
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
    backdrop-filter: blur(5px);
    outline: 1000000px solid var(--lew-modal-bgcolor);
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
        transform: translateY(15px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}
@keyframes lewDialogClose {
    from {
        opacity: 1;
        transform: translateY(0px);
    }
    to {
        opacity: 0;
        transform: translateY(15px);
    }
}
</style>
