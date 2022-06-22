<script lang="ts" setup name="dialog">
import { ref } from 'vue';
import { LewButton } from '../../../../packages';
const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    ok: {
        type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    cancel: {
        type: Function,
    },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OnClickOverlay = () => {
    if (props.closeOnClickOverlay) {
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

const okFn = () => {
    if (typeof props.ok === 'function') {
        props.ok();
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
    <teleport to="body">
        <div
            v-if="visible"
            class="lew-dialog"
            :style="
                isShowDialog
                    ? 'animation: lewDialogOpen 0.25s;'
                    : 'animation: lewDialogClose 0.25s;'
            "
            @click="OnClickOverlay"
        >
            <div class="lew-dialog-box">
                <header>
                    <slot name="title" />
                    <span class="gulu-dialog-close" @click="close"></span>
                </header>
                <main>
                    <slot name="content" />
                </main>
                <footer>
                    <lew-Button type="normal" @click="cancelFn"
                        >取消</lew-Button
                    >
                    <lew-button @click="okFn">确认</lew-button>
                </footer>
            </div>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
.lew-dialog {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.35);
    outline: 1000000px solid rgba($color: #000000, $alpha: 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2050;
    animation-fill-mode: forwards;

    .lew-dialog-box {
        width: 350px;
        height: auto;
        padding: 20px;
        border-radius: var(--lew-border-radius);
        background-color: #fff;
        box-shadow: 0px 15px 50px rgba($color: #000000, $alpha: 0.05);

        header {
            width: 100%;
            font-size: 16px;
            font-weight: 600;
        }
        main {
            height: auto;
            font-size: 14px;
            padding: 10px 0px 20px 0px;
        }
        footer {
            display: flex;
            justify-content: end;
            width: 100%;
            .lew-button {
                margin-left: 10px;
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
